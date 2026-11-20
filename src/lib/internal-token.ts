import { createHmac, timingSafeEqual } from 'crypto';

/**
 * Internal server-to-server token.
 *
 * Some Vercel cron routes call other API routes over HTTP from the server
 * (`/api/cron/cinema` → `/api/agents/cinema/run`). Those calls carry no
 * browser cookies, so an admin-session check would break the schedule.
 *
 * Instead of forwarding a raw secret over the wire, both ends derive the same
 * HMAC from `JWT_SECRET` — the server never transmits the secret itself, and a
 * leaked header value cannot be replayed against any other endpoint because the
 * label is scoped to this purpose.
 *
 * `JWT_SECRET` is required by the auth middleware and the login route, so it is
 * present in every environment where the app runs.
 */

const LABEL = 'bn-internal-api-v1';

/** Derive the internal token. Returns null when JWT_SECRET is not configured. */
export function getInternalToken(): string | null {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  return createHmac('sha256', secret).update(LABEL).digest('hex');
}

/**
 * Verify a token supplied by a trusted server-to-server caller.
 * Uses a constant-time comparison so the check does not leak the token by timing.
 */
export function isValidInternalToken(token: string | null | undefined): boolean {
  if (!token) return false;
  const expected = getInternalToken();
  if (!expected) return false;
  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(token, 'utf8');
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** The header name used to carry the internal token. */
export const INTERNAL_TOKEN_HEADER = 'x-bn-internal-token';
