import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, generateToken, setAuthCookie, mockUsers } from '@/lib/auth';
import { registerStep1Schema, registerStep2Schema, registerStep3Schema } from '@/lib/validations/auth';
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
    const existingUser = mockUsers.find(
      (u) => u.email.toLowerCase() === data.email.toLowerCase()
    );
    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(data.password);

    // Create new user (in production, this would save to database)
    const newUser = {
      id: `user_${Date.now()}`,
      email: data.email.toLowerCase(),
      passwordHash,
      role: 'venue_owner' as const,
      venue: {
        id: `venue_${Date.now()}`,
        name: data.venueName,
        slug: data.venueName.toLowerCase().replace(/\s+/g, '-'),
        status: 'pending' as const,
        type: data.venueType,
        phone: data.phone,
        website: data.website || '',
        instagram: data.instagram || '',
        area: data.area,
        address: data.address,
        googleMapsLink: data.googleMapsLink || '',
      },
      createdAt: new Date().toISOString(),
    };

    // Add to mock users (in production, save to database)
    mockUsers.push(newUser);

    // Generate JWT token
    const token = await generateToken({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      venue: {
        id: newUser.venue.id,
        name: newUser.venue.name,
        slug: newUser.venue.slug,
        status: newUser.venue.status,
      },
      createdAt: newUser.createdAt,
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
            id: newUser.venue.id,
            name: newUser.venue.name,
            slug: newUser.venue.slug,
            status: newUser.venue.status,
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
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
