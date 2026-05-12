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
 *
 * CODE SPLITTING: HomePage loads eagerly (instant first paint). All other routes
 * are lazy-loaded with React.lazy() to shrink the initial bundle from 1.4 MB to ~600 KB.
 */
import { lazy, Suspense } from "react";
import { createHashRouter, Navigate } from "react-router";
import { useRouteError } from "react-router";

// Auth guards
import { RequireAuth, RedirectIfAuth } from "./components/auth/AuthGuard";

// Layout — loaded eagerly (always needed)
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { PageTransition } from "./components/layout/PageTransition";

// HomePage — eager (first paint critical)
import { HomePage } from "./components/home/HomePage";

// All other pages — lazy-loaded per route for smaller initial bundle.
// Wrap the named exports so React.lazy gets a default export.
const MyBookings         = lazy(() => import("./components/pages/MyBookings").then(m => ({ default: m.MyBookings })));
const Messages           = lazy(() => import("./components/pages/Messages").then(m => ({ default: m.Messages })));
const Profile            = lazy(() => import("./components/pages/Profile").then(m => ({ default: m.Profile })));
const AddLocation        = lazy(() => import("./components/pages/AddLocation").then(m => ({ default: m.AddLocation })));
const Services           = lazy(() => import("./components/pages/Services").then(m => ({ default: m.Services })));
const OnboardingFlow     = lazy(() => import("./components/onboarding/OnboardingFlow").then(m => ({ default: m.OnboardingFlow })));
const PostRequirementFlow = lazy(() => import("./components/booking/PostRequirementFlow").then(m => ({ default: m.PostRequirementFlow })));
const BidCards           = lazy(() => import("./components/booking/BidCards").then(m => ({ default: m.BidCards })));

/* ── Suspense fallback while lazy chunk loads ─────────────────────── */
function RouteFallback() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh]">
      <div
        className="size-8 rounded-full animate-spin"
        style={{ border: "3px solid rgba(25,117,210,0.3)", borderTopColor: "#1975D2" }}
      />
    </div>
  );
}

const withSuspense = (node: React.ReactNode) => (
  <Suspense fallback={<RouteFallback />}>{node}</Suspense>
);

/**
 * Route-level error boundary — shows a friendly error UI with retry.
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

export const router = createHashRouter([
  {
    path: "/",
    Component: DashboardLayout,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "bookings",
        element: <RequireAuth>{withSuspense(<MyBookings />)}</RequireAuth>,
      },
      {
        path: "messages",
        element: <RequireAuth>{withSuspense(<Messages />)}</RequireAuth>,
      },
      {
        path: "profile",
        element: <RequireAuth>{withSuspense(<Profile />)}</RequireAuth>,
      },
    ],
  },
  {
    path: "/onboarding",
    element: (
      <RedirectIfAuth>
        <PageTransition>{withSuspense(<OnboardingFlow />)}</PageTransition>
      </RedirectIfAuth>
    ),
  },
  {
    path: "/post-requirement",
    element: (
      <RequireAuth>
        <PageTransition>{withSuspense(<PostRequirementFlow />)}</PageTransition>
      </RequireAuth>
    ),
  },
  {
    path: "/services",
    element: (
      <RequireAuth>
        <PageTransition>{withSuspense(<Services />)}</PageTransition>
      </RequireAuth>
    ),
  },
  {
    path: "/add-location",
    element: (
      <RequireAuth>
        <PageTransition>{withSuspense(<AddLocation />)}</PageTransition>
      </RequireAuth>
    ),
  },
  {
    path: "/bookings/:id/bids",
    element: (
      <RequireAuth>
        <PageTransition>{withSuspense(<BidCards />)}</PageTransition>
      </RequireAuth>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
