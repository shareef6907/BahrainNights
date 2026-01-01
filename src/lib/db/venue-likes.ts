import { getAdminClient } from '@/lib/supabase/server';
import type { VenueLike } from '@/types/database';

// Helper to get untyped client for new tables
function getUntypedClient() {
  return getAdminClient() as any;
}

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_LIKES_PER_HOUR = 20;

// Check if user has liked a venue
export async function hasUserLikedVenue(userId: string, venueId: string): Promise<boolean> {
  const supabase = getUntypedClient();

  const { data, error } = await supabase
    .from('venue_likes')
    .select('id')
    .eq('user_id', userId)
    .eq('venue_id', venueId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error checking venue like:', error);
  }

  return !!data;
}

// Get user's liked venue IDs
export async function getUserLikedVenueIds(userId: string): Promise<string[]> {
  const supabase = getUntypedClient();

  const { data, error } = await supabase
    .from('venue_likes')
    .select('venue_id')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user likes:', error);
    return [];
  }

  return (data || []).map((like: { venue_id: string }) => like.venue_id);
}

// Check rate limit for likes
export async function checkLikeRateLimit(userId: string): Promise<{
  allowed: boolean;
  remaining: number;
  resetIn?: number;
}> {
  const supabase = getUntypedClient();
  const now = new Date();

  // Get current rate limit record
  const { data: rateLimit, error } = await supabase
    .from('like_rate_limits')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error checking rate limit:', error);
    // Allow action if rate limit check fails
    return { allowed: true, remaining: MAX_LIKES_PER_HOUR };
  }

  if (!rateLimit) {
    // No rate limit record exists, create one
    await supabase.from('like_rate_limits').insert({
      user_id: userId,
      action_count: 0,
      window_start: now.toISOString(),
    });
    return { allowed: true, remaining: MAX_LIKES_PER_HOUR };
  }

  const windowStart = new Date(rateLimit.window_start);
  const windowElapsed = now.getTime() - windowStart.getTime();

  // If window has expired, reset
  if (windowElapsed >= RATE_LIMIT_WINDOW_MS) {
    await supabase
      .from('like_rate_limits')
      .update({
        action_count: 0,
        window_start: now.toISOString(),
      })
      .eq('user_id', userId);
    return { allowed: true, remaining: MAX_LIKES_PER_HOUR };
  }

  // Check if under limit
  const remaining = MAX_LIKES_PER_HOUR - rateLimit.action_count;
  const resetIn = Math.ceil((RATE_LIMIT_WINDOW_MS - windowElapsed) / 1000);

  return {
    allowed: remaining > 0,
    remaining: Math.max(0, remaining),
    resetIn,
  };
}

// Increment rate limit counter
async function incrementRateLimitCounter(userId: string): Promise<void> {
  const supabase = getUntypedClient();

  const { data: existing } = await supabase
    .from('like_rate_limits')
    .select('action_count')
    .eq('user_id', userId)
    .single();

  if (existing) {
    await supabase
      .from('like_rate_limits')
      .update({
        action_count: existing.action_count + 1,
      })
      .eq('user_id', userId);
  } else {
    await supabase.from('like_rate_limits').insert({
      user_id: userId,
      action_count: 1,
      window_start: new Date().toISOString(),
    });
  }
}

// Like a venue
export async function likeVenue(userId: string, venueId: string): Promise<{
  success: boolean;
  error?: string;
  likeCount?: number;
}> {
  const supabase = getUntypedClient();

  // Check rate limit
  const rateLimit = await checkLikeRateLimit(userId);
  if (!rateLimit.allowed) {
    return {
      success: false,
      error: `Rate limit exceeded. Try again in ${rateLimit.resetIn} seconds.`,
    };
  }

  // Check if already liked
  const alreadyLiked = await hasUserLikedVenue(userId, venueId);
  if (alreadyLiked) {
    return { success: false, error: 'Already liked this venue' };
  }

  // Insert like
  const { error } = await supabase.from('venue_likes').insert({
    user_id: userId,
    venue_id: venueId,
  });

  if (error) {
    console.error('Error liking venue:', error);
    return { success: false, error: 'Failed to like venue' };
  }

  // Increment rate limit counter
  await incrementRateLimitCounter(userId);

  // Get updated like count
  const { data: venue } = await supabase
    .from('venues')
    .select('like_count')
    .eq('id', venueId)
    .single();

  return {
    success: true,
    likeCount: venue?.like_count || 0,
  };
}

