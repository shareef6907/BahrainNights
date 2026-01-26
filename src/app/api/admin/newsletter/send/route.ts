import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// Resend API for sending emails
async function sendWithResend(to: string[], subject: string, html: string, text: string) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  
  if (!RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY not configured');
  }

  // Resend batch sending (up to 100 emails per request)
  const batches = [];
  for (let i = 0; i < to.length; i += 100) {
    batches.push(to.slice(i, i + 100));
  }

  const results = [];
  for (const batch of batches) {
    // Resend batch API expects an array directly, not wrapped in an object
    const emailPayload = batch.map(email => ({
      from: 'BahrainNights <newsletter@bahrainnights.com>',
      to: email,
      subject,
      html,
      text,
    }));

    const response = await fetch('https://api.resend.com/emails/batch', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Resend error:', error);
      throw new Error(error.message || 'Failed to send emails');
    }

    const result = await response.json();
    results.push(result);
  }

  return results;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subject, html, text, testEmail } = body;

    if (!subject || !html) {
      return NextResponse.json(
        { error: 'Subject and HTML content are required' },
        { status: 400 }
      );
    }

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({
        error: 'Email sending not configured. Please add RESEND_API_KEY to environment variables.',
        setup: {
          step1: 'Go to https://resend.com and create a free account',
          step2: 'Get your API key from the dashboard',
          step3: 'Add RESEND_API_KEY to your .env.local file',
          step4: 'Add DNS records to verify your domain (see Resend dashboard)',
        }
      }, { status: 400 });
    }

    // If test email provided, send only to that
    if (testEmail) {
      const results = await sendWithResend([testEmail], subject, html, text || '');
      return NextResponse.json({ 
        success: true, 
        message: `Test email sent to ${testEmail}`,
        results 
      });
    }

    // Get all active subscribers
    const { data: subscribers, error: fetchError } = await supabaseAdmin
      .from('newsletter_subscribers')
      .select('email')
      .eq('status', 'subscribed');

    if (fetchError) {
      console.error('Error fetching subscribers:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch subscribers. The newsletter_subscribers table may not exist.' },
        { status: 500 }
      );
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json(
        { error: 'No active subscribers found' },
        { status: 400 }
      );
    }

    const emails = subscribers.map(s => s.email);
    
    // Send emails
    const results = await sendWithResend(emails, subject, html, text || '');

    // Log the send
    await supabaseAdmin
      .from('newsletter_sends')
      .insert({
        subject,
        recipient_count: emails.length,
        sent_at: new Date().toISOString(),
        status: 'sent',
      })
      .select()
      .single();

    return NextResponse.json({ 
      success: true, 
      message: `Newsletter sent to ${emails.length} subscribers`,
      count: emails.length,
      results
    });

  } catch (error) {
    console.error('Newsletter send error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send newsletter' },
      { status: 500 }
    );
  }
}
