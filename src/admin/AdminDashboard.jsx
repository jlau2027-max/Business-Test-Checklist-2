import { useState, useEffect } from 'react';
import { Paper, Title, Text, SimpleGrid, Stack, Loader, Center } from '@mantine/core';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

function StatCard({ title, value, color }) {
  return (
    <Paper p="md" radius="md" style={{ background: '#12121A', border: '1px solid #2A2A3A' }}>
      <Text c="dimmed" size="xs" tt="uppercase" fw={700}>{title}</Text>
      <Title order={3} c={color || 'white'} mt={4}>{value}</Title>
    </Paper>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setStats({ users: 0, flashcards: 0, mcqs: 0, written: 0, history: 0, specimen: 0 });
      setLoading(false);
      return;
    }

    Promise.all([
      supabase.from('profiles').select('id', { count: 'exact', head: true }),
      supabase.from('flashcard_categories').select('id', { count: 'exact', head: true }),
      supabase.from('mcq_questions').select('id', { count: 'exact', head: true }),
      supabase.from('written_questions').select('id', { count: 'exact', head: true }),
      supabase.from('history_questions').select('id', { count: 'exact', head: true }),
      supabase.from('specimen_questions').select('id', { count: 'exact', head: true }),
    ]).then(([users, flashcards, mcqs, written, history, specimen]) => {
      setStats({
        users: users.count || 0,
        flashcards: flashcards.count || 0,
        mcqs: mcqs.count || 0,
        written: written.count || 0,
        history: history.count || 0,
        specimen: specimen.count || 0,
      });
      setLoading(false);
    }).catch(() => {
      setStats({ users: 0, flashcards: 0, mcqs: 0, written: 0, history: 0, specimen: 0 });
      setLoading(false);
    });
  }, []);

  if (loading) return <Center py="xl"><Loader color="violet" /></Center>;

  return (
    <Stack gap="lg">
      <Title order={4} c="white">Overview</Title>
      <SimpleGrid cols={{ base: 2, sm: 3, md: 6 }}>
        <StatCard title="Users" value={stats.users} color="#7C6FFF" />
        <StatCard title="Flashcard Sets" value={stats.flashcards} color="#38BDF8" />
        <StatCard title="MCQ Questions" value={stats.mcqs} color="#34D399" />
        <StatCard title="Written Qs" value={stats.written} color="#FBBF24" />
        <StatCard title="History Qs" value={stats.history} color="#FB923C" />
        <StatCard title="Specimen Qs" value={stats.specimen} color="#F87171" />
      </SimpleGrid>

      {!isSupabaseConfigured() && (
        <Paper p="md" radius="md" style={{ background: '#1A1A24', border: '1px solid #3A3A4A' }}>
          <Text c="yellow" size="sm" fw={500}>Supabase not configured</Text>
          <Text c="dimmed" size="xs" mt={4}>
            Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env.local file to enable database features.
          </Text>
        </Paper>
      )}
    </Stack>
  );
}
