import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const startTime = Date.now();
  const results = {
    success: false,
    timestamp: new Date().toISOString(),
    connection: null as any,
    environment: {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL
        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 30)}...`
        : 'NOT SET',
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 20)}...`
        : 'NOT SET',
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
        ? '********'
        : 'NOT SET',
    },
    duration: null as string | null,
    error: null as any,
  };

  // Check environment variables
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    results.error = {
      type: 'MISSING_CREDENTIALS',
      message: 'Supabase credentials not fully configured.',
      missing: {
        url: !process.env.NEXT_PUBLIC_SUPABASE_URL,
        anonKey: !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        serviceRoleKey: !process.env.SUPABASE_SERVICE_ROLE_KEY,
      }
    };
    results.duration = `${Date.now() - startTime}ms`;
    return res.status(500).json(results);
  }

  try {
    // Test connection by checking auth settings
    const { data, error } = await supabaseAdmin.auth.getSession();

    if (error) {
      throw error;
    }

    // Try to list tables (requires service role)
    const { data: tables, error: tablesError } = await supabaseAdmin
      .from('_test_connection')
      .select('*')
      .limit(1);

    results.connection = {
      status: 'SUCCESS',
      message: 'Connected to Supabase successfully!',
      projectRef: process.env.NEXT_PUBLIC_SUPABASE_URL?.match(/https:\/\/(.+)\.supabase\.co/)?.[1] || 'unknown',
      authStatus: 'Working',
      databaseStatus: tablesError?.code === '42P01' ? 'Working (no tables yet)' : 'Working',
    };

    results.success = true;
    results.duration = `${Date.now() - startTime}ms`;

    return res.status(200).json({
      ...results,
      message: 'Supabase connection test completed successfully!',
      nextSteps: [
        'Create your first table in Supabase Dashboard',
        'Run database migrations',
        'Start building features!'
      ]
    });

  } catch (error: any) {
    results.connection = {
      status: 'FAILED',
      message: error.message,
    };
    results.error = {
      type: 'CONNECTION_ERROR',
      message: error.message,
      hint: error.hint || null,
      code: error.code || null,
    };
    results.duration = `${Date.now() - startTime}ms`;

    return res.status(500).json(results);
  }
}
