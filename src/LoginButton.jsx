import { Button, Menu, Text } from "@mantine/core";
import { Show, SignInButton, UserButton } from "@clerk/react";
import { useAuth } from "./AuthContext.jsx";

export default function LoginButton() {
  const { user, logOut } = useAuth();

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
        <Menu shadow="md" width={180} position="bottom-end" radius="md"
          styles={{
            dropdown: {
              backgroundColor: "#12121A",
              border: "1px solid #252533",
            },
            item: {
              color: "#F0EEE8",
              fontSize: 13,
              "&:hover": { backgroundColor: "#1A1A24" },
            },
          }}
        >
          <Menu.Target>
            <Button
              radius="xl"
              style={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "#7C6FFF",
                color: "#fff",
                width: 32,
                height: 32,
                padding: 0,
                minWidth: "auto",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {(user?.displayName?.[0] || user?.email?.[0] || "S").toUpperCase()}
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>
              <Text fz={11} c="#55556A" truncate>
                {user?.email || user?.displayName}
              </Text>
            </Menu.Label>
            <Menu.Item
              component="a"
              href="/dashboard"
              leftSection={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                </svg>
              }
            >
              Dashboard
            </Menu.Item>
            <Menu.Divider style={{ borderColor: "#252533" }} />
            <Menu.Item
              onClick={() => logOut()}
              color="red"
              leftSection={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              }
            >
              Sign Out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Show>
    </>
  );
}
