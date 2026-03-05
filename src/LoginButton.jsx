import { Button } from "@mantine/core";
import { Show, SignInButton, UserButton } from "@clerk/react";

export default function LoginButton() {
  return (
    <>
      <Show when="signed-out">
        <SignInButton mode="modal">
          <Button
            radius="md"
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "transparent",
              color: "#8B8B9E",
              border: "1px solid #252533",
              padding: "4px 12px",
              minWidth: "auto",
              height: 32,
              fontSize: 13,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
            }}
          >
            Sign In
          </Button>
        </SignInButton>
      </Show>

      <Show when="signed-in">
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <UserButton
            userProfileUrl="https://accounts.jasperlaulvl7student.com/user"
            userProfileMode="navigation"
            appearance={{
              elements: {
                avatarBox: {
                  width: 32,
                  height: 32,
                },
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Link
                label="Dashboard"
                labelIcon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="3" width="7" height="7"/>
                    <rect x="14" y="3" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/>
                  </svg>
                }
                href="/dashboard"
              />
              <UserButton.Action label="manageAccount" />
              <UserButton.Action label="signOut" />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </Show>
    </>
  );
}
