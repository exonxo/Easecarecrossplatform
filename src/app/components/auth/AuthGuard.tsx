/**
 * AuthGuard - Route protection components for authenticated/unauthenticated access.
 *
 * RequireAuth:     Wraps dashboard routes; redirects to "/" if not logged in.
 * RedirectIfAuth:  Wraps onboarding route; redirects to "/" if already logged in.
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
 * Protects dashboard routes — redirects to / if not authenticated.
 */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/" replace />;

  return <>{children}</>;
}

/**
 * Redirects authenticated users away from onboarding to dashboard.
 */
export function RedirectIfAuth({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  if (user && profile?.onboardingComplete) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
