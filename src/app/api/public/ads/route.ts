import { NextRequest, NextResponse } from 'next/server';
import { getAdsForPage, type AdTargetPage, type AdPlacement } from '@/lib/db/ads';

// Cache ads for 5 minutes
export const revalidate = 300;

// Get active ads for a specific page and placement (public API)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const targetPage = (searchParams.get('targetPage') || 'homepage') as AdTargetPage;
    const placement = searchParams.get('placement') as AdPlacement | undefined;
    const limit = parseInt(searchParams.get('limit') || '5', 10);

    // Fetch ads for this page/placement
    const ads = await getAdsForPage(targetPage, placement);

    // Limit results
    const limitedAds = ads.slice(0, limit);

    // Return only public-safe fields
    const publicAds = limitedAds.map((ad) => ({
      id: ad.id,
      title: ad.title,
      subtitle: ad.subtitle,
      cta_text: ad.cta_text,
      image_url: ad.image_url,
      target_url: ad.target_url,
      advertiser_name: ad.advertiser_name,
      slot_position: ad.slot_position,
      image_settings: ad.image_settings,
    }));

    return NextResponse.json({ ads: publicAds }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error fetching public ads:', error);
    return NextResponse.json({ ads: [] });
  }
}
