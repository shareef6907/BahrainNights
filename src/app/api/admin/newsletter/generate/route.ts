import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

interface NewsletterEvent {
  id: string;
  title: string;
  slug: string;
  date: string;
  time: string | null;
  venue_name: string | null;
  category: string;
  cover_url: string | null;
  country?: string;
  city?: string | null;
}

function getCategoryColor(category: string): { bg: string; text: string; emoji: string } {
  const colors: Record<string, { bg: string; text: string; emoji: string }> = {
    music: { bg: '#7C3AED', text: '#ffffff', emoji: '🎵' },
    sports: { bg: '#10B981', text: '#ffffff', emoji: '⚽' },
    arts: { bg: '#EC4899', text: '#ffffff', emoji: '🎨' },
    dining: { bg: '#F59E0B', text: '#000000', emoji: '🍽️' },
    community: { bg: '#3B82F6', text: '#ffffff', emoji: '🤝' },
    nightlife: { bg: '#8B5CF6', text: '#ffffff', emoji: '🌙' },
    family: { bg: '#34D399', text: '#000000', emoji: '👨‍👩‍👧‍👦' },
    special: { bg: '#EF4444', text: '#ffffff', emoji: '⭐' },
  };
  return colors[category?.toLowerCase()] || { bg: '#6B7280', text: '#ffffff', emoji: '📅' };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function generateEventCard(event: any, featured = false): string {
  const cat = getCategoryColor(event.category);
  const imageUrl = event.cover_url || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop';
  const eventUrl = `https://bahrainnights.com/events/${event.slug}`;
  
  if (featured) {
    return `
    <tr>
      <td style="padding: 0 0 30px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; overflow: hidden;">
          <tr>
            <td>
              <img src="${imageUrl}" alt="${event.title}" width="100%" style="display: block; max-height: 250px; object-fit: cover;" />
            </td>
          </tr>
          <tr>
            <td style="padding: 24px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="display: inline-block; background: ${cat.bg}; color: ${cat.text}; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-bottom: 12px;">
                      ${cat.emoji} ${event.category?.toUpperCase() || 'EVENT'}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 12px;">
                    <h2 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">${event.title}</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 12px;">
                    <p style="margin: 0; color: #9CA3AF; font-size: 14px;">
                      📅 ${formatDate(event.date)}${event.time ? ` at ${event.time}` : ''}<br/>
                      📍 ${event.venue_name || 'TBA'}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 20px;">
                    <a href="${eventUrl}" style="display: inline-block; background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); color: #000000; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px;">
                      Get Tickets →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
  }

  return `
    <td width="50%" style="padding: 8px; vertical-align: top;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background: #1E1E2E; border-radius: 12px; overflow: hidden;">
        <tr>
          <td>
            <img src="${imageUrl}" alt="${event.title}" width="100%" height="140" style="display: block; object-fit: cover;" />
          </td>
        </tr>
        <tr>
          <td style="padding: 16px;">
            <span style="display: inline-block; background: ${cat.bg}; color: ${cat.text}; padding: 4px 10px; border-radius: 12px; font-size: 10px; font-weight: 600;">
              ${cat.emoji} ${event.category?.toUpperCase() || 'EVENT'}
            </span>
            <h3 style="margin: 10px 0 8px 0; color: #ffffff; font-size: 15px; font-weight: 600; line-height: 1.3;">${event.title}</h3>
            <p style="margin: 0; color: #9CA3AF; font-size: 12px;">
              ${formatDate(event.date)}<br/>${event.venue_name || 'TBA'}
            </p>
            <a href="${eventUrl}" style="display: inline-block; margin-top: 12px; color: #F59E0B; font-size: 12px; font-weight: 600; text-decoration: none;">
              View Details →
            </a>
          </td>
        </tr>
      </table>
    </td>`;
}

function generateInternationalCard(event: any): string {
  const imageUrl = event.cover_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop';
  
  return `
    <td width="33%" style="padding: 8px; vertical-align: top;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background: #1E1E2E; border-radius: 10px; overflow: hidden;">
        <tr>
          <td>
            <img src="${imageUrl}" alt="${event.title}" width="100%" height="100" style="display: block; object-fit: cover;" />
          </td>
        </tr>
        <tr>
          <td style="padding: 12px;">
            <p style="margin: 0 0 6px 0; color: #F59E0B; font-size: 10px; font-weight: 600;">📍 ${event.city || event.country}</p>
            <h4 style="margin: 0; color: #ffffff; font-size: 13px; font-weight: 600; line-height: 1.3;">${event.title}</h4>
            <p style="margin: 6px 0 0 0; color: #9CA3AF; font-size: 11px;">${formatDate(event.date)}</p>
          </td>
        </tr>
      </table>
    </td>`;
}

function generateMovieCard(movie: any): string {
  const posterUrl = movie.poster_url 
    ? movie.poster_url 
    : movie.poster_path 
      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
      : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=450&fit=crop';
  const movieUrl = `https://bahrainnights.com/cinema/${movie.slug}`;
  const releaseDate = movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';
  
  return `
    <td width="25%" style="padding: 6px; vertical-align: top;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background: #1E1E2E; border-radius: 8px; overflow: hidden;">
        <tr>
          <td>
            <a href="${movieUrl}" style="text-decoration: none;">
              <img src="${posterUrl}" alt="${movie.title}" width="100%" height="140" style="display: block; object-fit: cover;" />
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px;">
            <h4 style="margin: 0; color: #ffffff; font-size: 11px; font-weight: 600; line-height: 1.3; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${movie.title}</h4>
            ${releaseDate ? `<p style="margin: 4px 0 0 0; color: #9CA3AF; font-size: 10px;">📅 ${releaseDate}</p>` : ''}
          </td>
        </tr>
      </table>
    </td>`;
}

export async function GET() {
  try {
    const today = new Date().toISOString().split('T')[0];
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const nextMonthStr = nextMonth.toISOString().split('T')[0];

    // Fetch upcoming Bahrain events
    const { data: bahrainEvents } = await supabaseAdmin
      .from('events')
      .select('id, title, slug, date, time, venue_name, category, cover_url')
      .eq('status', 'published')
      .eq('is_hidden', false)
      .eq('country', 'Bahrain')
      .gte('date', today)
      .lte('date', nextMonthStr)
      .order('date', { ascending: true })
      .limit(12);

    // Fetch international events
    const { data: internationalEvents } = await supabaseAdmin
      .from('events')
      .select('id, title, slug, date, venue_name, country, city, cover_url')
      .eq('status', 'published')
      .neq('country', 'Bahrain')
      .gte('date', today)
      .order('date', { ascending: true })
      .limit(6);

    // Fetch movies - Now Showing
    const { data: nowShowingMovies } = await supabaseAdmin
      .from('movies')
      .select('id, title, slug, poster_url, poster_path, release_date, tmdb_rating')
      .eq('is_now_showing', true)
      .order('tmdb_rating', { ascending: false })
      .limit(8);

    // Fetch movies - Coming Soon
    const { data: comingSoonMovies } = await supabaseAdmin
      .from('movies')
      .select('id, title, slug, poster_url, poster_path, release_date')
      .eq('is_coming_soon', true)
      .order('release_date', { ascending: true })
      .limit(4);

    const monthName = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const nowShowing = nowShowingMovies || [];
    const comingSoon = comingSoonMovies || [];
    const events = bahrainEvents || [];
    const intlEvents = internationalEvents || [];
    
    // Separate featured event
    const featuredEvent = events[0];
    const otherEvents = events.slice(1, 7);

    // Generate HTML email
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BahrainNights Newsletter - ${monthName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0A0A0F; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0A0A0F;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px;">
          
          <!-- Header -->
          <tr>
            <td style="padding: 30px; background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%); border-radius: 20px 20px 0 0; text-align: center;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 800;">
                <span style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">BahrainNights</span>
              </h1>
              <p style="margin: 10px 0 0 0; color: #9CA3AF; font-size: 14px;">Your Weekly Guide to What's Happening</p>
            </td>
          </tr>
          
          <!-- Hero Banner -->
          <tr>
            <td style="padding: 0;">
              <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=300&fit=crop" alt="Events in Bahrain" width="100%" style="display: block;" />
            </td>
          </tr>
          
          <!-- Greeting -->
          <tr>
            <td style="padding: 30px; background: #0F0F1A;">
              <h2 style="margin: 0; color: #ffffff; font-size: 24px;">Hey there! 👋</h2>
              <p style="margin: 15px 0 0 0; color: #D1D5DB; font-size: 15px; line-height: 1.6;">
                Here's what's happening in Bahrain this month. From concerts to dining experiences, we've got you covered.
              </p>
            </td>
          </tr>
          
          ${featuredEvent ? `
          <!-- Featured Event -->
          <tr>
            <td style="padding: 0 30px 20px 30px; background: #0F0F1A;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom: 15px;">
                    <h3 style="margin: 0; color: #F59E0B; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">⭐ Featured Event</h3>
                  </td>
                </tr>
                ${generateEventCard(featuredEvent as NewsletterEvent, true)}
              </table>
            </td>
          </tr>
          ` : ''}
          
          ${otherEvents.length > 0 ? `
          <!-- More Events -->
          <tr>
            <td style="padding: 20px 30px 30px 30px; background: #0F0F1A;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom: 15px;">
                    <h3 style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 700;">🔥 More Events This Month</h3>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      ${otherEvents.reduce((acc: string, event: any, i: number) => {
                        if (i % 2 === 0) acc += '<tr>';
                        acc += generateEventCard(event as NewsletterEvent);
                        if (i % 2 === 1 || i === otherEvents.length - 1) acc += '</tr>';
                        return acc;
                      }, '')}
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 20px; text-align: center;">
                    <a href="https://bahrainnights.com/events" style="display: inline-block; background: #1E1E2E; color: #ffffff; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 14px; border: 1px solid #374151;">
                      View All Events →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}
          
          ${intlEvents.length > 0 ? `
          <!-- International Events -->
          <tr>
            <td style="padding: 30px; background: linear-gradient(135deg, #1E3A5F 0%, #0F1629 100%);">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom: 15px;">
                    <h3 style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 700;">🌍 International Events</h3>
                    <p style="margin: 5px 0 0 0; color: #9CA3AF; font-size: 13px;">Planning a trip? Don't miss these!</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        ${intlEvents.slice(0, 3).map((e: any) => generateInternationalCard(e as NewsletterEvent)).join('')}
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 15px; text-align: center;">
                    <a href="https://bahrainnights.com/international" style="color: #F59E0B; font-size: 13px; font-weight: 600; text-decoration: none;">
                      Explore International Events →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}
          
          ${nowShowing.length > 0 ? `
          <!-- Movies Section -->
          <tr>
            <td style="padding: 30px; background: linear-gradient(135deg, #4C1D95 0%, #1E1B4B 100%);">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom: 15px;">
                    <h3 style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 700;">🎬 Now Showing in Cinemas</h3>
                    <p style="margin: 5px 0 0 0; color: #C4B5FD; font-size: 13px;">Catch these films on the big screen!</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        ${nowShowing.slice(0, 4).map((m: any) => generateMovieCard(m)).join('')}
                      </tr>
                    </table>
                  </td>
                </tr>
                ${nowShowing.length > 4 ? `
                <tr>
                  <td style="padding-top: 10px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        ${nowShowing.slice(4, 8).map((m: any) => generateMovieCard(m)).join('')}
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding-top: 15px; text-align: center;">
                    <a href="https://bahrainnights.com/cinema" style="display: inline-block; background: #7C3AED; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 13px;">
                      View All Movies & Showtimes →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}
          
          ${comingSoon.length > 0 ? `
          <!-- Coming Soon -->
          <tr>
            <td style="padding: 20px 30px 30px 30px; background: #0F0F1A;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom: 15px;">
                    <h3 style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 700;">🎥 Coming Soon</h3>
                    <p style="margin: 5px 0 0 0; color: #9CA3AF; font-size: 13px;">Mark your calendars!</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        ${comingSoon.slice(0, 4).map((m: any) => generateMovieCard(m)).join('')}
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}
          
          <!-- Tips Section -->
          <tr>
            <td style="padding: 30px; background: #0F0F1A;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom: 15px;">
                    <h3 style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 700;">💡 Insider Tips</h3>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; background: #1E1E2E; border-radius: 12px; border-left: 4px solid #F59E0B;">
                    <p style="margin: 0; color: #D1D5DB; font-size: 14px; line-height: 1.6;">
                      <strong style="color: #ffffff;">🎫 Pro tip:</strong> Book tickets early for popular events - they sell out fast!<br/><br/>
                      <strong style="color: #ffffff;">🍽️ Dining hack:</strong> Weekday lunches = shorter waits at new restaurants.<br/><br/>
                      <strong style="color: #ffffff;">📱 Stay updated:</strong> Follow us on Instagram <a href="https://instagram.com/bh.nights" style="color: #F59E0B;">@bh.nights</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background: #0A0A0F; border-radius: 0 0 20px 20px; text-align: center;">
              <!-- Social Icons -->
              <table cellpadding="0" cellspacing="0" style="margin: 0 auto 20px auto;">
                <tr>
                  <td style="padding: 0 10px;">
                    <a href="https://instagram.com/bh.nights" style="display: inline-block; width: 40px; height: 40px; background: #1E1E2E; border-radius: 10px; line-height: 40px; text-align: center; text-decoration: none; font-size: 18px;">📸</a>
                  </td>
                  <td style="padding: 0 10px;">
                    <a href="https://twitter.com/bahaborababy" style="display: inline-block; width: 40px; height: 40px; background: #1E1E2E; border-radius: 10px; line-height: 40px; text-align: center; text-decoration: none; font-size: 18px;">🐦</a>
                  </td>
                  <td style="padding: 0 10px;">
                    <a href="https://bahrainnights.com" style="display: inline-block; width: 40px; height: 40px; background: #1E1E2E; border-radius: 10px; line-height: 40px; text-align: center; text-decoration: none; font-size: 18px;">🌐</a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0 0 15px 0; color: #6B7280; font-size: 12px;">
                You're receiving this because you subscribed to BahrainNights updates.
              </p>
              <p style="margin: 0; color: #6B7280; font-size: 12px;">
                <a href="https://bahrainnights.com/unsubscribe" style="color: #9CA3AF; text-decoration: underline;">Unsubscribe</a>
                &nbsp;•&nbsp;
                <a href="https://bahrainnights.com/privacy" style="color: #9CA3AF; text-decoration: underline;">Privacy Policy</a>
              </p>
              <p style="margin: 20px 0 0 0; color: #4B5563; font-size: 11px;">
                © ${new Date().getFullYear()} BahrainNights. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    // Also generate plain text version
    const textContent = `
BahrainNights Newsletter - ${monthName}

Hey there! 👋

Here's what's happening in Bahrain this month:

${featuredEvent ? `⭐ FEATURED EVENT
${(featuredEvent as NewsletterEvent).title}
📅 ${formatDate((featuredEvent as NewsletterEvent).date)}
📍 ${(featuredEvent as NewsletterEvent).venue_name || 'TBA'}
🔗 https://bahrainnights.com/events/${(featuredEvent as NewsletterEvent).slug}

` : ''}
🔥 MORE EVENTS
${otherEvents.map((e: any) => `• ${e.title} - ${formatDate(e.date)} at ${e.venue_name || 'TBA'}`).join('\n')}

${intlEvents.length > 0 ? `
🌍 INTERNATIONAL EVENTS
${intlEvents.map((e: any) => `• ${e.title} - ${e.city || e.country} (${formatDate(e.date)})`).join('\n')}
` : ''}

${nowShowing.length > 0 ? `
🎬 NOW SHOWING IN CINEMAS
${nowShowing.slice(0, 6).map((m: any) => `• ${m.title}`).join('\n')}
See all movies: https://bahrainnights.com/cinema
` : ''}

${comingSoon.length > 0 ? `
🎥 COMING SOON
${comingSoon.slice(0, 4).map((m: any) => `• ${m.title}${m.release_date ? ` (${new Date(m.release_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})` : ''}`).join('\n')}
` : ''}

💡 INSIDER TIPS
• Book tickets early - popular events sell out fast!
• Weekday lunches = shorter waits at new restaurants
• Follow us on Instagram @bh.nights

---
BahrainNights - Your guide to what's happening
https://bahrainnights.com

Unsubscribe: https://bahrainnights.com/unsubscribe
`;

    const response = NextResponse.json({ 
      html: htmlContent,
      text: textContent,
      eventsCount: events.length,
      internationalCount: intlEvents.length,
      moviesNowShowing: nowShowing.length,
      moviesComingSoon: comingSoon.length,
      subject: `🔥 What's Happening in Bahrain - ${monthName}`,
      version: 'v3-with-movies',
    });
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    return response;
  } catch (error) {
    console.error('Newsletter generation error:', error);
    return NextResponse.json({ 
      html: '<p>Error generating newsletter</p>',
      text: 'Error generating newsletter',
      error: 'Failed to generate newsletter'
    }, { status: 500 });
  }
}
// Build trigger 1769448907
