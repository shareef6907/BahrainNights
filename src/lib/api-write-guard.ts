import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { INTERNAL_TOKEN_HEADER, isValidInternalToken } from '@/lib/internal-token';

/**
 * Guard for write routes under `/api/` that are consumed by two kinds of caller:
 *
 *  1. the admin UI, same-origin, which sends the `auth_token` cookie;
 *  2. the Vercel cron routes, which call this route server-to-server over HTTP
 *     and therefore carry no cookie — they send the internal token instead.
 *
 * Anonymous callers get neither, so they are rejected.
 */
export async function requireAdminOrInternal(
  request: NextRequest
): Promise<{ ok: true } | { ok: false; response: NextResponse }> {
  if (isValidInternalToken(request.headers.get(INTERNAL_TOKEN_HEADER))) {
    return { ok: true };
  }

  const auth = await requireAdmin(request);
  if (!auth.authenticated) {
    return { ok: false, response: auth.response };
  }
  return { ok: true };
}
