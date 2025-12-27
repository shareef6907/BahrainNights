import { NextRequest, NextResponse } from 'next/server';
import { generateToken, setAuthCookie, getUserByEmailFromDb, sendWelcomeEmail } from '@/lib/auth';
import { createUser } from '@/lib/db/users';
import { createVenue } from '@/lib/db/venues';
import { z } from 'zod';

// Combined registration schema
const fullRegistrationSchema = z.object({
  // Step 1
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  // Step 2
  venueName: z.string().min(2, 'Venue name is required'),
  venueType: z.string().min(1, 'Please select a venue type'),
  phone: z.string().min(8, 'Please enter a valid phone number'),
  website: z.string().optional(),
  instagram: z.string().optional(),
  // Step 3
  area: z.string().min(1, 'Please select an area'),
  address: z.string().min(5, 'Please enter a valid address'),
  googleMapsLink: z.string().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const result = fullRegistrationSchema.safeParse(body);
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

    // Check if email already exists
    const existingUser = await getUserByEmailFromDb(data.email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Create new user in database
    const newUser = await createUser({
      email: data.email,
      password: data.password,
      role: 'venue_owner',
    });

    // Generate venue slug
    const venueSlug = data.venueName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Create venue in database
    const newVenue = await createVenue({
      owner_id: newUser.id,
      name: data.venueName,
      slug: venueSlug,
      category: data.venueType,
      phone: data.phone,
      website: data.website || null,
      instagram: data.instagram || null,
      area: data.area,
      address: data.address,
      google_maps_url: data.googleMapsLink || null,
      status: 'pending',
    });

    // Send welcome email
    sendWelcomeEmail(newUser.email, newVenue.name);

    // Generate JWT token
    const token = await generateToken({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      venue: {
        id: newVenue.id,
        name: newVenue.name,
        slug: newVenue.slug,
        status: newVenue.status,
      },
      createdAt: newUser.created_at,
    });

    // Create response
    const response = NextResponse.json(
      {
        success: true,
        message: 'Registration successful! Your venue is pending approval.',
        user: {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role,
          venue: {
            id: newVenue.id,
            name: newVenue.name,
            slug: newVenue.slug,
            status: newVenue.status,
          },
        },
      },
      { status: 201 }
    );

    // Set auth cookie
    setAuthCookie(response, token);

    return response;
  } catch (error) {
    console.error('Registration error:', error);

    // Handle specific database errors
    if (error instanceof Error && error.message === 'Email already exists') {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
