import { useState, useEffect } from 'react';
import { Table, Paper, Text, Badge, Loader, Center, Stack, Title, Button } from '@mantine/core';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from '@clerk/clerk-react';

export default function CommitHistory() {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const fetchCommits = async () => {
    if (!isSupabaseConfigured()) { setLoading(false); return; }
    const { data } = await supabase
      .from('content_commits')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    setCommits(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchCommits(); }, []);

  const retryCommit = async (commit) => {
    try {
      const token = await getToken();
      const res = await fetch('/api/admin/commit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ message: commit.commit_message }),
      });
      if (res.ok) fetchCommits();
    } catch (err) {
      console.error('Retry failed:', err);
    }
  };

  if (loading) return <Center py="xl"><Loader color="violet" /></Center>;

  return (
    <Stack gap="lg">
      <Title order={4} c="white">Commit History</Title>
      {commits.length === 0 ? (
        <Paper p="xl" radius="md" style={{ background: '#12121A', border: '1px solid #2A2A3A' }}>
          <Text c="dimmed" ta="center">No commits yet. Content changes will appear here after you save and commit.</Text>
        </Paper>
      ) : (
        <Paper radius="md" style={{ background: '#12121A', border: '1px solid #2A2A3A', overflow: 'auto' }}>
          <Table striped>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Date</Table.Th>
                <Table.Th>Message</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>SHA</Table.Th>
                <Table.Th>Files</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {commits.map((c) => (
                <Table.Tr key={c.id}>
                  <Table.Td><Text size="xs" c="dimmed">{new Date(c.created_at).toLocaleString()}</Text></Table.Td>
                  <Table.Td><Text size="sm" c="white" lineClamp={1}>{c.commit_message}</Text></Table.Td>
                  <Table.Td>
                    <Badge color={c.status === 'committed' ? 'green' : c.status === 'failed' ? 'red' : 'yellow'} variant="light" size="sm">
                      {c.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td><Text size="xs" c="dimmed" ff="monospace">{c.commit_sha ? c.commit_sha.slice(0, 7) : '—'}</Text></Table.Td>
                  <Table.Td><Text size="xs" c="dimmed">{c.files_changed?.length || 0} files</Text></Table.Td>
                  <Table.Td>
                    {c.status === 'failed' && (
                      <Button size="xs" variant="light" color="yellow" onClick={() => retryCommit(c)}>Retry</Button>
                    )}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      )}
    </Stack>
  );
}
