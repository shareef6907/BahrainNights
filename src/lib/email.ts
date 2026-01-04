/**
 * Email Service for BahrainNights.com
 * High-level email functions using AWS SES
 */

import { sendEmail, EmailResult } from './ses';
import {
  venueRegistrationConfirmation,
  venueApprovalEmail,
  venueRejectionEmail,
  eventApprovalEmail,
  eventRejectionEmail,
  passwordResetEmail,
  welcomeEmail,
} from './email-templates';

/**
 * Send venue registration confirmation email
 */
export async function sendVenueRegistrationEmail(
  email: string,
  venueName: string
): Promise<EmailResult> {
  return sendEmail({
    to: email,
    subject: `Registration Received - ${venueName}`,
    html: venueRegistrationConfirmation(venueName),
  });
}

/**
 * Send venue approval notification email
 */
export async function sendVenueApprovalEmail(
  email: string,
  venueName: string,
  venueSlug: string
): Promise<EmailResult> {
  return sendEmail({
    to: email,
    subject: `🎉 ${venueName} is now live on BahrainNights!`,
    html: venueApprovalEmail(venueName, venueSlug),
  });
}

/**
 * Send venue rejection notification email
 */
export async function sendVenueRejectionEmail(
  email: string,
  venueName: string,
  reason: string
): Promise<EmailResult> {
  return sendEmail({
    to: email,
    subject: `Update on your ${venueName} registration`,
    html: venueRejectionEmail(venueName, reason),
  });
}

/**
 * Send event approval notification email
 */
export async function sendEventApprovalEmail(
  email: string,
  eventTitle: string,
  eventSlug: string,
  venueName: string
): Promise<EmailResult> {
  return sendEmail({
    to: email,
    subject: `🎊 Your event "${eventTitle}" is now live!`,
    html: eventApprovalEmail(eventTitle, eventSlug, venueName),
  });
}

/**
 * Send event rejection notification email
 */
export async function sendEventRejectionEmail(
  email: string,
  eventTitle: string,
  venueName: string,
  reason: string
): Promise<EmailResult> {
  return sendEmail({
    to: email,
    subject: `Update on your event "${eventTitle}"`,
    html: eventRejectionEmail(eventTitle, venueName, reason),
  });
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  email: string,
  resetToken: string,
  expiresIn: string = '1 hour'
): Promise<EmailResult> {
  return sendEmail({
    to: email,
    subject: 'Reset Your BahrainNights Password',
    html: passwordResetEmail(resetToken, expiresIn),
  });
}

/**
 * Send welcome email after first login
 */
export async function sendWelcomeEmail(
  email: string,
  venueName: string
): Promise<EmailResult> {
  return sendEmail({
    to: email,
    subject: `Welcome to BahrainNights, ${venueName}!`,
    html: welcomeEmail(venueName),
  });
}

// Re-export types and low-level function for custom emails
export { sendEmail, type EmailResult } from './ses';
