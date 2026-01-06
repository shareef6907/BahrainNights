import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { verifyToken } from '@/lib/auth';
import {
  getAttractionById,
  updateAttraction,
  deleteAttraction,
  toggleAttractionFeatured,
  toggleAttractionActive,
} from '@/lib/db/attractions';

// Validation schema for updating attraction
const updateAttractionSchema = z.object({
  name: z.string().min(2).max(200).optional(),
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
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  action: z.enum(['toggleFeatured', 'toggleActive']).optional(),
});

// GET: Get single attraction
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const attraction = await getAttractionById(id);

    if (!attraction) {
      return NextResponse.json({ error: 'Attraction not found' }, { status: 404 });
    }

    return NextResponse.json({ attraction });
  } catch (error) {
    console.error('Error fetching attraction:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attraction', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// PATCH: Update attraction
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;

    // Check if attraction exists
    const existingAttraction = await getAttractionById(id);
    if (!existingAttraction) {
      return NextResponse.json({ error: 'Attraction not found' }, { status: 404 });
    }

    // Parse and validate body
    const body = await request.json();
    const result = updateAttractionSchema.safeParse(body);

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

    const { action, ...data } = result.data;

    // Handle special actions
    if (action === 'toggleFeatured') {
      const attraction = await toggleAttractionFeatured(id);
      return NextResponse.json({
        attraction,
        message: `Attraction ${attraction.is_featured ? 'featured' : 'unfeatured'} successfully`,
      });
    }

    if (action === 'toggleActive') {
      const attraction = await toggleAttractionActive(id);
      return NextResponse.json({
        attraction,
        message: `Attraction ${attraction.is_active ? 'activated' : 'deactivated'} successfully`,
      });
    }

    // Regular update - map camelCase to snake_case
    const updateData: Record<string, unknown> = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.shortDescription !== undefined) updateData.short_description = data.shortDescription;
    if (data.imageUrl !== undefined) updateData.image_url = data.imageUrl;
    if (data.area !== undefined) updateData.area = data.area;
    if (data.priceFrom !== undefined) updateData.price_from = data.priceFrom;
    if (data.priceRange !== undefined) updateData.price_range = data.priceRange;
    if (data.tripadvisorRating !== undefined) updateData.tripadvisor_rating = data.tripadvisorRating;
    if (data.tripadvisorUrl !== undefined) updateData.tripadvisor_url = data.tripadvisorUrl;
    if (data.duration !== undefined) updateData.duration = data.duration;
    if (data.suitableFor !== undefined) updateData.suitable_for = data.suitableFor;
    if (data.tags !== undefined) updateData.tags = data.tags;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.subcategory !== undefined) updateData.subcategory = data.subcategory;
    if (data.isFeatured !== undefined) updateData.is_featured = data.isFeatured;
    if (data.isActive !== undefined) updateData.is_active = data.isActive;

    const attraction = await updateAttraction(id, updateData);

    return NextResponse.json({
      attraction,
      message: 'Attraction updated successfully',
    });
  } catch (error) {
    console.error('Error updating attraction:', error);
    return NextResponse.json(
      { error: 'Failed to update attraction', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// DELETE: Delete attraction
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;

    // Check if attraction exists
    const existingAttraction = await getAttractionById(id);
    if (!existingAttraction) {
      return NextResponse.json({ error: 'Attraction not found' }, { status: 404 });
    }

    await deleteAttraction(id);

    return NextResponse.json({
      message: 'Attraction deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting attraction:', error);
    return NextResponse.json(
      { error: 'Failed to delete attraction', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
