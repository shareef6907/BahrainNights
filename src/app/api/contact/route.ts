import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, isEmailConfigured } from '@/lib/ses';

export const dynamic = 'force-dynamic';

/**
 * Public contact form endpoint for bahrainnights.com/contact.
 *
 * Previously the page's form only flipped a local `formSubmitted` flag and
 * rendered a "Message Sent!" screen — the enquiry itself was never delivered
 * anywhere. GA4 also fired `contact_form_submit` on submit, so Google Ads
 * reported conversions that never arrived.
 *
 * This route actually delivers the enquiry over AWS SES (the same transport the
 * venue/event portal already uses) and reports honestly when delivery fails so
 * the page can offer the visitor a direct-contact fallback.
 */

// ── Rate limiting (per IP, in-memory) ───────────────────────────────────────
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_PER_HOUR = 5;
const WINDOW_MS = 60 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= MAX_PER_HOUR) return true;
  entry.count++;
  return false;
}

// ── Input sanitising ────────────────────────────────────────────────────────
function sanitize(value: unknown, maxLength = 2000): string {
  if (typeof value !== 'string') return '';
  return value
    .trim()
    .replace(/<[^>]*>/g, '')
    .replace(/[<>'"]/g, '')
    .slice(0, maxLength);
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SUBJECT_LABELS: Record<string, string> = {
  general: 'General Inquiry',
  listing: 'Event Listing',
  advertising: 'Advertising',
  partnership: 'Partnership',
  feedback: 'Feedback',
  support: 'Technical Support',
};

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many messages sent from this connection. Please try again later.' },
        { status: 429 }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    }

    // Honeypot — real visitors never fill this hidden field.
    if (sanitize(body.website, 100)) {
      return NextResponse.json({ ok: true, delivered: 'email' });
    }

    const name = sanitize(body.name, 120);
    const email = sanitize(body.email, 200).toLowerCase();
    const subjectKey = sanitize(body.subject, 60);
    const message = sanitize(body.message, 4000);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please provide your name, email address and message.' },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const subjectLabel = SUBJECT_LABELS[subjectKey] || 'General Inquiry';
    const toEmail = process.env.CONTACT_TO_EMAIL || 'sales@bahrainnights.com';

    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subjectLabel}`,
      '',
      message,
      '',
      '---',
      'Sent from bahrainnights.com/contact',
    ].join('\n');

    const html = `
      <h2 style="font-family:Arial,Helvetica,sans-serif;font-size:18px;margin:0 0 16px;">
        New contact form enquiry
      </h2>
      <table style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1f2937;border-collapse:collapse;">
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Name</td><td style="padding:4px 0;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Email</td><td style="padding:4px 0;">${escapeHtml(email)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Subject</td><td style="padding:4px 0;">${escapeHtml(subjectLabel)}</td></tr>
      </table>
      <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1f2937;white-space:pre-wrap;margin:20px 0;">${escapeHtml(message)}</p>
      <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#6b7280;">
        Sent from bahrainnights.com/contact — reply directly to reach ${escapeHtml(name)}.
      </p>
    `;

    if (!isEmailConfigured()) {
      console.error('Contact form enquiry received but email delivery is not configured:', {
        name,
        email,
        subjectLabel,
      });
      return NextResponse.json(
        { error: 'We could not send your message automatically. Please use the direct contact options below.' },
        { status: 503 }
      );
    }

    const result = await sendEmail({
      to: toEmail,
      subject: `[Contact] ${subjectLabel} — ${name}`,
      html,
      text,
      replyTo: email,
    });

    if (!result.success) {
      console.error('Contact form email delivery failed:', result.error, { name, email });
      return NextResponse.json(
        { error: 'We could not send your message automatically. Please use the direct contact options below.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, delivered: 'email' });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Something went wrong sending your message. Please use the direct contact options below.' },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
