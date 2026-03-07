import { Button } from "@heroui/react";
import { Show, SignInButton, UserButton } from "@clerk/react";
import { useAuth } from "./AuthContext.jsx";
import ThemeSwitcher from "./ThemeSwitcher.jsx";

export default function LoginButton() {
  const { isAdmin } = useAuth();
  return (
    <>
      <Show when="signed-out">
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <ThemeSwitcher />
          <SignInButton mode="modal">
            <Button
              render={(props) => <button {...props} />}
              size="sm"
              variant="outline"
              className="rounded-md text-[13px] font-semibold px-3 min-w-[auto] h-8 bg-transparent"
              style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)', fontFamily: "'Inter', sans-serif" }}
            >
              Sign In
            </Button>
          </SignInButton>
        </div>
      </Show>

      <Show when="signed-in">
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <ThemeSwitcher />
          <UserButton
            userProfileUrl="https://accounts.jasperlaulvl7student.com/user"
            userProfileMode="navigation"
            appearance={{
              elements: {
                avatarBox: { width: 32, height: 32 },
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
              <UserButton.Action label="manageAccount" />
              <UserButton.Action label="signOut" />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </Show>
    </>
  );
}
