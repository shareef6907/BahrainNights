import { NextResponse } from 'next/server';
import { getArtistById, updateArtist, deleteArtist } from '@/lib/db/artists';
import { sendEmail } from '@/lib/email';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const artist = await getArtistById(id);

    if (!artist) {
      return NextResponse.json(
        { error: 'Artist not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(artist);
  } catch (error) {
    console.error('Error fetching artist:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artist' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Get current artist to check for status change
    const currentArtist = await getArtistById(id);
    if (!currentArtist) {
      return NextResponse.json(
        { error: 'Artist not found' },
        { status: 404 }
      );
    }

    // Update artist
    const updatedArtist = await updateArtist(id, body);

    // Send email notifications for status changes
    if (body.status && body.status !== currentArtist.status && currentArtist.submitted_email) {
      const email = currentArtist.submitted_email;
      
      if (body.status === 'approved') {
        try {
          await sendEmail({
            to: email,
            subject: '🎉 Your Artist Application has been Approved! | BahrainNights',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; text-align: center;">
                  <h1 style="color: white; margin: 0;">Welcome to BahrainNights!</h1>
                </div>
                <div style="padding: 30px; background: #1a1a1a; color: #e5e7eb;">
                  <h2 style="color: #f59e0b;">Congratulations, ${currentArtist.stage_name}!</h2>
                  <p>Your artist application has been approved! You are now part of the BahrainNights entertainment roster.</p>
                  <p>Your profile is now live at:</p>
                  <a href="https://bahrainnights.com/artists/${currentArtist.slug}" 
                     style="display: inline-block; margin: 20px 0; padding: 12px 24px; background: #f59e0b; color: white; text-decoration: none; border-radius: 8px;">
                    View Your Profile
                  </a>
                  <p>Remember to add <strong>@bh.nights</strong> to your Instagram bio for bookings.</p>
                  <p style="color: #9ca3af; margin-top: 30px;">All booking inquiries go through bookings@bahrainnights.com</p>
                </div>
              </div>
            `,
          });
        } catch (emailError) {
          console.error('Failed to send approval email:', emailError);
        }
      } else if (body.status === 'rejected') {
        try {
          await sendEmail({
            to: email,
            subject: 'Update on Your Artist Application | BahrainNights',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: #374151; padding: 30px; text-align: center;">
                  <h1 style="color: white; margin: 0;">BahrainNights</h1>
                </div>
                <div style="padding: 30px; background: #1a1a1a; color: #e5e7eb;">
                  <h2>Hi ${currentArtist.stage_name},</h2>
                  <p>Thank you for your interest in joining BahrainNights.</p>
                  <p>After reviewing your application, we are unable to approve it at this time.</p>
                  ${body.rejection_reason ? `<p><strong>Reason:</strong> ${body.rejection_reason}</p>` : ''}
                  <p>You are welcome to reapply in the future with updated information.</p>
                  <p style="color: #9ca3af; margin-top: 30px;">If you have questions, contact bookings@bahrainnights.com</p>
                </div>
              </div>
            `,
          });
        } catch (emailError) {
          console.error('Failed to send rejection email:', emailError);
        }
      }
    }

    return NextResponse.json(updatedArtist);
  } catch (error) {
    console.error('Error updating artist:', error);
    return NextResponse.json(
      { error: 'Failed to update artist' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    await deleteArtist(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting artist:', error);
    return NextResponse.json(
      { error: 'Failed to delete artist' },
      { status: 500 }
    );
  }
}
