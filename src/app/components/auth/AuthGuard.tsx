/**
 * AuthGuard - Route protection components for authenticated/unauthenticated access.
 *
 * RequireAuth:     Wraps dashboard routes; redirects to "/onboarding" if not logged in
 *                  or if onboarding is incomplete.
 * RedirectIfAuth:  Wraps onboarding route; redirects to "/" if already fully onboarded.
 */
import { Navigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

function LoadingScreen() {
  return (
    <div className="size-full flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="size-10 border-3 border-[#1975D2]/20 border-t-[#1975D2] rounded-full animate-spin" />
        <p className="font-['Lexend',sans-serif] text-[14px] text-[#64748b]">Loading...</p>
      </div>
    </div>
  );
}

/**
 * Protects dashboard routes — redirects to /onboarding if not authenticated
 * or if onboarding hasn't been completed.
 */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  // No session at all → go to onboarding login
  if (!user) return <Navigate to="/onboarding" replace />;

  // Logged in but hasn't finished onboarding → send back to onboarding
  // (OnboardingFlow will pick up where they left off based on profile state)
  if (!profile?.onboardingComplete) return <Navigate to="/onboarding" replace />;

  return <>{children}</>;
}

/**
 * Redirects authenticated + onboarded users away from onboarding to dashboard.
 */
export function RedirectIfAuth({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  if (user && profile?.onboardingComplete) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
