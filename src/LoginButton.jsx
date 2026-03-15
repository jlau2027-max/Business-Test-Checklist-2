import { Badge, Button } from "@heroui/react";
import { Show, SignInButton, UserButton, useUser } from "@clerk/react";
import { useAuth } from "./AuthContext.jsx";

const ROLE_BADGE_COLOR = {
  origin: "var(--accent-tertiary)",
  core: "var(--accent-secondary)",
  admin: "var(--accent)",
};

const ROLE_LABEL = {
  origin: "Origin",
  core: "Core",
  admin: "Admin",
};

export default function LoginButton() {
  const { isAdmin } = useAuth();
  return (
    <>
      <Show when="signed-out">
        <SignInButton mode="modal">
          <Button
            render={(props) => <button {...props} />}
            size="sm"
            variant="outline"
            className="rounded-full border-[var(--border)] text-[var(--text-secondary)] text-[13px] font-semibold px-3 min-w-[auto] h-8 bg-transparent"
            style={{
              position: "absolute",
              right: 44,
              top: "50%",
              transform: "translateY(-50%)",
              fontFamily: "'JSans', sans-serif",
            }}
          >
            Sign In
          </Button>
        </SignInButton>
      </Show>

      <Show when="signed-in">
        <GreetingWithAvatar isAdmin={isAdmin} />
      </Show>
    </>
  );
}

function GreetingWithAvatar({ isAdmin }) {
  const { user: clerkUser } = useUser();
  const { role } = useAuth();
  const greeting = clerkUser?.firstName || clerkUser?.username || "";
  const badgeColor = ROLE_BADGE_COLOR[role];

  return (
        <div
          style={{
            position: "absolute",
            right: 44,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {greeting && (
            <span
              className="text-[13px] font-semibold text-[var(--text-secondary)] hidden sm:inline"
              style={{ fontFamily: "'JSans', sans-serif", whiteSpace: "nowrap" }}
            >
              Hello, {greeting}
            </span>
          )}
          {badgeColor ? (
            <Badge.Anchor>
              <UserButton
                userProfileUrl="https://accounts.ibrev.org/user"
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
                  {isAdmin && (
                    <UserButton.Link
                      label="Admin"
                      labelIcon={
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                      }
                      href="/admin"
                    />
                  )}
                  {role && (
                    <UserButton.Link
                      label={ROLE_LABEL[role] || role}
                      labelIcon={
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                      }
                      href="#"
                    />
                  )}
                  <UserButton.Action label="manageAccount" />
                  <UserButton.Action label="signOut" />
                </UserButton.MenuItems>
              </UserButton>
              <Badge size="sm" placement="bottom-right" style={{ backgroundColor: badgeColor }} />
            </Badge.Anchor>
          ) : (
            <UserButton
              userProfileUrl="https://accounts.ibrev.org/user"
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
          )}
        </div>
  );
}
