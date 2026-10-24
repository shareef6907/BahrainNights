/**
 * Email Service for BahrainNights.com
 * High-level email functions using AWS SES
 */

import { sendEmail, EmailResult } from './ses';
import {
  venueRegistrationConfirmation,
  venueApprovalEmail,
  venueRejectionEmail,
  eventSubmissionConfirmation,
  eventApprovalEmail,
  eventRejectionEmail,
  passwordResetEmail,
  passwordChangedEmail,
  welcomeEmail,
  contactFormNotification,
  contactFormConfirmation,
  type ContactFormData,
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
 * Send event submission confirmation email (when venue submits an event)
 */
export async function sendEventSubmissionEmail(
  email: string,
  eventTitle: string,
  venueName: string
): Promise<EmailResult> {
  return sendEmail({
    to: email,
    subject: `Event Submitted - ${eventTitle}`,
    html: eventSubmissionConfirmation(eventTitle, venueName),
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

/**
 * Send password changed confirmation email
 */
export async function sendPasswordChangedEmail(
  email: string
): Promise<EmailResult> {
  return sendEmail({
    to: email,
    subject: 'Your BahrainNights Password Has Been Changed',
    html: passwordChangedEmail(),
  });
}

/**
 * Send a contact form enquiry to the BahrainNights team.
 * The visitor's address is set as Reply-To so hitting reply reaches them directly.
 */
export async function sendContactFormNotification(
  data: ContactFormData,
  recipient: string = process.env.CONTACT_FORM_RECIPIENT || 'sales@bahrainnights.com'
): Promise<EmailResult> {
  const subject = data.subject?.trim() || 'General enquiry';
  return sendEmail({
    to: recipient,
    subject: `[BahrainNights] ${subject} — ${data.name}`,
    html: contactFormNotification(data),
    text: `New contact form enquiry\n\nName: ${data.name}\nEmail: ${data.email}\nSubject: ${subject}\n\nMessage:\n${data.message}`,
    replyTo: data.email,
  });
}

/**
 * Send the visitor a confirmation that their enquiry was delivered.
 */
export async function sendContactFormConfirmation(
  data: ContactFormData
): Promise<EmailResult> {
  const subject = data.subject?.trim() || 'your enquiry';
  return sendEmail({
    to: data.email,
    subject: 'We received your message — BahrainNights',
    html: contactFormConfirmation(data),
    text: `Hi ${data.name},\n\nThanks for getting in touch about "${subject}". Your message has reached the BahrainNights team and we usually respond within one business day.\n\nIf it is urgent, call us on +973 3900 7750.\n\nBahrainNights.com`,
  });
}

// Re-export types and low-level function for custom emails
export { sendEmail, type EmailResult } from './ses';
