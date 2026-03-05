import { getSupabaseAdmin } from '../lib/supabase-admin.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { type, data } = req.body;

    if (type === 'user.created' || type === 'user.updated') {
      const supabase = getSupabaseAdmin();
      const { id, email_addresses, first_name, last_name } = data;
      const email = email_addresses?.[0]?.email_address || '';
      const displayName = [first_name, last_name].filter(Boolean).join(' ') || email;

      await supabase.from('profiles').upsert({
        clerk_user_id: id,
        email,
        display_name: displayName,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'clerk_user_id' });
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: error.message });
  }
}
