import { NextResponse } from 'next/server';
import { clearPublicAuthCookie } from '@/lib/public-auth';

export async function POST() {
  const response = NextResponse.json({ success: true });
  clearPublicAuthCookie(response);
  return response;
}
