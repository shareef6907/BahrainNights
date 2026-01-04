import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { createAd, generateInvoiceNumber } from '@/lib/db/ads';
import { cookies } from 'next/headers';

// Quick create ad - simplified for slot-based uploading
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

    const body = await request.json();
    const { imageUrl, targetUrl, endDate, slotPosition, targetPage } = body;

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    // Generate invoice number
    const invoiceNumber = await generateInvoiceNumber();

    // Create ad with minimal required fields
    const ad = await createAd({
      advertiser_name: 'Quick Ad',
      company_name: null,
      contact_email: 'admin@bahrainnights.com',
      contact_phone: null,
      title: null,
      subtitle: null,
      cta_text: null,
      image_url: imageUrl,
      target_url: targetUrl || '',
      slot_position: slotPosition || null,
      start_date: new Date().toISOString().split('T')[0],
      end_date: endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      price_bd: 0,
      payment_status: 'paid',
      status: 'active',
      invoice_number: invoiceNumber,
      notes: null,
      target_page: targetPage || 'homepage',
      placement: 'slider',
    });

    return NextResponse.json({ ad, message: 'Ad created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating quick ad:', error);
    return NextResponse.json(
      { error: 'Failed to create ad', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
