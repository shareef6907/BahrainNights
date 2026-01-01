import { NextResponse } from 'next/server';
import { getCurrentPublicUser } from '@/lib/public-auth';

export async function GET() {
  try {
    const user = await getCurrentPublicUser();

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error fetching public user:', error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
