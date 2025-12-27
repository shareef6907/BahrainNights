import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

// Initialize Supabase client with service role key for admin operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Helper to generate slugs
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function seed() {
  console.log('🌱 Starting database seed...\n');

  try {
    // ============================================
    // 1. SEED ADMIN USER
    // ============================================
    console.log('👤 Creating admin user...');
    const adminPasswordHash = await bcrypt.hash('Admin1234!', 12);

    const { data: adminUser, error: adminError } = await supabase
      .from('users')
      .upsert({
        email: 'admin@bahrainnights.com',
        password_hash: adminPasswordHash,
        role: 'admin',
        status: 'active',
      }, { onConflict: 'email' })
      .select()
      .single();

    if (adminError) {
      console.error('Error creating admin user:', adminError);
    } else {
      console.log('✅ Admin user created:', adminUser.email);
    }

    // ============================================
    // 2. SEED VENUES
    // ============================================
    console.log('\n🏪 Creating venues...');

    const venues = [
      {
        name: 'The Orangery',
        slug: 'the-orangery',
        description: 'A beautiful garden restaurant offering Mediterranean cuisine in a stunning outdoor setting.',
        description_ar: 'مطعم حديقة جميل يقدم المأكولات المتوسطية في بيئة خارجية رائعة.',
        category: 'restaurant',
        area: 'Adliya',
        address: 'Block 338, Road 3802, Adliya',
        phone: '+973 1771 2345',
        email: 'info@theorangery.bh',
        website: 'https://theorangery.bh',
        instagram: 'theorangerybh',
        status: 'approved',
        is_verified: true,
      },
      {
        name: 'Calexico',
        slug: 'calexico',
        description: 'Authentic Mexican street food and vibrant cocktails in a lively atmosphere.',
        description_ar: 'طعام الشارع المكسيكي الأصيل والكوكتيلات النابضة بالحياة في جو حيوي.',
        category: 'restaurant',
        area: 'Juffair',
        address: 'Block 428, Road 4207, Juffair',
        phone: '+973 1767 8901',
        email: 'hello@calexico.bh',
        website: 'https://calexico.bh',
        instagram: 'calexicobh',
        status: 'approved',
        is_verified: true,
      },
      {
        name: 'JJ\'s Irish Bar',
        slug: 'jjs-irish-bar',
        description: 'The heart of Bahrain\'s nightlife scene with live music, sports, and great drinks.',
        description_ar: 'قلب الحياة الليلية في البحرين مع الموسيقى الحية والرياضة والمشروبات الرائعة.',
        category: 'bar',
        area: 'Adliya',
        address: 'Block 338, Road 3833, Adliya',
        phone: '+973 1771 3456',
        email: 'info@jjsirishbar.com',
        instagram: 'jjsirishbarbh',
        status: 'approved',
        is_verified: true,
      },
      {
        name: 'Reef Resort',
        slug: 'reef-resort',
        description: 'Luxury beach resort with multiple restaurants, pools, and entertainment venues.',
        description_ar: 'منتجع شاطئي فاخر يضم العديد من المطاعم والمسابح وأماكن الترفيه.',
        category: 'hotel',
        area: 'Seef',
        address: 'Al Fateh Highway, Seef District',
        phone: '+973 1758 4444',
        email: 'reservations@reefresorrt.com',
        website: 'https://reefresort.com',
        instagram: 'reefresortbh',
        status: 'approved',
        is_verified: true,
      },
      {
        name: 'Monsoon',
        slug: 'monsoon',
        description: 'Contemporary Asian cuisine with stunning views of the Bahrain Bay.',
        description_ar: 'المطبخ الآسيوي المعاصر مع إطلالات خلابة على خليج البحرين.',
        category: 'restaurant',
        area: 'Manama',
        address: 'Four Seasons Hotel, Bahrain Bay',
        phone: '+973 1711 5050',
        email: 'monsoon@fourseasons.com',
        website: 'https://fourseasons.com/bahrain',
        instagram: 'monsoonbahrain',
        status: 'approved',
        is_verified: true,
      },
      {
        name: 'Wahooo! Waterpark',
        slug: 'wahooo-waterpark',
        description: 'Bahrain\'s largest indoor waterpark with exciting slides and attractions for all ages.',
        description_ar: 'أكبر حديقة مائية داخلية في البحرين مع زحاليق ومعالم مثيرة لجميع الأعمار.',
        category: 'entertainment',
        area: 'Seef',
        address: 'City Centre Bahrain, Seef District',
        phone: '+973 1717 7777',
        email: 'info@wahooowaterpark.com',
        website: 'https://wahooowaterpark.com',
        instagram: 'wahooowaterpark',
        status: 'approved',
        is_verified: true,
      },
    ];

    const { data: insertedVenues, error: venuesError } = await supabase
      .from('venues')
      .upsert(venues, { onConflict: 'slug' })
      .select();

    if (venuesError) {
      console.error('Error creating venues:', venuesError);
    } else {
      console.log(`✅ Created ${insertedVenues?.length || 0} venues`);
    }

    // ============================================
    // 3. SEED EVENTS
    // ============================================
    console.log('\n📅 Creating events...');

    // Get venue IDs for linking events
    const { data: venueList } = await supabase
      .from('venues')
      .select('id, slug')
      .in('slug', ['the-orangery', 'calexico', 'jjs-irish-bar', 'reef-resort']);

    const venueMap = new Map(venueList?.map(v => [v.slug, v.id]) || []);

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    const events = [
      {
        venue_id: venueMap.get('the-orangery'),
        title: 'Friday Garden Brunch',
        slug: 'friday-garden-brunch',
        description: 'Enjoy a leisurely brunch in our beautiful garden setting with live acoustic music.',
        description_ar: 'استمتع ببرانش مريح في حديقتنا الجميلة مع موسيقى أكوستيك حية.',
        category: 'dining',
        tags: ['brunch', 'live music', 'family friendly', 'outdoor'],
        start_date: formatDate(nextWeek),
        start_time: '12:00',
        end_time: '16:00',
        price_range: 'BD 25-35',
        status: 'published',
        is_featured: true,
      },
      {
        venue_id: venueMap.get('calexico'),
        title: 'Taco Tuesday',
        slug: 'taco-tuesday',
        description: 'Unlimited tacos and margaritas every Tuesday! Live DJ from 8pm.',
        description_ar: 'تاكو غير محدود ومارغريتا كل ثلاثاء! دي جي حي من الـ8 مساءً.',
        category: 'dining',
        tags: ['tacos', 'happy hour', 'dj', 'nightlife'],
        start_date: formatDate(tomorrow),
        start_time: '18:00',
        end_time: '23:00',
        price_range: 'BD 15',
        status: 'published',
        is_featured: true,
      },
      {
        venue_id: venueMap.get('jjs-irish-bar'),
        title: 'Live Band Night',
        slug: 'live-band-night',
        description: 'Rock the night away with our resident band! Free entry before 9pm.',
        description_ar: 'استمتع بالليل مع فرقتنا المقيمة! دخول مجاني قبل الـ9 مساءً.',
        category: 'music',
        tags: ['live music', 'rock', 'nightlife', 'party'],
        start_date: formatDate(tomorrow),
        start_time: '21:00',
        end_time: '02:00',
        price_range: 'Free - BD 10',
        status: 'published',
        is_featured: false,
      },
      {
        venue_id: venueMap.get('reef-resort'),
        title: 'Beach BBQ Party',
        slug: 'beach-bbq-party',
        description: 'All-you-can-eat BBQ with pool access and sunset views.',
        description_ar: 'شواء مفتوح مع دخول المسبح ومناظر غروب الشمس.',
        category: 'family',
        tags: ['bbq', 'beach', 'family', 'pool'],
        start_date: formatDate(nextWeek),
        start_time: '16:00',
        end_time: '22:00',
        price_range: 'BD 30',
        status: 'published',
        is_featured: true,
      },
      {
        venue_id: venueMap.get('the-orangery'),
        title: 'Ladies Night',
        slug: 'ladies-night-orangery',
        description: 'Complimentary drinks and special menu for ladies every Wednesday.',
        description_ar: 'مشروبات مجانية وقائمة خاصة للسيدات كل أربعاء.',
        category: 'nightlife',
        tags: ['ladies night', 'drinks', 'socializing'],
        start_date: formatDate(nextWeek),
        start_time: '19:00',
        end_time: '23:00',
        price_range: 'Free for ladies',
        status: 'published',
        is_featured: false,
      },
    ];

    const { data: insertedEvents, error: eventsError } = await supabase
      .from('events')
      .upsert(events.filter(e => e.venue_id), { onConflict: 'slug' })
      .select();

    if (eventsError) {
      console.error('Error creating events:', eventsError);
    } else {
      console.log(`✅ Created ${insertedEvents?.length || 0} events`);
    }

    // ============================================
    // 4. SEED OFFERS
    // ============================================
    console.log('\n🎁 Creating offers...');

    const offers = [
      {
        venue_id: venueMap.get('the-orangery'),
        title: 'Early Bird Dinner',
        slug: 'early-bird-dinner',
        description: '20% off all main courses when you dine before 7pm.',
        offer_type: 'discount',
        discount_percentage: 20,
        days_available: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        start_time: '18:00',
        end_time: '19:00',
        status: 'active',
      },
      {
        venue_id: venueMap.get('calexico'),
        title: 'Happy Hour Margaritas',
        slug: 'happy-hour-margaritas',
        description: 'Buy one get one free on all margaritas!',
        offer_type: 'happy_hour',
        days_available: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        start_time: '17:00',
        end_time: '20:00',
        status: 'active',
      },
      {
        venue_id: venueMap.get('jjs-irish-bar'),
        title: 'Ladies Night Special',
        slug: 'jjs-ladies-night',
        description: '3 complimentary drinks for ladies every Wednesday.',
        offer_type: 'ladies_night',
        days_available: ['Wednesday'],
        start_time: '20:00',
        end_time: '00:00',
        status: 'active',
      },
      {
        venue_id: venueMap.get('reef-resort'),
        title: 'Sunday Family Brunch',
        slug: 'sunday-family-brunch',
        description: 'Kids eat free with every paying adult.',
        offer_type: 'brunch',
        days_available: ['Sunday'],
        start_time: '12:00',
        end_time: '16:00',
        status: 'active',
      },
    ];

    const { data: insertedOffers, error: offersError } = await supabase
      .from('offers')
      .upsert(offers.filter(o => o.venue_id), { onConflict: 'slug' })
      .select();

    if (offersError) {
      console.error('Error creating offers:', offersError);
    } else {
      console.log(`✅ Created ${insertedOffers?.length || 0} offers`);
    }

    // ============================================
    // 5. SEED MOVIES
    // ============================================
    console.log('\n🎬 Creating movies...');

    const movies = [
      {
        title: 'Avatar: The Way of Water',
        slug: 'avatar-the-way-of-water',
        overview: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\'vi race to protect their home.',
        duration_minutes: 192,
        genre: ['Action', 'Adventure', 'Sci-Fi'],
        rating: 'PG-13',
        imdb_rating: 7.6,
        poster_url: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
        trailer_url: 'https://www.youtube.com/watch?v=d9MyW72ELq0',
        status: 'now_showing',
      },
      {
        title: 'Oppenheimer',
        slug: 'oppenheimer',
        overview: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
        duration_minutes: 180,
        genre: ['Biography', 'Drama', 'History'],
        rating: 'R',
        imdb_rating: 8.4,
        poster_url: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
        trailer_url: 'https://www.youtube.com/watch?v=uYPbbksJxIg',
        status: 'now_showing',
      },
      {
        title: 'Barbie',
        slug: 'barbie',
        overview: 'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.',
        duration_minutes: 114,
        genre: ['Adventure', 'Comedy', 'Fantasy'],
        rating: 'PG-13',
        imdb_rating: 7.0,
        poster_url: 'https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
        trailer_url: 'https://www.youtube.com/watch?v=pBk4NYhWNMM',
        status: 'now_showing',
      },
      {
        title: 'Dune: Part Two',
        slug: 'dune-part-two',
        overview: 'Paul Atreides unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.',
        duration_minutes: 166,
        genre: ['Action', 'Adventure', 'Drama'],
        rating: 'PG-13',
        imdb_rating: 8.8,
        poster_url: 'https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
        trailer_url: 'https://www.youtube.com/watch?v=Way9Dexny3w',
        status: 'coming_soon',
      },
    ];

    const { data: insertedMovies, error: moviesError } = await supabase
      .from('movies')
      .upsert(movies, { onConflict: 'slug' })
      .select();

    if (moviesError) {
      console.error('Error creating movies:', moviesError);
    } else {
      console.log(`✅ Created ${insertedMovies?.length || 0} movies`);
    }

    // Create showtimes for now showing movies
    const { data: nowShowingMovies } = await supabase
      .from('movies')
      .select('id, slug')
      .eq('status', 'now_showing');

    if (nowShowingMovies && nowShowingMovies.length > 0) {
      const cinemas = ['Cineco Bahrain City Centre', 'VOX Cinemas The Avenues', 'Novo Cinemas Seef Mall'];
      const showtimes = ['14:00', '17:30', '20:00', '22:30'];
      const showDates = [formatDate(today), formatDate(tomorrow)];

      const showtimeData: Array<{
        movie_id: string;
        cinema_name: string;
        showtime: string;
        show_date: string;
        booking_url: string;
      }> = [];

      nowShowingMovies.forEach(movie => {
        cinemas.forEach(cinema => {
          showDates.forEach(date => {
            showtimes.forEach(time => {
              showtimeData.push({
                movie_id: movie.id,
                cinema_name: cinema,
                showtime: time,
                show_date: date,
                booking_url: `https://bahrainnights.com/cinema/${movie.slug}/book`,
              });
            });
          });
        });
      });

      // Delete existing showtimes first to avoid duplicates
      await supabase.from('showtimes').delete().neq('id', '00000000-0000-0000-0000-000000000000');

      const { error: showtimesError } = await supabase
        .from('showtimes')
        .insert(showtimeData);

      if (showtimesError) {
        console.error('Error creating showtimes:', showtimesError);
      } else {
        console.log(`✅ Created ${showtimeData.length} showtimes`);
      }
    }

    // ============================================
    // 6. SEED HOMEPAGE ADS
    // ============================================
    console.log('\n📢 Creating homepage ads...');

    const ads = [
      {
        advertiser_name: 'Gulf Air',
        title: 'Fly to Europe from BD 199',
        image_url: 'https://bahrainnights-production.s3.me-south-1.amazonaws.com/ads/gulf-air-promo.jpg',
        target_url: 'https://gulfair.com',
        slot_position: 1,
        start_date: formatDate(today),
        end_date: formatDate(nextMonth),
        price_bd: 300,
        status: 'active',
        payment_status: 'paid',
      },
      {
        advertiser_name: 'Bahrain Bay',
        title: 'Discover Bahrain Bay - Luxury Living',
        image_url: 'https://bahrainnights-production.s3.me-south-1.amazonaws.com/ads/bahrain-bay.jpg',
        target_url: 'https://bahrainbay.com',
        slot_position: 2,
        start_date: formatDate(today),
        end_date: formatDate(nextMonth),
        price_bd: 350,
        status: 'active',
        payment_status: 'paid',
      },
    ];

    const { data: insertedAds, error: adsError } = await supabase
      .from('homepage_ads')
      .upsert(ads, { onConflict: 'slot_position' })
      .select();

    if (adsError) {
      console.error('Error creating ads:', adsError);
    } else {
      console.log(`✅ Created ${insertedAds?.length || 0} homepage ads`);
    }

    // ============================================
    // 7. SEED SPONSORS
    // ============================================
    console.log('\n🏆 Creating sponsors...');

    const sponsors = [
      {
        name: 'Zain Bahrain',
        logo_url: 'https://bahrainnights-production.s3.me-south-1.amazonaws.com/sponsors/zain.png',
        website_url: 'https://zain.com/bh',
        tier: 'platinum',
        start_date: formatDate(today),
        end_date: formatDate(new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())),
        amount_bd: 5000,
        status: 'active',
      },
      {
        name: 'Batelco',
        logo_url: 'https://bahrainnights-production.s3.me-south-1.amazonaws.com/sponsors/batelco.png',
        website_url: 'https://batelco.com',
        tier: 'gold',
        start_date: formatDate(today),
        end_date: formatDate(new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())),
        amount_bd: 3000,
        status: 'active',
      },
      {
        name: 'Gulf Hotel',
        logo_url: 'https://bahrainnights-production.s3.me-south-1.amazonaws.com/sponsors/gulf-hotel.png',
        website_url: 'https://gulfhotelbahrain.com',
        tier: 'silver',
        start_date: formatDate(today),
        end_date: formatDate(new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())),
        amount_bd: 1500,
        status: 'active',
      },
    ];

    const { data: insertedSponsors, error: sponsorsError } = await supabase
      .from('sponsors')
      .upsert(sponsors, { onConflict: 'name' })
      .select();

    if (sponsorsError) {
      console.error('Error creating sponsors:', sponsorsError);
    } else {
      console.log(`✅ Created ${insertedSponsors?.length || 0} sponsors`);
    }

    // ============================================
    // 8. SEED DEMO VENUE OWNER USER
    // ============================================
    console.log('\n👤 Creating demo venue owner user...');
    const venueOwnerPasswordHash = await bcrypt.hash('Test1234!', 12);

    const { data: venueOwnerUser, error: venueOwnerError } = await supabase
      .from('users')
      .upsert({
        email: 'venue@test.com',
        password_hash: venueOwnerPasswordHash,
        role: 'venue_owner',
        status: 'active',
      }, { onConflict: 'email' })
      .select()
      .single();

    if (venueOwnerError) {
      console.error('Error creating venue owner user:', venueOwnerError);
    } else {
      console.log('✅ Demo venue owner created:', venueOwnerUser.email);

      // Link the venue owner to a venue
      const { error: linkError } = await supabase
        .from('venues')
        .update({ owner_id: venueOwnerUser.id })
        .eq('slug', 'the-orangery');

      if (linkError) {
        console.error('Error linking venue owner:', linkError);
      } else {
        console.log('✅ Linked venue owner to "The Orangery"');
      }
    }

    // ============================================
    // SUMMARY
    // ============================================
    console.log('\n========================================');
    console.log('🎉 Database seeding complete!');
    console.log('========================================');
    console.log('\nTest Accounts:');
    console.log('  Admin: admin@bahrainnights.com / Admin1234!');
    console.log('  Venue Owner: venue@test.com / Test1234!');
    console.log('\n========================================\n');

  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

// Run the seed function
seed();
