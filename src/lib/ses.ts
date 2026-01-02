/**
 * AWS SES Email Service for BahrainNights.com
 * Uses AWS SES in me-south-1 (Bahrain) region
 */

import { SESClient, SendEmailCommand, SendEmailCommandInput } from '@aws-sdk/client-ses';

// Initialize SES client - using same credential pattern as S3
const sesClient = new SESClient({
  region: process.env.AWS_SES_REGION || process.env.BAHRAINNIGHTS_AWS_REGION || 'me-south-1',
  credentials: {
    accessKeyId: process.env.BAHRAINNIGHTS_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.BAHRAINNIGHTS_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const DEFAULT_FROM_EMAIL = process.env.AWS_SES_FROM_EMAIL || 'BahrainNights <noreply@bahrainnights.com>';

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Check if SES is properly configured
 */
function isSESConfigured(): boolean {
  const accessKeyId = process.env.BAHRAINNIGHTS_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.BAHRAINNIGHTS_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;
  return !!(accessKeyId && secretAccessKey);
}

/**
 * Send an email using AWS SES
 * Falls back to console logging if SES is not configured (development)
 */
export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
  const { to, subject, html, text, from = DEFAULT_FROM_EMAIL, replyTo } = options;

  // Convert to array if string
  const toAddresses = Array.isArray(to) ? to : [to];

  // Development fallback - log to console
  if (!isSESConfigured()) {
    console.log('======================================');
    console.log('📧 EMAIL (SES not configured - dev mode)');
    console.log('======================================');
    console.log('To:', toAddresses.join(', '));
    console.log('From:', from);
    console.log('Subject:', subject);
    console.log('--------------------------------------');
    console.log('Content preview:', html.substring(0, 300) + '...');
    console.log('======================================');
    return { success: true, messageId: `dev-${Date.now()}` };
  }

  try {
    const params: SendEmailCommandInput = {
      Source: from,
      Destination: {
        ToAddresses: toAddresses,
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: html,
            Charset: 'UTF-8',
          },
          ...(text && {
            Text: {
              Data: text,
              Charset: 'UTF-8',
            },
          }),
        },
      },
      ...(replyTo && {
        ReplyToAddresses: [replyTo],
      }),
    };

    const command = new SendEmailCommand(params);
    const response = await sesClient.send(command);

    console.log(`📧 Email sent successfully to ${toAddresses.join(', ')}. MessageId: ${response.MessageId}`);

    return {
      success: true,
      messageId: response.MessageId,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ SES Email Error:', errorMessage);

    // Log more details in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Full error:', error);
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Send multiple emails (batch)
 */
export async function sendBulkEmails(
  emails: EmailOptions[]
): Promise<{ sent: number; failed: number; results: EmailResult[] }> {
  const results: EmailResult[] = [];
  let sent = 0;
  let failed = 0;

  for (const email of emails) {
    const result = await sendEmail(email);
    results.push(result);
    if (result.success) {
      sent++;
    } else {
      failed++;
    }
    // Small delay to avoid rate limiting (SES has 14/second limit)
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return { sent, failed, results };
}

// Export client for advanced use cases
export { sesClient };
