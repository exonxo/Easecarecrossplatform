/**
 * App - Root component for EaseCare.
 *
 * Wraps the app in ErrorBoundary -> AuthProvider -> BookingProvider -> Router.
 * Initializes Capacitor StatusBar + BackButton handling via useCapacitorInit.
 * Renders a "Press back again to exit" toast on native platforms.
 *
 * Also mounts MobileAppPrompt — a bottom sheet shown on first-visit mobile
 * web users encouraging app install (skipped on desktop / Capacitor / PWA).
 */
import { RouterProvider } from "react-router";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { router } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";
import { ErrorBoundary } from "./components/shared/ErrorBoundary";
import { CapacitorShell } from "./components/shared/CapacitorShell";
import { ModalProvider } from "./context/ModalContext";
import { MobileAppPrompt } from "./components/shared/MobileAppPrompt";

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BookingProvider>
          <ModalProvider>
            <CapacitorShell>
              <RouterProvider router={router} />
              <MobileAppPrompt />
              <SpeedInsights />
            </CapacitorShell>
          </ModalProvider>
        </BookingProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
