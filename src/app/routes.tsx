/**
 * App Router Configuration (createHashRouter for GitHub Pages compatibility)
 *
 * Routes:
 *   /                     → RequireAuth → DashboardLayout → HomePage (index)
 *   /bookings             → RequireAuth → DashboardLayout → MyBookings
 *   /messages             → RequireAuth → DashboardLayout → Messages
 *   /profile              → RequireAuth → DashboardLayout → Profile
 *   /onboarding           → RedirectIfAuth → OnboardingFlow (5-screen login/signup)
 *   /post-requirement     → RequireAuth → PostRequirementFlow (booking wizard)
 *   /services             → RequireAuth → Services (full category grid)
 *   /add-location         → RequireAuth → AddLocation
 *   /bookings/:id/bids    → RequireAuth → BidCards (bid viewer for specific booking)
 *
 * Auth guards are ACTIVE — unauthenticated users are redirected to /onboarding.
 */
import { createHashRouter, Navigate } from "react-router";
import { useRouteError } from "react-router";

// Auth guards
import { RequireAuth, RedirectIfAuth } from "./components/auth/AuthGuard";

// Layout — loaded eagerly (always needed)
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { PageTransition } from "./components/layout/PageTransition";

// Page components — eagerly imported to avoid "Failed to fetch dynamically
// imported module" errors in the Figma Make proxy environment.  The app is
// small enough that code-splitting provides negligible benefit.
import { HomePage } from "./components/home/HomePage";
import { MyBookings } from "./components/pages/MyBookings";
import { Messages } from "./components/pages/Messages";
import { Profile } from "./components/pages/Profile";
import { AddLocation } from "./components/pages/AddLocation";
import { Services } from "./components/pages/Services";
import { OnboardingFlow } from "./components/onboarding/OnboardingFlow";
import { PostRequirementFlow } from "./components/booking/PostRequirementFlow";
import { BidCards } from "./components/booking/BidCards";

/**
 * Route-level error boundary — shows a friendly error UI with retry.
 * Prevents the infinite-redirect loop that occurred when errorElement
 * used <Navigate to="/" />.
 */
function RouteErrorBoundary() {
  const error = useRouteError();
  const message =
    error instanceof Error ? error.message : "Something went wrong";

  return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-[#f6f8fc] px-6">
      <div className="text-center max-w-sm">
        <div className="size-14 mx-auto mb-4 rounded-full bg-[#fef2f2] flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-7 text-[#EF4444]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="font-['Lexend',sans-serif] font-semibold text-[20px] text-[#111827] mb-2">
          Page failed to load
        </h2>
        <p className="font-['Inter',sans-serif] text-[14px] text-[#6b7280] mb-6">
          {message}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center px-6 py-3 rounded-[12px] bg-[#1975D2] text-white font-['Inter',sans-serif] font-medium text-[14px] hover:bg-[#1565b8] active:scale-[0.98] transition-all cursor-pointer shadow-[0_4px_12px_rgba(25,117,210,0.25)]"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}

function NotFound() {
  return <Navigate to="/" replace />;
}

/**
 * Protected DashboardLayout wrapper — checks auth before rendering layout + children.
 */
function ProtectedDashboardLayout() {
  return (
    <RequireAuth>
      <DashboardLayout />
    </RequireAuth>
  );
}

export const router = createHashRouter([
  {
    path: "/",
    Component: ProtectedDashboardLayout,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "bookings", element: <MyBookings /> },
      { path: "messages", element: <Messages /> },
      { path: "profile", element: <Profile /> },
    ],
  },
  {
    path: "/onboarding",
    element: (
      <RedirectIfAuth>
        <PageTransition>
          <OnboardingFlow />
        </PageTransition>
      </RedirectIfAuth>
    ),
  },
  {
    path: "/post-requirement",
    element: (
      <RequireAuth>
        <PageTransition>
          <PostRequirementFlow />
        </PageTransition>
      </RequireAuth>
    ),
  },
  {
    path: "/services",
    element: (
      <RequireAuth>
        <PageTransition>
          <Services />
        </PageTransition>
      </RequireAuth>
    ),
  },
  {
    path: "/add-location",
    element: (
      <RequireAuth>
        <PageTransition>
          <AddLocation />
        </PageTransition>
      </RequireAuth>
    ),
  },
  {
    path: "/bookings/:id/bids",
    element: (
      <RequireAuth>
        <PageTransition>
          <BidCards />
        </PageTransition>
      </RequireAuth>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);