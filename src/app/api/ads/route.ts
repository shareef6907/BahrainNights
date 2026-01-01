import { NextResponse } from 'next/server';
import { getActiveAds, trackAdImpression } from '@/lib/db/ads';

// Get active ads for homepage slider (public endpoint)
export async function GET() {
  try {
    const ads = await getActiveAds();

    // Track impressions for all returned ads
    await Promise.all(ads.map(ad => trackAdImpression(ad.id)));

    // Return only necessary public data
    const publicAds = ads.map(ad => ({
      id: ad.id,
      title: ad.title,
      imageUrl: ad.image_url,
      targetUrl: ad.target_url,
      slotPosition: ad.slot_position,
    }));

    return NextResponse.json({ ads: publicAds });
  } catch (error) {
    console.error('Error fetching active ads:', error);
    return NextResponse.json({ ads: [] });
  }
}
