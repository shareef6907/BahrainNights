import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

interface BulkShowtimeRequest {
  movie_id: string;
  cinema_ids: string[];
  date_start: string; // YYYY-MM-DD
  date_end: string; // YYYY-MM-DD
  times: string[]; // ["12:00", "15:00", "18:00", "21:00"]
  format: string;
  language: string;
  booking_url?: string;
}

// POST /api/cinema/showtimes/bulk - Create multiple showtimes at once
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();
    const body: BulkShowtimeRequest = await request.json();

    const {
      movie_id,
      cinema_ids,
      date_start,
      date_end,
      times,
      format = '2D',
      language = 'English',
      booking_url,
    } = body;

    // Validation
    if (!movie_id || !cinema_ids?.length || !date_start || !date_end || !times?.length) {
      return NextResponse.json(
        { error: 'movie_id, cinema_ids, date_start, date_end, and times are required' },
        { status: 400 }
      );
    }

    // Validate movie exists
    const { data: movie, error: movieError } = await supabase
      .from('movies')
      .select('id, title')
      .eq('id', movie_id)
      .single();

    if (movieError || !movie) {
      return NextResponse.json(
        { error: 'Movie not found' },
        { status: 404 }
      );
    }

    // Validate cinemas exist
    const { data: cinemas, error: cinemasError } = await supabase
      .from('cinemas')
      .select('id, name, booking_url')
      .in('id', cinema_ids);

    if (cinemasError || !cinemas?.length) {
      return NextResponse.json(
        { error: 'One or more cinemas not found' },
        { status: 404 }
      );
    }

    // Generate all dates in range
    const dates: string[] = [];
    const startDate = new Date(date_start);
    const endDate = new Date(date_end);

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      dates.push(d.toISOString().split('T')[0]);
    }

    // Generate all showtimes
    const showtimesToInsert: Array<{
      movie_id: string;
      cinema_id: string;
      showtime: string;
      format: string;
      language: string;
      booking_url: string | null;
      is_active: boolean;
    }> = [];

    for (const cinema of cinemas) {
      for (const date of dates) {
        for (const time of times) {
          const showtimeDateTime = `${date}T${time}:00`;

          // Use cinema-specific booking URL or the provided one
          const showtimeBookingUrl = booking_url || cinema.booking_url || null;

          showtimesToInsert.push({
            movie_id,
            cinema_id: cinema.id,
            showtime: showtimeDateTime,
            format,
            language,
            booking_url: showtimeBookingUrl,
            is_active: true,
          });
        }
      }
    }

    // Check for existing showtimes to avoid duplicates
    const existingShowtimes = await Promise.all(
      showtimesToInsert.map(async (st) => {
        const { data } = await supabase
          .from('showtimes')
          .select('id')
          .eq('movie_id', st.movie_id)
          .eq('cinema_id', st.cinema_id)
          .eq('showtime', st.showtime)
          .single();
        return data ? st.showtime : null;
      })
    );

    const existingSet = new Set(existingShowtimes.filter(Boolean));
    const newShowtimes = showtimesToInsert.filter(
      (st) => !existingSet.has(st.showtime)
    );

    if (newShowtimes.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'All showtimes already exist',
        created: 0,
        skipped: showtimesToInsert.length,
      });
    }

    // Insert in batches of 100
    const batchSize = 100;
    let totalCreated = 0;

    for (let i = 0; i < newShowtimes.length; i += batchSize) {
      const batch = newShowtimes.slice(i, i + batchSize);
      const { error } = await supabase.from('showtimes').insert(batch);

      if (error) {
        console.error('Error inserting showtimes batch:', error);
        throw error;
      }

      totalCreated += batch.length;
    }

    return NextResponse.json({
      success: true,
      message: `Created ${totalCreated} showtimes for ${movie.title}`,
      created: totalCreated,
      skipped: showtimesToInsert.length - totalCreated,
      details: {
        movie: movie.title,
        cinemas: cinemas.map((c) => c.name),
        dates: dates.length,
        times_per_day: times.length,
        total_possible: showtimesToInsert.length,
      },
    });
  } catch (error) {
    console.error('Bulk create showtimes error:', error);
    return NextResponse.json(
      { error: 'Failed to create showtimes' },
      { status: 500 }
    );
  }
}

// DELETE /api/cinema/showtimes/bulk - Delete multiple showtimes
export async function DELETE(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();
    const { searchParams } = new URL(request.url);

    const movieId = searchParams.get('movie_id');
    const cinemaId = searchParams.get('cinema_id');
    const dateStart = searchParams.get('date_start');
    const dateEnd = searchParams.get('date_end');

    if (!movieId && !cinemaId && !dateStart) {
      return NextResponse.json(
        { error: 'At least one filter parameter is required' },
        { status: 400 }
      );
    }

    let query = supabase.from('showtimes').delete();

    if (movieId) {
      query = query.eq('movie_id', movieId);
    }

    if (cinemaId) {
      query = query.eq('cinema_id', cinemaId);
    }

    if (dateStart && dateEnd) {
      query = query
        .gte('showtime', `${dateStart}T00:00:00`)
        .lte('showtime', `${dateEnd}T23:59:59`);
    } else if (dateStart) {
      query = query.gte('showtime', `${dateStart}T00:00:00`);
    }

    const { error, count } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      deleted: count || 0,
    });
  } catch (error) {
    console.error('Bulk delete showtimes error:', error);
    return NextResponse.json(
      { error: 'Failed to delete showtimes' },
      { status: 500 }
    );
  }
}
