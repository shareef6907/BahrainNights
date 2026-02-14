import { NextResponse } from 'next/server';
import { createBookingRequest } from '@/lib/db/artists';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      event_date,
      event_time,
      event_type,
      venue_name,
      guest_count,
      preferred_artists,
      budget_range,
      special_requirements,
      client_name,
      client_email,
      client_phone,
    } = body;

    // Validate required fields
    if (!event_date || !event_type || !client_name || !client_email) {
      return NextResponse.json(
        { error: 'Missing required fields: event_date, event_type, client_name, client_email' },
        { status: 400 }
      );
    }

    // Create booking request in database
    const bookingRequest = await createBookingRequest({
      event_date,
      event_time: event_time || null,
      event_type,
      venue_name: venue_name || null,
      guest_count: guest_count || null,
      preferred_artists: preferred_artists?.length > 0 ? preferred_artists : null,
      budget_range: budget_range || null,
      special_requirements: special_requirements || null,
      client_name,
      client_email,
      client_phone: client_phone || null,
      status: 'new',
    });

    // Format preferred artists for email
    const artistsText = preferred_artists?.length > 0 
      ? preferred_artists.join(', ')
      : 'No specific preference';

    // Format budget range for email
    const budgetLabels: Record<string, string> = {
      'under_50': 'Under 50 BHD',
      '50_100': '50 - 100 BHD',
      '100_250': '100 - 250 BHD',
      '250_500': '250 - 500 BHD',
      '500_plus': '500+ BHD',
      'prefer_not_to_say': 'Prefer not to say',
    };
    const budgetText = budget_range ? budgetLabels[budget_range] || budget_range : 'Not specified';

    // Format event type
    const eventTypeLabels: Record<string, string> = {
      'private_party': 'Private Party',
      'corporate_event': 'Corporate Event',
      'wedding': 'Wedding',
      'hotel_venue_night': 'Hotel/Venue Night',
      'festival': 'Festival',
      'other': 'Other',
    };
    const eventTypeText = eventTypeLabels[event_type] || event_type;

    // Send notification email to bookings@bahrainnights.com
    try {
      await sendEmail({
        to: 'bookings@bahrainnights.com',
        subject: `🎭 New Artist Booking Request - ${eventTypeText}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Booking Request</h1>
            </div>
            
            <div style="padding: 30px; background: #1a1a1a; color: #e5e7eb;">
              <h2 style="color: #f59e0b; margin-top: 0;">Event Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #9ca3af;">Event Type</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: white; text-align: right;">${eventTypeText}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #9ca3af;">Event Date</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: white; text-align: right;">${event_date}${event_time ? ` at ${event_time}` : ''}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #9ca3af;">Venue</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: white; text-align: right;">${venue_name || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #9ca3af;">Guest Count</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: white; text-align: right;">${guest_count || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #9ca3af;">Budget Range</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: white; text-align: right;">${budgetText}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #9ca3af;">Preferred Artists</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: white; text-align: right;">${artistsText}</td>
                </tr>
              </table>

              ${special_requirements ? `
                <h3 style="color: #f59e0b; margin-top: 30px;">Special Requirements</h3>
                <p style="background: #111; padding: 15px; border-radius: 8px; color: #e5e7eb; margin: 0;">${special_requirements}</p>
              ` : ''}

              <h2 style="color: #f59e0b; margin-top: 30px;">Client Contact</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #9ca3af;">Name</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: white; text-align: right;">${client_name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #9ca3af;">Email</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: white; text-align: right;"><a href="mailto:${client_email}" style="color: #f59e0b;">${client_email}</a></td>
                </tr>
                ${client_phone ? `
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #9ca3af;">Phone</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: white; text-align: right;"><a href="tel:${client_phone}" style="color: #f59e0b;">${client_phone}</a></td>
                </tr>
                ` : ''}
              </table>

              <div style="margin-top: 30px; padding: 20px; background: #111; border-radius: 8px; text-align: center;">
                <a href="https://bahrainnights.com/admin/artists" style="display: inline-block; padding: 12px 24px; background: #f59e0b; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">View in Admin Panel</a>
              </div>
            </div>
            
            <div style="padding: 20px; background: #0a0a0a; text-align: center; color: #6b7280; font-size: 12px;">
              <p style="margin: 0;">BahrainNights Entertainment Booking</p>
              <p style="margin: 5px 0 0;">Request ID: ${bookingRequest.id}</p>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({ 
      success: true, 
      id: bookingRequest.id,
      message: 'Booking request submitted successfully' 
    });
  } catch (error) {
    console.error('Error creating booking request:', error);
    return NextResponse.json(
      { error: 'Failed to submit booking request' },
      { status: 500 }
    );
  }
}
