import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

// Rate limiting
const inquiryAttempts = new Map<string, { count: number; resetTime: number }>();
const MAX_INQUIRIES_PER_HOUR = 3;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = inquiryAttempts.get(ip);

  if (!entry || now > entry.resetTime) {
    inquiryAttempts.set(ip, { count: 1, resetTime: now + 3600000 });
    return true;
  }

  if (entry.count >= MAX_INQUIRIES_PER_HOUR) {
    return false;
  }

  entry.count++;
  return true;
}

// Sanitize input to prevent XSS
function sanitize(str: string | undefined | null): string | null {
  if (!str) return null;
  return str
    .trim()
    .replace(/<[^>]*>/g, '')
    .replace(/[<>'\"]/g, '');
}

// POST /api/sponsors/inquiry - Submit sponsor inquiry
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
               request.headers.get('x-real-ip') ||
               'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many inquiries. Please try again later.' },
        { status: 429 }
      );
    }

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

    // Store inquiry in database with sanitized inputs
    const { data, error } = await supabase
      .from('sponsor_inquiries')
      .insert({
        business_name: sanitize(businessName) || '',
        contact_name: sanitize(contactName) || '',
        email: email.trim().toLowerCase(),
        phone: sanitize(phone) || null,
        preferred_tier: sanitize(tier) || 'golden',
        message: sanitize(message) || null,
        status: 'pending',
      } as any)
      .select()
      .single();

    if (error) {
      // If table doesn't exist, just log and return success (we'll create it later)
      // Handle both PostgreSQL error code and PostgREST error code
      if (error.code === '42P01' || error.code === 'PGRST205') {
        console.log('Sponsor inquiry received (table not yet created):', {
          businessName,
          contactName,
          email,
          tier,
        });
        return NextResponse.json({
          success: true,
          message: 'Inquiry received - table pending creation',
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
