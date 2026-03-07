import { Button } from "@heroui/react";
import { Show, SignInButton, UserButton, useUser } from "@clerk/react";
import { useAuth } from "./AuthContext.jsx";

export default function LoginButton() {
  // #region agent log
  try {
    fetch('http://127.0.0.1:7756/ingest/fda1bef3-c489-4aa0-8808-23f7b31bfe3e', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '19536b' }, body: JSON.stringify({ sessionId: '19536b', location: 'LoginButton.jsx:entry', message: 'LoginButton render start', data: {}, hypothesisId: 'B', timestamp: Date.now() }) }).catch(() => {});
  } catch (_) {}
  // #endregion
  let authContext = null;
  try {
    authContext = useAuth();
  } catch (e) {
    // #region agent log
    try {
      fetch('http://127.0.0.1:7756/ingest/fda1bef3-c489-4aa0-8808-23f7b31bfe3e', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '19536b' }, body: JSON.stringify({ sessionId: '19536b', location: 'LoginButton.jsx:useAuth', message: 'useAuth threw', data: { error: String(e && e.message) }, hypothesisId: 'B', timestamp: Date.now() }) }).catch(() => {});
    } catch (_) {}
    // #endregion
    throw e;
  }
  const { isAdmin } = authContext;
  const { isLoaded: clerkLoaded, isSignedIn: clerkSignedIn } = useUser();
  // #region agent log
  try {
    fetch('http://127.0.0.1:7756/ingest/fda1bef3-c489-4aa0-8808-23f7b31bfe3e', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '19536b' }, body: JSON.stringify({ sessionId: '19536b', location: 'LoginButton.jsx:state', message: 'LoginButton state', data: { isAdmin, clerkLoaded, clerkSignedIn }, hypothesisId: 'A,D', timestamp: Date.now() }) }).catch(() => {});
  } catch (_) {}
  // #endregion
  return (
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
      {!clerkLoaded ? (
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
      ) : (
        <>
      <Show when="signed-out">
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
      </Show>

      <Show when="signed-in">
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
      </Show>
        </>
      )}
    </div>
  );
}
