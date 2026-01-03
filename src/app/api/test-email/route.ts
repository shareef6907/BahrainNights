import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/ses';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const testEmail = searchParams.get('email');

  // Check SES configuration
  const config = {
    region: process.env.AWS_SES_REGION || process.env.BAHRAINNIGHTS_AWS_REGION || 'me-south-1',
    accessKeyConfigured: !!(process.env.BAHRAINNIGHTS_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID),
    secretKeyConfigured: !!(process.env.BAHRAINNIGHTS_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY),
    fromEmail: process.env.AWS_SES_FROM_EMAIL || 'BahrainNights <noreply@bahrainnights.com>',
  };

  // If no email provided, just return config status
  if (!testEmail) {
    return NextResponse.json({
      message: 'SES Configuration Status',
      config,
      usage: 'Add ?email=your@email.com to send a test email',
    });
  }

  // Send test email
  try {
    const result = await sendEmail({
      to: testEmail,
      subject: 'BahrainNights Email Test',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #f97316;">🌙 BahrainNights Email Test</h1>
          <p>This is a test email from BahrainNights.com</p>
          <p>If you received this, your email configuration is working correctly!</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            Sent at: ${new Date().toISOString()}<br>
            Region: ${config.region}
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: result.success,
      messageId: result.messageId,
      error: result.error,
      config,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      config,
    }, { status: 500 });
  }
}
