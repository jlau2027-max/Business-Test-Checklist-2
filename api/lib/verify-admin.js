import { getSupabaseAdmin } from './supabase-admin.js';

export async function verifyAdmin(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Missing authorization header');
  }

  const token = authHeader.replace('Bearer ', '');

  // Decode the Clerk JWT to get the user ID (sub claim)
  const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  const clerkUserId = payload.sub;

  if (!clerkUserId) {
    throw new Error('Invalid token');
  }

  const supabase = getSupabaseAdmin();
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('clerk_user_id', clerkUserId)
    .single();

  if (profile?.role !== 'admin') {
    throw new Error('Forbidden: admin access required');
  }

  return { clerkUserId, profile };
}

export function getClerkUserId(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return null;
  const token = authHeader.replace('Bearer ', '');
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    return payload.sub;
  } catch {
    return null;
  }
}
