import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { verifyToken } from '@/lib/auth';
import {
  getAttractions,
  createAttraction,
  getAttractionCounts,
} from '@/lib/db/attractions';

// Validation schema for creating attraction
const createAttractionSchema = z.object({
  name: z.string().min(2).max(200),
  slug: z.string().optional(),
  description: z.string().optional(),
  shortDescription: z.string().max(500).optional(),
  imageUrl: z.string().url().optional(),
  area: z.string().optional(),
  priceFrom: z.number().min(0).optional(),
  priceRange: z.string().optional(),
  tripadvisorRating: z.number().min(0).max(5).optional(),
  tripadvisorUrl: z.string().url().optional(),
  duration: z.string().optional(),
  suitableFor: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  isFeatured: z.boolean().optional().default(false),
  isActive: z.boolean().optional().default(true),
});

// GET: List all attractions with filters
export async function GET(request: NextRequest) {
  try {
    // Auth check
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
    const status = searchParams.get('status') as 'all' | 'active' | 'inactive' | null;
    const featured = searchParams.get('featured');
    const search = searchParams.get('search') || undefined;
    const category = searchParams.get('category') || undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined;

    // Fetch attractions
    const attractions = await getAttractions({
      status: status || 'all',
      featured: featured === 'true' ? true : featured === 'false' ? false : undefined,
      search,
      category,
      limit,
      offset,
    });

    // Get counts
    const counts = await getAttractionCounts();

    return NextResponse.json({
      attractions,
      counts,
    });
  } catch (error) {
    console.error('Error fetching attractions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attractions', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// POST: Create new attraction
export async function POST(request: NextRequest) {
  try {
    // Auth check
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Parse and validate body
    const body = await request.json();
    const result = createAttractionSchema.safeParse(body);

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

    // Map camelCase to snake_case
    const attractionData = {
      name: data.name,
      slug: data.slug,
      description: data.description,
      short_description: data.shortDescription,
      image_url: data.imageUrl,
      area: data.area,
      price_from: data.priceFrom,
      price_range: data.priceRange,
      tripadvisor_rating: data.tripadvisorRating,
      tripadvisor_url: data.tripadvisorUrl,
      duration: data.duration,
      suitable_for: data.suitableFor,
      tags: data.tags,
      category: data.category || 'Family & Kids',
      subcategory: data.subcategory,
      is_featured: data.isFeatured,
      is_active: data.isActive,
      source: 'admin',
    };

    const attraction = await createAttraction(attractionData);

    return NextResponse.json(
      { attraction, message: 'Attraction created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating attraction:', error);
    return NextResponse.json(
      { error: 'Failed to create attraction', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
