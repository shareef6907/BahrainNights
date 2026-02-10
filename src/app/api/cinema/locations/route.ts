import { NextResponse } from 'next/server';

// Bahrain cinema locations with booking URLs
const BAHRAIN_CINEMAS = [
  {
    id: 'cineco',
    name: 'Cineco',
    logo: '/images/cinemas/cineco.png',
    locations: ['Seef Mall', 'Saar Mall', 'Oasis Mall', 'Wadi Al Sail'],
    bookingUrl: 'https://bahrain.cineco.net/',
    color: 'from-red-500/20 to-red-600/20',
    borderColor: 'border-red-500/30',
    hoverColor: 'hover:border-red-400',
    description: 'Bahrain\'s leading cinema chain with multiple locations across the kingdom.',
  },
  {
    id: 'vox',
    name: 'VOX Cinemas',
    logo: '/images/cinemas/vox.png',
    locations: ['City Centre', 'The Avenues'],
    bookingUrl: 'https://bhr.voxcinemas.com/',
    color: 'from-purple-500/20 to-purple-600/20',
    borderColor: 'border-purple-500/30',
    hoverColor: 'hover:border-purple-400',
    description: 'Premium cinema experience with IMAX and 4DX screens.',
  },
  {
    id: 'cinepolis',
    name: 'Cinépolis',
    logo: '/images/cinemas/cinepolis.png',
    locations: ['Wadi Al Sail'],
    bookingUrl: 'https://bahrain.cinepolisgulf.com/',
    color: 'from-blue-500/20 to-blue-600/20',
    borderColor: 'border-blue-500/30',
    hoverColor: 'hover:border-blue-400',
    description: 'International cinema chain with luxury seating and dining options.',
  },
  {
    id: 'mukta',
    name: 'Mukta A2 Cinemas',
    logo: '/images/cinemas/mukta.png',
    locations: ['Juffair'],
    bookingUrl: 'https://www.muktaa2cinemas.com/bahrain',
    color: 'from-amber-500/20 to-amber-600/20',
    borderColor: 'border-amber-500/30',
    hoverColor: 'hover:border-amber-400',
    description: 'Bollywood and Indian cinema specialist with mainstream Hollywood titles.',
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    cinemas: BAHRAIN_CINEMAS,
    total: BAHRAIN_CINEMAS.length,
  }, {
    headers: {
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
    },
  });
}
