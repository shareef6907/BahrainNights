/**
 * Email Templates for BahrainNights.com
 * Reusable, responsive HTML email templates
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bahrainnights.com';
const CURRENT_YEAR = new Date().getFullYear();

// Logo URL - hosted on S3 (in processed folder for public access)
const LOGO_URL = 'https://bahrainnights-production.s3.me-south-1.amazonaws.com/processed/assets/logo-email.png';

// Brand colors
const COLORS = {
  primary: '#4f46e5',
  primaryDark: '#7c3aed',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  gray: {
    50: '#f9fafb',
    100: '#f4f4f5',
    200: '#e5e7eb',
    500: '#6b7280',
    700: '#374151',
    900: '#111827',
  },
};

/**
 * Base email layout wrapper
 */
function baseLayout(content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>BahrainNights</title>
  <!--[if mso]>
  <style type="text/css">
    table {border-collapse: collapse;}
    .mso-button {padding: 14px 32px !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: ${COLORS.gray[100]}; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: ${COLORS.gray[100]};">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
          <!-- Logo Header -->
          <tr>
            <td align="center" style="padding: 0 0 20px;">
              <a href="${SITE_URL}" style="text-decoration: none;">
                <img src="${LOGO_URL}" alt="BahrainNights" width="180" style="max-width: 180px; height: auto;" />
              </a>
            </td>
          </tr>
          ${content}
          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 30px 20px;">
              <p style="margin: 0 0 10px; color: ${COLORS.gray[500]}; font-size: 12px;">
                &copy; ${CURRENT_YEAR} BahrainNights.com
              </p>
              <p style="margin: 0; color: ${COLORS.gray[500]}; font-size: 12px;">
                Your Nightlife. Our Spotlight.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}

/**
 * Header with gradient
 */
function gradientHeader(title: string, subtitle?: string, emoji?: string): string {
  return `
<tr>
  <td style="background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%); border-radius: 16px 16px 0 0; padding: 40px 30px; text-align: center;">
    ${emoji ? `<div style="font-size: 48px; margin-bottom: 16px;">${emoji}</div>` : ''}
    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; line-height: 1.3;">${title}</h1>
    ${subtitle ? `<p style="color: rgba(255,255,255,0.9); margin: 12px 0 0; font-size: 16px;">${subtitle}</p>` : ''}
  </td>
</tr>`;
}

/**
 * Simple header (non-gradient)
 */
function simpleHeader(title: string, backgroundColor: string = COLORS.gray[700]): string {
  return `
<tr>
  <td style="background-color: ${backgroundColor}; border-radius: 16px 16px 0 0; padding: 40px 30px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">${title}</h1>
  </td>
</tr>`;
}

/**
 * Content body
 */
function contentBody(content: string): string {
  return `
<tr>
  <td style="background: white; border-radius: 0 0 16px 16px; padding: 40px 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    ${content}
  </td>
</tr>`;
}

/**
 * Primary button
 */
function primaryButton(text: string, url: string): string {
  return `
<table role="presentation" cellpadding="0" cellspacing="0" style="margin: 30px auto;">
  <tr>
    <td style="background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%); border-radius: 8px;">
      <a href="${url}" target="_blank" class="mso-button" style="display: inline-block; color: white; text-decoration: none; padding: 14px 32px; font-weight: 600; font-size: 16px;">
        ${text}
      </a>
    </td>
  </tr>
</table>`;
}

/**
 * Secondary button
 */
function secondaryButton(text: string, url: string): string {
  return `
<table role="presentation" cellpadding="0" cellspacing="0" style="margin: 30px auto;">
  <tr>
    <td style="background-color: ${COLORS.gray[700]}; border-radius: 8px;">
      <a href="${url}" target="_blank" class="mso-button" style="display: inline-block; color: white; text-decoration: none; padding: 14px 32px; font-weight: 600; font-size: 16px;">
        ${text}
      </a>
    </td>
  </tr>
</table>`;
}

/**
 * Info box
 */
function infoBox(content: string, borderColor: string = COLORS.primary): string {
  return `
<div style="background: ${COLORS.gray[50]}; border-left: 4px solid ${borderColor}; padding: 16px 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
  ${content}
</div>`;
}

/**
 * Alert box (for warnings/errors)
 */
function alertBox(title: string, message: string, type: 'error' | 'warning' | 'success' = 'error'): string {
  const colors = {
    error: { bg: '#fef2f2', border: COLORS.error, title: '#991b1b', text: '#7f1d1d' },
    warning: { bg: '#fffbeb', border: COLORS.warning, title: '#92400e', text: '#78350f' },
    success: { bg: '#ecfdf5', border: COLORS.success, title: '#065f46', text: '#064e3b' },
  };
  const c = colors[type];

  return `
<div style="background: ${c.bg}; border-left: 4px solid ${c.border}; padding: 16px 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
  <p style="color: ${c.title}; font-size: 14px; font-weight: 600; margin: 0 0 8px;">${title}</p>
  <p style="color: ${c.text}; font-size: 14px; margin: 0;">${message}</p>
</div>`;
}

// ============================================
// EMAIL TEMPLATES
// ============================================

/**
 * Venue Registration Confirmation Email
 */
export function venueRegistrationConfirmation(venueName: string): string {
  return baseLayout(`
    ${gradientHeader('Registration Received!', 'We\'re excited to have you', '🎉')}
    ${contentBody(`
      <p style="color: ${COLORS.gray[700]}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
        Thank you for registering <strong>${venueName}</strong> on BahrainNights.com!
      </p>

      <p style="color: ${COLORS.gray[700]}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
        Your registration is now under review. Our team will verify your venue details and you'll receive an email once your venue is approved.
      </p>

      ${infoBox(`
        <p style="color: ${COLORS.gray[500]}; font-size: 14px; margin: 0 0 8px;"><strong>What happens next?</strong></p>
        <ul style="color: ${COLORS.gray[700]}; font-size: 14px; margin: 0; padding-left: 20px;">
          <li>Our team reviews your submission (usually within 24-48 hours)</li>
          <li>You'll receive an approval email with login instructions</li>
          <li>Start adding events and reaching thousands of visitors!</li>
        </ul>
      `)}

      <p style="color: ${COLORS.gray[500]}; font-size: 14px; line-height: 1.6; margin: 20px 0 0;">
        Questions? Contact us at
        <a href="mailto:help@bahrainnights.com" style="color: ${COLORS.primary};">help@bahrainnights.com</a>
      </p>
    `)}
  `);
}

/**
 * Venue Approval Email
 */
export function venueApprovalEmail(venueName: string, venueSlug: string): string {
  const loginUrl = `${SITE_URL}/venue-portal/login`;
  const venueUrl = `${SITE_URL}/venues/${venueSlug}`;
  const dashboardUrl = `${SITE_URL}/venue-portal`;

  return baseLayout(`
    ${gradientHeader('Congratulations!', 'Your venue has been approved', '🎉')}
    ${contentBody(`
      <p style="color: ${COLORS.gray[700]}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
        Great news! <strong>${venueName}</strong> has been approved and is now live on BahrainNights.com.
      </p>

      <p style="color: ${COLORS.gray[700]}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
        You can now:
      </p>

      <ul style="color: ${COLORS.gray[700]}; font-size: 16px; line-height: 1.8; margin: 0 0 20px; padding-left: 20px;">
        <li>Log in to your venue dashboard</li>
        <li>Add and manage events</li>
        <li>Update your venue information</li>
        <li>Reach thousands of potential customers</li>
      </ul>

      ${primaryButton('Log In to Dashboard', loginUrl)}

      ${infoBox(`
        <p style="color: ${COLORS.gray[500]}; font-size: 14px; margin: 0 0 8px;">Your venue is now visible at:</p>
        <a href="${venueUrl}" style="color: ${COLORS.primary}; font-size: 14px; word-break: break-all;">${venueUrl}</a>
      `)}

      <p style="color: ${COLORS.gray[500]}; font-size: 14px; line-height: 1.6; margin: 20px 0 0;">
        Questions? Contact us at
        <a href="mailto:help@bahrainnights.com" style="color: ${COLORS.primary};">help@bahrainnights.com</a>
      </p>
    `)}
  `);
}

/**
 * Venue Rejection Email
 */
export function venueRejectionEmail(venueName: string, reason: string): string {
  const registerUrl = `${SITE_URL}/register-venue`;

  return baseLayout(`
    ${simpleHeader('Venue Registration Update')}
    ${contentBody(`
      <p style="color: ${COLORS.gray[700]}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
        Thank you for registering <strong>${venueName}</strong> on BahrainNights.com.
      </p>

      <p style="color: ${COLORS.gray[700]}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
        Unfortunately, we were unable to approve your venue registration at this time.
      </p>

      ${alertBox('Reason:', reason, 'error')}

      <p style="color: ${COLORS.gray[700]}; font-size: 16px; line-height: 1.6; margin: 20px 0;">
        You're welcome to update your information and submit a new registration. We'd love to have you on the platform!
      </p>

      ${secondaryButton('Register Again', registerUrl)}

      <p style="color: ${COLORS.gray[500]}; font-size: 14px; line-height: 1.6; margin: 20px 0 0;">
        If you have questions about this decision, please contact us at
        <a href="mailto:help@bahrainnights.com" style="color: ${COLORS.primary};">help@bahrainnights.com</a>
      </p>
    `)}
  `);
}

/**
 * Event Approval Email
 */
export function eventApprovalEmail(eventTitle: string, eventSlug: string, venueName: string): string {
  const eventUrl = `${SITE_URL}/events/${eventSlug}`;
  const dashboardUrl = `${SITE_URL}/venue-portal/events`;

  return baseLayout(`
    ${gradientHeader('Event Published!', 'Your event is now live', '🎊')}
    ${contentBody(`
      <p style="color: ${COLORS.gray[700]}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
        Great news! Your event <strong>${eventTitle}</strong> at ${venueName} has been approved and is now live on BahrainNights.com.
      </p>

      <p style="color: ${COLORS.gray[700]}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
        Your event is now visible to thousands of people looking for things to do in Bahrain!
      </p>

      ${primaryButton('View Your Event', eventUrl)}

      ${infoBox(`
        <p style="color: ${COLORS.gray[500]}; font-size: 14px; margin: 0 0 8px;"><strong>Pro tip:</strong></p>
        <p style="color: ${COLORS.gray[700]}; font-size: 14px; margin: 0;">Share your event on social media to reach even more people!</p>
      `)}

      <p style="color: ${COLORS.gray[500]}; font-size: 14px; line-height: 1.6; margin: 20px 0 0;">
        Manage all your events from your <a href="${dashboardUrl}" style="color: ${COLORS.primary};">dashboard</a>.
      </p>
    `)}
  `);
}

/**
 * Event Rejection Email
 */
export function eventRejectionEmail(eventTitle: string, venueName: string, reason: string): string {
  const dashboardUrl = `${SITE_URL}/venue-portal/events`;

  return baseLayout(`
    ${simpleHeader('Event Submission Update')}
    ${contentBody(`
      <p style="color: ${COLORS.gray[700]}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
        Your event <strong>${eventTitle}</strong> at ${venueName} could not be published at this time.
      </p>

      ${alertBox('Reason:', reason, 'error')}

      <p style="color: ${COLORS.gray[700]}; font-size: 16px; line-height: 1.6; margin: 20px 0;">
        You can edit your event and resubmit it for review from your dashboard.
      </p>

      ${secondaryButton('Go to Dashboard', dashboardUrl)}

      <p style="color: ${COLORS.gray[500]}; font-size: 14px; line-height: 1.6; margin: 20px 0 0;">
        Need help? Contact us at
        <a href="mailto:help@bahrainnights.com" style="color: ${COLORS.primary};">help@bahrainnights.com</a>
      </p>
    `)}
  `);
}

/**
 * Password Reset Email
 */
export function passwordResetEmail(resetToken: string, expiresIn: string = '1 hour'): string {
  const resetUrl = `${SITE_URL}/reset-password?token=${resetToken}`;

  return baseLayout(`
    ${simpleHeader('Reset Your Password', COLORS.primary)}
    ${contentBody(`
      <p style="color: ${COLORS.gray[700]}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
        We received a request to reset your password for your BahrainNights account.
      </p>

      <p style="color: ${COLORS.gray[700]}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
        Click the button below to create a new password:
      </p>

      ${primaryButton('Reset Password', resetUrl)}

      ${alertBox('This link expires in:', expiresIn, 'warning')}

      <p style="color: ${COLORS.gray[500]}; font-size: 14px; line-height: 1.6; margin: 20px 0;">
        If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
      </p>

      <hr style="border: none; border-top: 1px solid ${COLORS.gray[200]}; margin: 30px 0;">

      <p style="color: ${COLORS.gray[500]}; font-size: 12px; line-height: 1.6; margin: 0;">
        If the button doesn't work, copy and paste this link into your browser:<br>
        <a href="${resetUrl}" style="color: ${COLORS.primary}; word-break: break-all; font-size: 11px;">${resetUrl}</a>
      </p>
    `)}
  `);
}

/**
 * Event Submission Confirmation Email (when venue submits an event)
 */
export function eventSubmissionConfirmation(eventTitle: string, venueName: string): string {
  const dashboardUrl = `${SITE_URL}/venue-portal/events`;

  return baseLayout(`
    ${gradientHeader('Event Submitted!', 'We received your event', '📅')}
    ${contentBody(`
      <p style="color: ${COLORS.gray[700]}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
        Thank you for submitting <strong>${eventTitle}</strong> from ${venueName}!
      </p>

      <p style="color: ${COLORS.gray[700]}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
        Your event is now under review. Our team will check the details and you'll receive an email once it's published.
      </p>

      ${infoBox(`
        <p style="color: ${COLORS.gray[500]}; font-size: 14px; margin: 0 0 8px;"><strong>What happens next?</strong></p>
        <ul style="color: ${COLORS.gray[700]}; font-size: 14px; margin: 0; padding-left: 20px;">
          <li>Our team reviews your event (usually within 24 hours)</li>
          <li>You'll receive an email when it's published</li>
          <li>Your event will be visible to thousands of visitors!</li>
        </ul>
      `)}

      ${primaryButton('View Your Events', dashboardUrl)}

      <p style="color: ${COLORS.gray[500]}; font-size: 14px; line-height: 1.6; margin: 20px 0 0;">
        Questions? Contact us at
        <a href="mailto:help@bahrainnights.com" style="color: ${COLORS.primary};">help@bahrainnights.com</a>
      </p>
    `)}
  `);
}

/**
 * Welcome Email (after first login)
 */
export function welcomeEmail(venueName: string): string {
  const dashboardUrl = `${SITE_URL}/venue-portal/dashboard`;
  const addEventUrl = `${SITE_URL}/venue-portal/events/create`;

  return baseLayout(`
    ${gradientHeader('Welcome to BahrainNights!', `${venueName} is ready to shine`, '🌟')}
    ${contentBody(`
      <p style="color: ${COLORS.gray[700]}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
        Welcome aboard! Here's how to make the most of your BahrainNights venue account:
      </p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
        <tr>
          <td style="padding: 16px; background: ${COLORS.gray[50]}; border-radius: 8px; margin-bottom: 12px;">
            <p style="margin: 0 0 8px; font-weight: 600; color: ${COLORS.gray[900]};">1. Complete Your Profile</p>
            <p style="margin: 0; color: ${COLORS.gray[500]}; font-size: 14px;">Add photos, description, and contact details</p>
          </td>
        </tr>
        <tr><td style="height: 12px;"></td></tr>
        <tr>
          <td style="padding: 16px; background: ${COLORS.gray[50]}; border-radius: 8px; margin-bottom: 12px;">
            <p style="margin: 0 0 8px; font-weight: 600; color: ${COLORS.gray[900]};">2. Add Your First Event</p>
            <p style="margin: 0; color: ${COLORS.gray[500]}; font-size: 14px;">List upcoming events, promotions, or offers</p>
          </td>
        </tr>
        <tr><td style="height: 12px;"></td></tr>
        <tr>
          <td style="padding: 16px; background: ${COLORS.gray[50]}; border-radius: 8px;">
            <p style="margin: 0 0 8px; font-weight: 600; color: ${COLORS.gray[900]};">3. Share & Grow</p>
            <p style="margin: 0; color: ${COLORS.gray[500]}; font-size: 14px;">Share your venue page on social media</p>
          </td>
        </tr>
      </table>

      ${primaryButton('Add Your First Event', addEventUrl)}

      <p style="color: ${COLORS.gray[500]}; font-size: 14px; line-height: 1.6; margin: 20px 0 0; text-align: center;">
        Need help? Our team is here for you at
        <a href="mailto:help@bahrainnights.com" style="color: ${COLORS.primary};">help@bahrainnights.com</a>
      </p>
    `)}
  `);
}

// Export all templates
export default {
  venueRegistrationConfirmation,
  venueApprovalEmail,
  venueRejectionEmail,
  eventSubmissionConfirmation,
  eventApprovalEmail,
  eventRejectionEmail,
  passwordResetEmail,
  welcomeEmail,
};
