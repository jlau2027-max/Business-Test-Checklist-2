import { useState, useEffect } from 'react';
import { Table, Paper, Text, Badge, Loader, Center, Stack, Title } from '@mantine/core';
import { useAuth } from '@clerk/clerk-react';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await getToken();
        const res = await fetch('/api/admin/users', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [getToken]);

  if (loading) return <Center py="xl"><Loader color="violet" /></Center>;

  if (error) {
    return (
      <Paper p="md" radius="md" style={{ background: '#1A1A24' }}>
        <Text c="red">{error}</Text>
      </Paper>
    );
  }

  return (
    <Stack gap="lg">
      <Title order={4} c="white">All Users ({users.length})</Title>
      <Paper radius="md" style={{ background: '#12121A', border: '1px solid #2A2A3A', overflow: 'auto' }}>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Role</Table.Th>
              <Table.Th>Questions Answered</Table.Th>
              <Table.Th>Avg Score</Table.Th>
              <Table.Th>Joined</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {users.map((user) => (
              <Table.Tr key={user.id}>
                <Table.Td><Text size="sm" c="white">{user.display_name || 'N/A'}</Text></Table.Td>
                <Table.Td><Text size="sm" c="dimmed">{user.email}</Text></Table.Td>
                <Table.Td>
                  <Badge color={user.role === 'admin' ? 'violet' : 'gray'} variant="light" size="sm">
                    {user.role}
                  </Badge>
                </Table.Td>
                <Table.Td><Text size="sm" c="white">{user.stats?.totalAnswered || 0}</Text></Table.Td>
                <Table.Td>
                  <Text size="sm" c={user.stats?.averageScore ? 'green' : 'dimmed'}>
                    {user.stats?.averageScore || '—'}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" c="dimmed">{new Date(user.created_at).toLocaleDateString()}</Text>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}
