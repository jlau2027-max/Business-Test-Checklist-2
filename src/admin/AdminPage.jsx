import { useState } from 'react';
import { Container, Title, Text, Tabs, Group, Button, Box } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import UserManagement from './UserManagement';
import ContentManager from './ContentManager';
import AIContentGenerator from './AIContentGenerator';
import CommitHistory from './CommitHistory';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  return (
    <Box style={{ minHeight: '100vh', background: '#09090F' }}>
      <Container size="xl" py="xl">
        <Group justify="space-between" mb="xl">
          <div>
            <Title order={2} c="white">Admin Panel</Title>
            <Text c="dimmed" size="sm">Manage content, users, and site settings</Text>
          </div>
          <Button variant="subtle" color="gray" onClick={() => navigate('/')}>
            Back to Site
          </Button>
        </Group>

        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List mb="lg">
            <Tabs.Tab value="dashboard">Dashboard</Tabs.Tab>
            <Tabs.Tab value="users">Users</Tabs.Tab>
            <Tabs.Tab value="content">Content</Tabs.Tab>
            <Tabs.Tab value="generate">AI Generate</Tabs.Tab>
            <Tabs.Tab value="commits">Commit Log</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="dashboard"><AdminDashboard /></Tabs.Panel>
          <Tabs.Panel value="users"><UserManagement /></Tabs.Panel>
          <Tabs.Panel value="content"><ContentManager /></Tabs.Panel>
          <Tabs.Panel value="generate"><AIContentGenerator /></Tabs.Panel>
          <Tabs.Panel value="commits"><CommitHistory /></Tabs.Panel>
        </Tabs>
      </Container>
    </Box>
  );
}
