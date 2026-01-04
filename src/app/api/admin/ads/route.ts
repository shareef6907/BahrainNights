import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getAds, createAd, getAdStats, getAvailableSlots, generateInvoiceNumber } from '@/lib/db/ads';
import { cookies } from 'next/headers';
import { z } from 'zod';

// Get all ads
export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const paymentStatus = searchParams.get('paymentStatus') || undefined;
    const search = searchParams.get('search') || undefined;
    const targetPage = searchParams.get('targetPage') || undefined;
    const placement = searchParams.get('placement') || undefined;

    // Get ads
    const ads = await getAds({
      status: status as 'active' | 'pending' | 'paused' | 'expired' | 'all' | undefined,
      paymentStatus: paymentStatus as 'pending' | 'paid' | 'overdue' | undefined,
      search,
      targetPage: targetPage as any,
      placement: placement as any,
    });

    // Get stats
    const stats = await getAdStats();

    return NextResponse.json({ ads, stats });
  } catch (error) {
    console.error('Error fetching ads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ads', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// Validation schema for creating ads
const createAdSchema = z.object({
  advertiserName: z.string().min(2),
  companyName: z.string().optional(),
  contactEmail: z.string().email(),
  contactPhone: z.string().optional(),
  title: z.string().min(3).optional(),
  subtitle: z.string().optional(),
  ctaText: z.string().optional(),
  imageUrl: z.string().url(),
  targetUrl: z.string().url(),
  slotPosition: z.number().min(1).max(5).optional(),
  startDate: z.string(),
  endDate: z.string(),
  priceBd: z.number().min(0).optional().default(0),
  paymentStatus: z.enum(['pending', 'paid', 'overdue']).optional(),
  status: z.enum(['pending', 'active', 'paused', 'expired']).optional(),
  notes: z.string().optional(),
  targetPage: z.enum(['homepage', 'events', 'cinema', 'places', 'restaurants', 'cafes', 'lounges', 'nightclubs', 'offers', 'explore', 'all']).optional(),
  placement: z.enum(['slider', 'banner', 'sidebar', 'inline']).optional(),
});

// Create new ad
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Parse and validate request body
    const body = await request.json();
    const result = createAdSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.issues.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    const data = result.data;

    // Check slot availability if slot is specified
    if (data.slotPosition) {
      const availableSlots = await getAvailableSlots(data.startDate, data.endDate);
      if (!availableSlots.includes(data.slotPosition)) {
        return NextResponse.json(
          { error: `Slot ${data.slotPosition} is not available for the selected dates` },
          { status: 400 }
        );
      }
    }

    // Generate invoice number
    const invoiceNumber = await generateInvoiceNumber();

    // Create ad
    const ad = await createAd({
      advertiser_name: data.advertiserName,
      company_name: data.companyName || null,
      contact_email: data.contactEmail,
      contact_phone: data.contactPhone || null,
      title: data.title || null,
      subtitle: data.subtitle || null,
      cta_text: data.ctaText || null,
      image_url: data.imageUrl,
      target_url: data.targetUrl,
      slot_position: data.slotPosition || null,
      start_date: data.startDate,
      end_date: data.endDate,
      price_bd: data.priceBd,
      payment_status: data.paymentStatus || 'pending',
      status: data.status || 'pending',
      invoice_number: invoiceNumber,
      notes: data.notes || null,
      target_page: data.targetPage || 'homepage',
      placement: data.placement || 'slider',
    });

    return NextResponse.json(
      { ad, message: 'Ad created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating ad:', error);
    return NextResponse.json(
      { error: 'Failed to create ad' },
      { status: 500 }
    );
  }
}
