import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Venue vibe type
interface VenueVibe {
  id: string;
  name: string;
  slug: string;
  category: string;
  image?: string;
  crowdLevel: number;
  musicVibe: string;
  waitTime: string;
  atmosphere: string;
  lastUpdated: string;
  totalCheckins: number;
  trending: boolean;
}

export async function GET() {
  try {
    // First try to get vibe check data from database
    const { data: vibeData, error: vibeError } = await supabaseAdmin
      .from('vibe_checks')
      .select(`
        id,
        venue_id,
        crowd_level,
        music_vibe,
        wait_time,
        atmosphere,
        created_at,
        venues:venue_id (
          id,
          name,
          slug,
          category,
          cover_image
        )
      `)
      .gte('created_at', new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()) // Last 4 hours
      .order('created_at', { ascending: false });

    // If vibe_checks table doesn't exist, fall back to venues with mock data
    if (vibeError) {
      // Fallback: get popular venues and create mock vibe data
      const { data: venues, error: venueError } = await supabaseAdmin
        .from('venues')
        .select('id, name, slug, category, cover_image')
        .eq('is_published', true)
        .in('category', ['Nightclub', 'Bar', 'Lounge', 'Pub', 'Restaurant', 'Beach Club', 'Club'])
        .limit(10);

      if (venueError || !venues?.length) {
        return NextResponse.json({ venues: [] });
      }

      // Create mock vibe data for demo purposes
      const mockVenues: VenueVibe[] = venues.slice(0, 6).map((venue, index) => ({
        id: venue.id,
        name: venue.name,
        slug: venue.slug,
        category: venue.category || 'Venue',
        image: venue.cover_image,
        crowdLevel: Math.floor(Math.random() * 4) + 1, // 1-4
        musicVibe: ['Background', 'DJ Playing', 'Live Music', 'No Music'][Math.floor(Math.random() * 4)],
        waitTime: ['No wait', '5-10 min', '10-15 min', '15-20 min'][Math.floor(Math.random() * 4)],
        atmosphere: ['Chill', 'Lively', 'Romantic', 'Wild', 'Classy'][Math.floor(Math.random() * 5)],
        lastUpdated: `${Math.floor(Math.random() * 60) + 5} min ago`,
        totalCheckins: Math.floor(Math.random() * 30) + 5,
        trending: index < 2, // First 2 are trending
      }));

      return NextResponse.json({ venues: mockVenues });
    }

    // Process real vibe check data
    const venueVibeMap = new Map<string, {
      checks: number;
      totalCrowd: number;
      musicVibes: string[];
      atmospheres: string[];
      waitTimes: string[];
      lastCheck: string;
      venue: { id: string; name: string; slug: string; category: string; cover_image: string };
    }>();

    for (const check of vibeData || []) {
      const venueId = check.venue_id;
      const venue = check.venues as unknown as { id: string; name: string; slug: string; category: string; cover_image: string };

      if (!venue) continue;

      if (!venueVibeMap.has(venueId)) {
        venueVibeMap.set(venueId, {
          checks: 0,
          totalCrowd: 0,
          musicVibes: [],
          atmospheres: [],
          waitTimes: [],
          lastCheck: check.created_at,
          venue,
        });
      }

      const venueData = venueVibeMap.get(venueId)!;
      venueData.checks += 1;
      venueData.totalCrowd += check.crowd_level || 3;
      if (check.music_vibe) venueData.musicVibes.push(check.music_vibe);
      if (check.atmosphere) venueData.atmospheres.push(check.atmosphere);
      if (check.wait_time) venueData.waitTimes.push(check.wait_time);
    }

    // Convert to array and calculate aggregates
    const venues: VenueVibe[] = Array.from(venueVibeMap.entries())
      .map(([_, data]) => {
        const avgCrowd = Math.round(data.totalCrowd / data.checks);
        const mostCommon = (arr: string[]) => {
          if (!arr.length) return 'Unknown';
          const counts = arr.reduce((acc, val) => ({ ...acc, [val]: (acc[val] || 0) + 1 }), {} as Record<string, number>);
          return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
        };

        const lastCheckTime = new Date(data.lastCheck);
        const minutesAgo = Math.floor((Date.now() - lastCheckTime.getTime()) / 60000);
        const timeAgo = minutesAgo < 60
          ? `${minutesAgo} min ago`
          : `${Math.floor(minutesAgo / 60)} hour${Math.floor(minutesAgo / 60) > 1 ? 's' : ''} ago`;

        return {
          id: data.venue.id,
          name: data.venue.name,
          slug: data.venue.slug,
          category: data.venue.category || 'Venue',
          image: data.venue.cover_image,
          crowdLevel: avgCrowd,
          musicVibe: mostCommon(data.musicVibes),
          waitTime: mostCommon(data.waitTimes),
          atmosphere: mostCommon(data.atmospheres),
          lastUpdated: timeAgo,
          totalCheckins: data.checks,
          trending: data.checks >= 5 || avgCrowd >= 4,
        };
      })
      .sort((a, b) => {
        // Sort by trending first, then by check-ins
        if (a.trending && !b.trending) return -1;
        if (!a.trending && b.trending) return 1;
        return b.totalCheckins - a.totalCheckins;
      });

    return NextResponse.json({ venues });
  } catch (error) {
    console.error('Error fetching vibe data:', error);
    return NextResponse.json({ venues: [] });
  }
}