// Unlike a venue
export async function unlikeVenue(userId: string, venueId: string): Promise<{
  success: boolean;
  error?: string;
  likeCount?: number;
}> {
  const supabase = getUntypedClient();

  // Check if liked
  const isLiked = await hasUserLikedVenue(userId, venueId);
  if (!isLiked) {
    return { success: false, error: 'Not liked' };
  }

  // Delete like
  const { error } = await supabase
    .from('venue_likes')
    .delete()
    .eq('user_id', userId)
    .eq('venue_id', venueId);

  if (error) {
    console.error('Error unliking venue:', error);
    return { success: false, error: 'Failed to unlike venue' };
  }

  // Get updated like count
  const { data: venue } = await supabase
    .from('venues')
    .select('like_count')
    .eq('id', venueId)
    .single();

  return {
    success: true,
    likeCount: venue?.like_count || 0,
  };
}

// Toggle like (like if not liked, unlike if liked)
export async function toggleVenueLike(userId: string, venueId: string): Promise<{
  success: boolean;
  liked: boolean;
  likeCount?: number;
  error?: string;
}> {
  const isLiked = await hasUserLikedVenue(userId, venueId);

  if (isLiked) {
    const result = await unlikeVenue(userId, venueId);
    return {
      success: result.success,
      liked: false,
      likeCount: result.likeCount,
      error: result.error,
    };
  } else {
    const result = await likeVenue(userId, venueId);
    return {
      success: result.success,
      liked: true,
      likeCount: result.likeCount,
      error: result.error,
    };
  }
}

// Get venue like count
export async function getVenueLikeCount(venueId: string): Promise<number> {
  const supabase = getUntypedClient();

  const { data, error } = await supabase
    .from('venues')
    .select('like_count')
    .eq('id', venueId)
    .single();

  if (error) {
    console.error('Error fetching venue like count:', error);
    return 0;
  }

  return data?.like_count || 0;
}

// Get venues sorted by likes (popularity)
export async function getVenuesByPopularity(options: {
  limit?: number;
  offset?: number;
  category?: string;
}): Promise<{
  id: string;
  name: string;
  slug: string;
  category: string;
  area: string;
  logo_url: string | null;
  cover_image_url: string | null;
  like_count: number;
  view_count: number;
  is_verified: boolean;
}[]> {
  const supabase = getUntypedClient();
  const { limit = 20, offset = 0, category } = options;

  let query = supabase
    .from('venues')
    .select('id, name, slug, category, area, logo_url, cover_image_url, like_count, view_count, is_verified')
    .eq('status', 'approved')
    .order('like_count', { ascending: false })
    .order('view_count', { ascending: false })
    .range(offset, offset + limit - 1);

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching venues by popularity:', error);
    return [];
  }

  return data || [];
}

// Get recent likes for a venue
export async function getRecentLikesForVenue(venueId: string, limit = 5): Promise<{
  userId: string;
  userName: string | null;
  userAvatar: string | null;
  likedAt: string;
}[]> {
  const supabase = getUntypedClient();

  const { data, error } = await supabase
    .from('venue_likes')
    .select(`
      user_id,
      created_at,
      public_users (
        name,
        avatar_url
      )
    `)
    .eq('venue_id', venueId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching recent likes:', error);
    return [];
  }

  return (data || []).map((like: any) => ({
    userId: like.user_id,
    userName: like.public_users?.name || null,
    userAvatar: like.public_users?.avatar_url || null,
    likedAt: like.created_at,
  }));
}
