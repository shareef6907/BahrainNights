import { NextRequest, NextResponse } from 'next/server';
import { sendContactFormNotification, sendContactFormConfirmation } from '@/lib/email';
import { isSESConfigured } from '@/lib/ses';

export const dynamic = 'force-dynamic';

// Rate limiting - simple in-memory limiter, consistent with /api/sponsors/inquiry
const attempts = new Map<string, { count: number; resetTime: number }>();
const MAX_ATTEMPTS_PER_HOUR = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);

  if (!entry || now > entry.resetTime) {
    attempts.set(ip, { count: 1, resetTime: now + 3600000 });
    return true;
  }

  if (entry.count >= MAX_ATTEMPTS_PER_HOUR) {
    return false;
  }

  entry.count++;
  return true;
}

// Strip HTML tags and dangerous characters from user input
function sanitize(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value
    .trim()
    .replace(/<[^>]*>/g, '')
    .replace(/[<>"]/g, '')
    .slice(0, 5000);
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Reject with a failure result if the promise does not settle in time.
 * Prevents a hung mail provider from consuming the whole request budget.
 */
async function withTimeout<T extends { success: boolean; error?: string }>(
  promise: Promise<T>,
  ms: number,
  message: string
): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeout = new Promise<T>((resolve) => {
    timer = setTimeout(() => resolve({ success: false, error: message } as T), ms);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timer!);
  }
}

/**
 * POST /api/contact - Deliver a contact form enquiry to the BahrainNights team.
 *
 * Previously the contact page had no endpoint at all: submitting the form did a
 * native GET navigation and every enquiry was lost, while the page still showed
 * a "Message Sent!" confirmation.
 */
export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const payload = (body || {}) as Record<string, unknown>;

    // Honeypot — a hidden field real visitors never see or fill. Bots that fill
    // it get a success response but nothing is delivered.
    if (sanitize(payload.website)) {
      return NextResponse.json({ success: true });
    }

    const name = sanitize(payload.name);
    const email = sanitize(payload.email).toLowerCase();
    const subject = sanitize(payload.subject);
    const message = sanitize(payload.message);

    if (!name) {
      return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
    }
    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (!message) {
      return NextResponse.json({ error: 'Please enter a message.' }, { status: 400 });
    }

    // Rate limit only AFTER validation. Rejected requests cost the caller nothing,
    // otherwise a visitor who mistypes the form five times is locked out of
    // sending a genuine enquiry.
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many messages sent. Please try again later, or call us on +973 3900 7750.' },
        { status: 429 }
      );
    }

    const enquiry = { name, email, subject, message };

    // In production, a missing SES configuration means the message CANNOT be
    // delivered. sendEmail() falls back to console logging and reports success
    // in that case, which would make this route claim delivery that never
    // happened. Refuse to report success unless a real transport exists.
    if (process.env.NODE_ENV === 'production' && !isSESConfigured()) {
      console.error('Contact form: SES is not configured - refusing to report a false success.');
      return NextResponse.json(
        {
          error:
            'We could not send your message right now. Please email sales@bahrainnights.com or call +973 3900 7750 and we will help right away.',
        },
        { status: 503 }
      );
    }

    // Deliver to the team. If this fails the visitor must be told, NOT shown a
    // success screen - a false confirmation is worse than an honest error.
    // A bounded timeout guarantees we return an honest error rather than
    // hanging until the platform kills the request.
    const notification = await withTimeout(
      sendContactFormNotification(enquiry),
      15_000,
      'Email delivery timed out.'
    );

    if (!notification.success) {
      console.error('Contact form notification failed:', notification.error);
      return NextResponse.json(
        {
          error:
            'We could not send your message right now. Please email sales@bahrainnights.com or call +973 3900 7750 and we will help right away.',
        },
        { status: 502 }
      );
    }

    // Confirmation to the visitor is best-effort - the enquiry is already delivered.
    const confirmation = await withTimeout(
      sendContactFormConfirmation(enquiry),
      15_000,
      'Confirmation email timed out.'
    ).catch((error) => ({ success: false, error: String(error) }));
    if (!confirmation.success) {
      console.warn('Contact form confirmation email failed:', confirmation.error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      {
        error:
          'Something went wrong sending your message. Please email sales@bahrainnights.com or call +973 3900 7750.',
      },
      { status: 500 }
    );
  }
}
