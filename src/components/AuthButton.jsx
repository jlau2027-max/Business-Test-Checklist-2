import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function AuthButton() {
  const navigate = useNavigate();

  return (
    <>
      <SignedOut>
        <Button
          variant="light"
          color="violet"
          size="xs"
          onClick={() => navigate('/sign-in')}
        >
          Sign In
        </Button>
      </SignedOut>
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: { width: 32, height: 32 },
            },
          }}
        />
      </SignedIn>
    </>
  );
}
