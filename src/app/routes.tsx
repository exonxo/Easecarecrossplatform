/**
 * App Router Configuration (createHashRouter for GitHub Pages compatibility)
 *
 * Routes:
 *   /                     → DashboardLayout → HomePage (index)
 *   /bookings             → DashboardLayout → MyBookings
 *   /messages             → DashboardLayout → Messages
 *   /profile              → DashboardLayout → Profile
 *   /onboarding           → OnboardingFlow (5-screen login/signup)
 *   /post-requirement     → PostRequirementFlow (booking wizard)
 *   /services             → Services (full category grid)
 *   /add-location         → AddLocation
 *   /bookings/:id/bids    → BidCards (bid viewer for specific booking)
 *
 * Auth guards are commented out for frontend development.
 */
import { createHashRouter, Navigate } from "react-router";

// Layout
import { DashboardLayout } from "./components/layout/DashboardLayout";

// Home
import { HomePage } from "./components/home/HomePage";

// Pages
import { MyBookings } from "./components/pages/MyBookings";
import { Messages } from "./components/pages/Messages";
import { Profile } from "./components/pages/Profile";
import { AddLocation } from "./components/pages/AddLocation";
import { Services } from "./components/pages/Services";

// Onboarding
import { OnboardingFlow } from "./components/onboarding/OnboardingFlow";

// Booking flows
import { PostRequirementFlow } from "./components/booking/PostRequirementFlow";
import { BidCards } from "./components/booking/BidCards";

// Auth guards disabled for frontend development
// import { RequireAuth, RedirectIfAuth } from "./components/auth/AuthGuard";

function NotFound() {
  return <Navigate to="/" replace />;
}

export const router = createHashRouter([
  {
    path: "/",
    Component: DashboardLayout,
    errorElement: <NotFound />,
    children: [
      { index: true, Component: HomePage },
      { path: "bookings", Component: MyBookings },
      { path: "messages", Component: Messages },
      { path: "profile", Component: Profile },
    ],
  },
  {
    path: "/onboarding",
    Component: OnboardingFlow,
  },
  {
    path: "/post-requirement",
    Component: PostRequirementFlow,
  },
  {
    path: "/services",
    Component: Services,
  },
  {
    path: "/add-location",
    Component: AddLocation,
  },
  {
    path: "/bookings/:id/bids",
    Component: BidCards,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);