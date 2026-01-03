import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getAdminClient } from '@/lib/supabase/server';
import { uploadImage, isValidImageType, isValidFileSize, generateFolderPath } from '@/lib/s3';
import { sendVenueRegistrationEmail } from '@/lib/email';
import bcrypt from 'bcryptjs';

// Create Supabase admin client for auth operations
function getSupabaseAdminClient() {
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

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract form fields
    const venueName = formData.get('venueName') as string;
    const crNumber = formData.get('crNumber') as string;
    const category = formData.get('category') as string;
    const area = formData.get('area') as string;
    const address = formData.get('address') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const website = formData.get('website') as string | null;
    const instagram = formData.get('instagram') as string | null;
    const description = formData.get('description') as string | null;
    const logo = formData.get('logo') as File | null;
    const coverImage = formData.get('coverImage') as File | null;

    // Validate required fields
    if (!venueName || !crNumber || !category || !area || !address || !phone || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();

    // Get Supabase admin client for auth operations
    const supabaseAuth = getSupabaseAdminClient();

    // Check if email already exists in Supabase Auth
    const { data: existingUsers } = await supabaseAuth.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(u => u.email?.toLowerCase() === email.toLowerCase());

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists. Please login instead.' },
        { status: 400 }
      );
    }

    // Generate unique slug
    let slug = generateSlug(venueName);
    const { data: existingVenue } = await supabase
      .from('venues')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existingVenue) {
      slug = `${slug}-${Date.now().toString(36)}`;
    }

    // Upload images if provided
    let logoUrl: string | null = null;
    let coverImageUrl: string | null = null;

    const folderPath = generateFolderPath('venue', { venueSlug: slug });

    if (logo && logo.size > 0) {
      // Validate logo
      if (!isValidImageType(logo.type)) {
        return NextResponse.json(
          { error: 'Invalid logo file type. Allowed: JPEG, PNG, WebP, GIF' },
          { status: 400 }
        );
      }
      if (!isValidFileSize(logo.size, 5)) {
        return NextResponse.json(
          { error: 'Logo file too large. Maximum size: 5MB' },
          { status: 400 }
        );
      }

      const logoBuffer = Buffer.from(await logo.arrayBuffer());
      const logoResult = await uploadImage(
        logoBuffer,
        folderPath,
        `logo.${logo.type.split('/')[1]}`,
        logo.type
      );
      logoUrl = logoResult.processedUrl;
    }

    if (coverImage && coverImage.size > 0) {
      // Validate cover image
      if (!isValidImageType(coverImage.type)) {
        return NextResponse.json(
          { error: 'Invalid cover image file type. Allowed: JPEG, PNG, WebP, GIF' },
          { status: 400 }
        );
      }
      if (!isValidFileSize(coverImage.size, 10)) {
        return NextResponse.json(
          { error: 'Cover image file too large. Maximum size: 10MB' },
          { status: 400 }
        );
      }

      const coverBuffer = Buffer.from(await coverImage.arrayBuffer());
      const coverResult = await uploadImage(
        coverBuffer,
        folderPath,
        `cover.${coverImage.type.split('/')[1]}`,
        coverImage.type
      );
      coverImageUrl = coverResult.processedUrl;
    }

    // Create user account using Supabase Auth
    const { data: authData, error: authError } = await supabaseAuth.auth.admin.createUser({
      email: email.toLowerCase(),
      password: password,
      email_confirm: true, // Auto-confirm email for venue registrations
      user_metadata: {
        role: 'venue_owner',
        venue_name: venueName,
      },
    });

    if (authError || !authData.user) {
      console.error('Error creating auth user:', authError);
      return NextResponse.json(
        { error: 'Failed to create user account', details: authError?.message || 'Unknown error' },
        { status: 500 }
      );
    }

    const authUser = authData.user;

    // Create profile in profiles table (for role/status management)
    // This might fail if profiles table doesn't exist or has different schema
    try {
      await supabase
        .from('profiles')
        .upsert({
          id: authUser.id,
          email: authUser.email,
        } as any, { onConflict: 'id' });
    } catch (profileErr) {
      console.log('Profile creation skipped (table may not exist):', profileErr);
    }

    // Hash the password for venue portal login
    const passwordHash = await bcrypt.hash(password, 12);

    // Create venue in database
    // Note: owner_id is set to null for now since the foreign key references 'users' table
    // which uses a different auth system. The venue email can be used to link them later.
    const venueData = {
      owner_id: null, // Will be linked when admin system is unified
      name: venueName,
      slug,
      cr_number: crNumber,
      description: description || null,
      category,
      area,
      address,
      phone,
      email: email.toLowerCase(),
      password_hash: passwordHash, // Store hashed password for venue portal login
      website: website || null,
      instagram: instagram || null,
      logo_url: logoUrl,
      cover_image_url: coverImageUrl,
      status: 'pending', // All registrations start as pending for admin approval
      is_verified: false,
      is_featured: false,
      view_count: 0,
      like_count: 0,
    };

    const { data: venue, error: insertError } = await supabase
      .from('venues')
      .insert(venueData as any)
      .select()
      .single();

    if (insertError) {
      console.error('Error creating venue:', insertError);
      // Clean up: delete the auth user we just created
      try {
        await supabase.from('profiles').delete().eq('id', authUser.id);
      } catch (e) {
        // Profile cleanup is optional
      }
      await supabaseAuth.auth.admin.deleteUser(authUser.id);
      return NextResponse.json(
        { error: 'Failed to create venue registration', details: insertError.message },
        { status: 500 }
      );
    }

    const venueResult = venue as { id: string; name: string; slug: string; status: string };

    // Send registration confirmation email
    let emailSent = false;
    try {
      const emailResult = await sendVenueRegistrationEmail(email, venueName);
      emailSent = emailResult.success;
      if (!emailResult.success) {
        console.error('Failed to send registration email:', emailResult.error);
      }
    } catch (emailError) {
      console.error('Error sending registration email:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Venue registration submitted successfully',
      venue: {
        id: venueResult.id,
        name: venueResult.name,
        slug: venueResult.slug,
        status: venueResult.status,
      },
      emailSent,
    });
  } catch (error) {
    console.error('Error in venue registration:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'POST to this endpoint to register a venue',
    required_fields: ['venueName', 'crNumber', 'category', 'area', 'address', 'phone', 'email', 'password'],
    optional_fields: ['website', 'instagram', 'description', 'logo', 'coverImage'],
  });
}
