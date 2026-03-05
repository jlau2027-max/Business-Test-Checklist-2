import { getSupabaseAdmin } from '../lib/supabase-admin.js';
import { verifyAdmin } from '../lib/verify-admin.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await verifyAdmin(req);
  } catch (error) {
    return res.status(403).json({ error: error.message });
  }

  const supabase = getSupabaseAdmin();

  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  // Get progress stats for each user
  const usersWithStats = await Promise.all(
    profiles.map(async (profile) => {
      const { data: progress } = await supabase
        .from('user_progress')
        .select('progress_type, data')
        .eq('clerk_user_id', profile.clerk_user_id);

      const stats = {
        totalAnswered: progress?.length || 0,
        grades: progress
          ?.filter(p => p.progress_type.includes('grade'))
          .map(p => p.data?.score)
          .filter(s => s !== undefined) || [],
      };
      stats.averageScore = stats.grades.length > 0
        ? (stats.grades.reduce((a, b) => a + b, 0) / stats.grades.length).toFixed(1)
        : null;

      return { ...profile, stats };
    })
  );

  res.json(usersWithStats);
}
