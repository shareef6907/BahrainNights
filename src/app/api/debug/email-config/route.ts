import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

// GET /api/debug/email-config - Check email configuration (admin only)
export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Check environment variables (don't expose full values)
    const config = {
      AWS_SES_REGION: process.env.AWS_SES_REGION || process.env.BAHRAINNIGHTS_AWS_REGION || 'me-south-1 (default)',
      AWS_ACCESS_KEY_ID_SET: !!(process.env.BAHRAINNIGHTS_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID),
      AWS_SECRET_ACCESS_KEY_SET: !!(process.env.BAHRAINNIGHTS_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY),
      AWS_SES_FROM_EMAIL: process.env.AWS_SES_FROM_EMAIL || 'BahrainNights <noreply@bahrainnights.com> (default)',
      ACCESS_KEY_PREFIX: (process.env.BAHRAINNIGHTS_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || '').substring(0, 8) || 'NOT SET',
    };

    return NextResponse.json({
      status: 'ok',
      config,
      message: config.AWS_ACCESS_KEY_ID_SET && config.AWS_SECRET_ACCESS_KEY_SET
        ? 'SES credentials are configured'
        : 'SES credentials are MISSING - emails will not be sent!'
    });
  } catch (error) {
    console.error('Error checking email config:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to check config' },
      { status: 500 }
    );
  }
}

// POST /api/debug/email-config - Send test email (admin only)
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email address required' }, { status: 400 });
    }

    // Import and send test email
    const { sendEmail } = await import('@/lib/ses');

    const result = await sendEmail({
      to: email,
      subject: 'BahrainNights Email Test',
      html: `
        <h1>Email Test Successful!</h1>
        <p>This is a test email from BahrainNights to verify the email system is working.</p>
        <p>Sent at: ${new Date().toISOString()}</p>
      `
    });

    return NextResponse.json({
      success: result.success,
      messageId: result.messageId,
      error: result.error,
      sentTo: email
    });
  } catch (error) {
    console.error('Error sending test email:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send test email' },
      { status: 500 }
    );
  }
}
