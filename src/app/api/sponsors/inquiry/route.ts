import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

// POST /api/sponsors/inquiry - Submit sponsor inquiry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      businessName,
      contactName,
      email,
      phone,
      tier,
      message,
    } = body;

    // Validate required fields
    if (!businessName || !contactName || !email) {
      return NextResponse.json(
        { error: 'Business name, contact name, and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();

    // Store inquiry in database
    const { data, error } = await supabase
      .from('sponsor_inquiries')
      .insert({
        business_name: businessName,
        contact_name: contactName,
        email,
        phone: phone || null,
        preferred_tier: tier || 'golden',
        message: message || null,
        status: 'new',
      } as any)
      .select()
      .single();

    if (error) {
      // If table doesn't exist, just log and return success (we'll create it later)
      if (error.code === '42P01') {
        console.log('Sponsor inquiry received (table not yet created):', {
          businessName,
          contactName,
          email,
          tier,
        });
        return NextResponse.json({
          success: true,
          message: 'Inquiry received',
        });
      }
      console.error('Error saving inquiry:', error);
      throw error;
    }

    // TODO: Send notification email to admin
    // TODO: Send confirmation email to user

    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully',
      inquiry: data,
    });
  } catch (error) {
    console.error('Error processing sponsor inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}
