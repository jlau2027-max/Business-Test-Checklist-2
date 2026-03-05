import { getSupabaseAdmin } from './lib/supabase-admin.js';
import { getClerkUserId } from './lib/verify-admin.js';

export default async function handler(req, res) {
  const clerkUserId = getClerkUserId(req);
  if (!clerkUserId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const supabase = getSupabaseAdmin();

  if (req.method === 'GET') {
    const { type } = req.query;
    let query = supabase
      .from('user_progress')
      .select('*')
      .eq('clerk_user_id', clerkUserId);

    if (type) query = query.eq('progress_type', type);

    const { data, error } = await query;
    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  }

  if (req.method === 'POST') {
    const { progress_type, content_id, data: progressData } = req.body;

    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        clerk_user_id: clerkUserId,
        progress_type,
        content_id,
        data: progressData,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'clerk_user_id,progress_type,content_id' })
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
