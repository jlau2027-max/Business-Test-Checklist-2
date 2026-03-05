import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import { Center, Loader, Text, Stack } from '@mantine/core';
import { isAdmin } from '../lib/auth';

export default function AdminGuard({ children }) {
  const { user, isLoaded } = useUser();
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!isLoaded || !user) return;

    isAdmin(user.id).then((result) => {
      setAuthorized(result);
      setChecking(false);
    }).catch(() => {
      setAuthorized(false);
      setChecking(false);
    });
  }, [user, isLoaded]);

  if (!isLoaded || checking) {
    return (
      <Center h="100vh">
        <Stack align="center" gap="md">
          <Loader color="violet" size="lg" />
          <Text c="dimmed" size="sm">Checking permissions...</Text>
        </Stack>
      </Center>
    );
  }

  if (!authorized) {
    return <Navigate to="/" replace />;
  }

  return children;
}
