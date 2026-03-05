import { useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import { Center, Loader } from '@mantine/core';

export default function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <Center h="100vh">
        <Loader color="violet" size="lg" />
      </Center>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}
