import { permanentRedirect } from 'next/navigation';

export async function GET() {
  permanentRedirect('/things-to-do-in-bahrain');
}
