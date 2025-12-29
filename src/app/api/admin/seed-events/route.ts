import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// Generate a URL-friendly slug from title
function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const timestamp = Date.now().toString(36);
  return `${base}-${timestamp}`;
}

// Sample events data covering all categories
const sampleEvents = [
  // Music & Concerts (3 events)
  {
    title: "New Year's Eve Jazz Night",
    description: "Ring in 2026 with an unforgettable evening of live jazz at The Orangery. Featuring the Bahrain Jazz Quartet with special guest vocalist Sarah Williams. Enjoy a complimentary glass of champagne at midnight and dance into the new year with style. Dress code: Smart casual.",
    category: "music",
    venue_name: "The Orangery",
    venue_address: "Adliya, Block 338, Bahrain",
    date: "2025-12-31",
    time: "21:00",
    price: "BD 35",
    is_featured: true,
  },
  {
    title: "Arabian Nights: Traditional Music Festival",
    description: "Experience the rich musical heritage of the Gulf region with performances by renowned Oud masters and traditional Bahraini musicians. This cultural celebration features Khaleeji rhythms, folk songs, and a special tribute to legendary Arab composers.",
    category: "music",
    venue_name: "Bahrain National Theatre",
    venue_address: "Manama, Building 69, Road 1901",
    date: "2026-01-03",
    time: "19:30",
    price: "BD 15",
    is_featured: false,
  },
  {
    title: "Acoustic Sunset Sessions",
    description: "Unwind with live acoustic performances overlooking the Arabian Gulf. Local and international artists perform stripped-down versions of popular hits as the sun sets over Bahrain Bay. Food and beverages available for purchase.",
    category: "music",
    venue_name: "Four Seasons Hotel Bahrain Bay",
    venue_address: "Bahrain Bay, Manama",
    date: "2026-01-05",
    time: "17:00",
    price: "Free",
    is_featured: false,
  },

  // Dining & Food (3 events)
  {
    title: "Friday Brunch Extravaganza",
    description: "Indulge in Bahrain's most lavish Friday brunch featuring over 200 dishes from around the world. Live cooking stations, fresh seafood, premium cuts, and an award-winning dessert selection. Kids eat free under 6 years old.",
    category: "dining",
    venue_name: "Gulf Hotel Bahrain",
    venue_address: "Adliya, Road 3601, Block 336",
    date: "2026-01-03",
    time: "12:30",
    price: "BD 45",
    is_featured: true,
  },
  {
    title: "Street Food Festival Bahrain",
    description: "Explore flavors from around the world at this exciting street food festival. Over 30 food trucks and stalls offering cuisines from Asia, Middle East, Europe, and the Americas. Live entertainment, kids zone, and cooking demonstrations throughout the day.",
    category: "dining",
    venue_name: "Bahrain Bay",
    venue_address: "Bahrain Bay Waterfront, Manama",
    date: "2026-01-04",
    time: "16:00",
    price: "Free Entry",
    is_featured: false,
  },
  {
    title: "Wine & Cheese Evening",
    description: "A sophisticated evening of fine wines paired with artisanal cheeses from around the world. Our sommelier will guide you through six premium wine selections paired with carefully curated cheese boards. Limited to 40 guests for an intimate experience.",
    category: "dining",
    venue_name: "The Ritz-Carlton, Bahrain",
    venue_address: "Seef District, Building 2052",
    date: "2026-01-08",
    time: "19:00",
    price: "BD 55",
    is_featured: false,
  },

  // Family & Kids (2 events)
  {
    title: "Family Fun Day at Wahooo!",
    description: "The ultimate family adventure awaits at Bahrain's largest indoor waterpark! Special holiday rates include unlimited access to all slides, wave pool, and attractions. Face painting, balloon artists, and character meet-and-greets for the little ones.",
    category: "family",
    venue_name: "Wahooo! Waterpark",
    venue_address: "City Centre Bahrain, Seef District",
    date: "2026-01-02",
    time: "10:00",
    price: "BD 12",
    is_featured: false,
  },
  {
    title: "Kids Art Workshop: New Year Creations",
    description: "Let your children's creativity shine in this hands-on art workshop. Kids aged 5-12 will create their own New Year themed artwork using various materials including paints, clay, and recycled materials. All supplies provided. Parents welcome to stay and watch.",
    category: "family",
    venue_name: "Bahrain National Museum",
    venue_address: "Al Fatih Highway, Manama",
    date: "2026-01-06",
    time: "10:00",
    price: "BD 8",
    is_featured: false,
  },

  // Arts & Culture (2 events)
  {
    title: "Contemporary Art Exhibition: Visions of Tomorrow",
    description: "A thought-provoking exhibition featuring works by emerging Bahraini and GCC artists exploring themes of identity, technology, and the future. Guided tours available daily at 11am and 4pm. Opening reception includes artist talks and refreshments.",
    category: "arts",
    venue_name: "Art Centre",
    venue_address: "Block 317, Manama",
    date: "2025-12-30",
    time: "10:00",
    price: "Free",
    is_featured: false,
  },
  {
    title: "Pearl Diving Heritage Experience",
    description: "Discover Bahrain's rich pearl diving heritage through interactive exhibits, traditional demonstrations, and storytelling sessions. Learn about the techniques used by generations of Bahraini pearl divers and try your hand at opening oysters. Perfect for history enthusiasts and families.",
    category: "arts",
    venue_name: "Bahrain National Museum",
    venue_address: "Al Fatih Highway, Manama",
    date: "2026-01-07",
    time: "09:00",
    price: "BD 3",
    is_featured: false,
  },

  // Sports & Fitness (2 events)
  {
    title: "New Year Beach Volleyball Tournament",
    description: "Start 2026 with an active lifestyle! Join our open beach volleyball tournament with divisions for all skill levels. Registration includes tournament t-shirt, refreshments, and prizes for top 3 teams. Teams of 4 players. Spectators welcome!",
    category: "sports",
    venue_name: "Coral Bay Beach",
    venue_address: "Coral Bay, Bahrain",
    date: "2026-01-04",
    time: "08:00",
    price: "BD 20 per team",
    is_featured: false,
  },
  {
    title: "Sunrise Yoga on the Beach",
    description: "Welcome the new year with peace and mindfulness. Join certified yoga instructor Maya for a rejuvenating sunrise yoga session on the beach. Suitable for all levels. Bring your own mat or rent one on-site. Healthy refreshments provided after class.",
    category: "sports",
    venue_name: "Al Jazayer Beach",
    venue_address: "Zallaq, Bahrain",
    date: "2026-01-01",
    time: "06:30",
    price: "BD 10",
    is_featured: false,
  },

  // Nightlife (3 events)
  {
    title: "NYE Countdown Party",
    description: "The biggest New Year's Eve party in Bahrain! World-class DJs, spectacular midnight fireworks view, premium open bar package, and an unforgettable countdown experience. VIP tables available with bottle service. 21+ only.",
    category: "nightlife",
    venue_name: "Coral Bay",
    venue_address: "Coral Bay, Bahrain",
    date: "2025-12-31",
    time: "22:00",
    price: "BD 75",
    is_featured: true,
  },
  {
    title: "Latin Night: Salsa & Bachata",
    description: "Heat up your Friday night with the hottest Latin rhythms! Free salsa lesson at 9pm followed by open dancing until late. Resident DJ spinning the best in Latin, Reggaeton, and Caribbean music. Mojito specials all night.",
    category: "nightlife",
    venue_name: "JJ's Irish Bar",
    venue_address: "Adliya, Block 338",
    date: "2026-01-03",
    time: "21:00",
    price: "Free",
    is_featured: false,
  },
  {
    title: "Rooftop Lounge: Chill & Groove",
    description: "Experience Bahrain's skyline like never before at our exclusive rooftop lounge night. Deep house and lounge music by DJ Khalid, signature cocktails, and stunning panoramic views. Smart casual dress code. Reservations recommended.",
    category: "nightlife",
    venue_name: "The Ritz-Carlton, Bahrain",
    venue_address: "Seef District, Building 2052",
    date: "2026-01-09",
    time: "20:00",
    price: "BD 20",
    is_featured: false,
  },

  // Business (2 events)
  {
    title: "Entrepreneurs Networking Breakfast",
    description: "Connect with Bahrain's thriving startup ecosystem over a power breakfast. Featuring keynote speaker Ahmed Al-Khalifa, CEO of Bahrain FinTech Bay, discussing 'Innovation Trends for 2026'. Networking session, business card exchange, and continental breakfast included.",
    category: "business",
    venue_name: "Bahrain FinTech Bay",
    venue_address: "Arcapita Building, Bahrain Bay",
    date: "2026-01-07",
    time: "08:00",
    price: "BD 15",
    is_featured: false,
  },
  {
    title: "Digital Marketing Workshop 2026",
    description: "Stay ahead of the curve with this intensive full-day workshop on the latest digital marketing strategies. Topics include AI in marketing, social media trends, SEO updates, and content marketing best practices. Certificate of completion provided.",
    category: "business",
    venue_name: "Wyndham Grand Manama",
    venue_address: "Bahrain Bay, Manama",
    date: "2026-01-10",
    time: "09:00",
    price: "BD 75",
    is_featured: false,
  },

  // Wellness (2 events)
  {
    title: "New Year Wellness Retreat",
    description: "Reset your mind and body with our one-day wellness retreat. Program includes morning meditation, yoga session, healthy brunch, spa treatment, and sound healing ceremony. Leave feeling refreshed and ready to tackle 2026 with renewed energy.",
    category: "wellness",
    venue_name: "Sofitel Bahrain Zallaq Thalassa Sea & Spa",
    venue_address: "Zallaq, Bahrain",
    date: "2026-01-02",
    time: "08:00",
    price: "BD 95",
    is_featured: true,
  },
  {
    title: "Meditation & Mindfulness Workshop",
    description: "Learn practical meditation techniques to reduce stress and improve focus. This beginner-friendly workshop covers breathing exercises, guided meditation, and tips for building a daily practice. Tea and healthy snacks provided.",
    category: "wellness",
    venue_name: "The Yoga Studio Bahrain",
    venue_address: "Juffair, Block 322",
    date: "2026-01-05",
    time: "18:00",
    price: "BD 12",
    is_featured: false,
  },
];

export async function POST() {
  try {
    const insertedEvents = [];
    const errors = [];

    for (const event of sampleEvents) {
      const eventData = {
        title: event.title,
        slug: generateSlug(event.title),
        description: event.description,
        category: event.category,
        venue_name: event.venue_name,
        venue_address: event.venue_address,
        date: event.date,
        time: event.time,
        price: event.price,
        status: 'published',
        is_featured: event.is_featured,
        views: Math.floor(Math.random() * 500), // Random views for realism
        contact_name: 'BahrainNights Team',
        contact_email: 'events@bahrainnights.com',
      };

      const { data, error } = await supabaseAdmin
        .from('events')
        .insert(eventData)
        .select()
        .single();

      if (error) {
        errors.push({ title: event.title, error: error.message });
      } else {
        insertedEvents.push({ id: data.id, title: data.title });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully created ${insertedEvents.length} events`,
      created: insertedEvents,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error('Seed events error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to seed events' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST to seed sample events',
    eventCount: sampleEvents.length,
    categories: [...new Set(sampleEvents.map(e => e.category))],
  });
}
