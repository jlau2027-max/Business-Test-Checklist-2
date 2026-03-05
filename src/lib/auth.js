import { supabase } from './supabase';

export async function getProfile(clerkUserId) {
  if (!supabase) return null;
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('clerk_user_id', clerkUserId)
    .single();
  return data;
}

export async function isAdmin(clerkUserId) {
  const profile = await getProfile(clerkUserId);
  return profile?.role === 'admin';
}

export async function upsertProfile(clerkUserId, email, displayName) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      clerk_user_id: clerkUserId,
      email,
      display_name: displayName,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'clerk_user_id' })
    .select()
    .single();
  if (error) console.error('Profile upsert error:', error);
  return data;
}
