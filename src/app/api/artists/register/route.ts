import { NextResponse } from 'next/server';
import { createArtist, generateUniqueSlug } from '@/lib/db/artists';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      real_name,
      stage_name,
      email,
      phone,
      instagram_handle,
      category,
      subcategory,
      bio,
      years_experience,
      notable_venues,
      rate_per_hour,
      rate_per_event,
      rate_notes,
    } = body;

    // Validate required fields
    if (!real_name || !stage_name || !email || !instagram_handle || !category || !bio) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate unique slug
    const slug = await generateUniqueSlug(stage_name);

    // Create artist record
    const artist = await createArtist({
      stage_name,
      real_name,
      slug,
      category,
      subcategory: subcategory || null,
      bio,
      status: 'pending',
      tier: 'bahrainnights_exclusive',
      instagram_handle: instagram_handle.replace('@', ''),
      instagram_verified: false,
      rate_per_hour: rate_per_hour || null,
      rate_per_event: rate_per_event || null,
      rate_notes: rate_notes ? `${rate_notes}\n\nYears experience: ${years_experience || 'Not specified'}\nNotable venues: ${notable_venues || 'Not specified'}` : null,
      submitted_email: email,
      submitted_phone: phone || null,
    });

    // Send confirmation email to artist
    try {
      await sendEmail({
        to: email,
        subject: 'Application Received | BahrainNights Entertainment',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0;">Application Received!</h1>
            </div>
            <div style="padding: 30px; background: #1a1a1a; color: #e5e7eb;">
              <h2 style="color: #f59e0b;">Hi ${stage_name},</h2>
              <p>Thank you for applying to join BahrainNights Entertainment Agency!</p>
              <p>We've received your application and our team will review it within 48 hours.</p>
              <p>Once approved, you'll receive an email with instructions to complete your profile.</p>
              <p style="color: #9ca3af; margin-top: 30px; font-size: 14px;">
                Remember: Add <strong>@bh.nights</strong> to your Instagram bio for bookings once approved.
              </p>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
    }

    // Send notification to admin
    try {
      await sendEmail({
        to: 'bookings@bahrainnights.com',
        subject: `🎭 New Artist Application: ${stage_name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0;">New Artist Application</h1>
            </div>
            <div style="padding: 30px; background: #1a1a1a; color: #e5e7eb;">
              <h2 style="color: #f59e0b;">${stage_name}</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #9ca3af;">Real Name</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: white;">${real_name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #9ca3af;">Category</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: white;">${category}${subcategory ? ` (${subcategory})` : ''}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #9ca3af;">Instagram</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: white;">@${instagram_handle.replace('@', '')}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #9ca3af;">Email</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: white;">${email}</td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #9ca3af;">Phone</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: white;">${phone}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #9ca3af;">Rate/Hour</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: white;">${rate_per_hour ? `${rate_per_hour} BHD` : 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #9ca3af;">Rate/Event</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #333; color: white;">${rate_per_event ? `${rate_per_event} BHD` : 'Not specified'}</td>
                </tr>
              </table>
              
              <h3 style="color: #f59e0b; margin-top: 20px;">Bio</h3>
              <p style="background: #111; padding: 15px; border-radius: 8px;">${bio}</p>
              
              ${notable_venues ? `
              <h3 style="color: #f59e0b;">Notable Venues</h3>
              <p style="background: #111; padding: 15px; border-radius: 8px;">${notable_venues}</p>
              ` : ''}
              
              <div style="margin-top: 30px; text-align: center;">
                <a href="https://bahrainnights.com/admin/artists" style="display: inline-block; padding: 12px 24px; background: #f59e0b; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
                  Review in Admin Panel
                </a>
              </div>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send admin notification:', emailError);
    }

    return NextResponse.json({ 
      success: true, 
      id: artist.id,
      message: 'Application submitted successfully' 
    });
  } catch (error) {
    console.error('Error creating artist application:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
