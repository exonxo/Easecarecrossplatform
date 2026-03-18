/**
 * App - Root component for EasyCare.
 *
 * Wraps the app in ErrorBoundary -> AuthProvider -> BookingProvider -> Router.
 * Initializes Capacitor StatusBar + BackButton handling via useCapacitorInit.
 * Renders a "Press back again to exit" toast on native platforms.
 */
import { useCallback } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";
import { ErrorBoundary } from "./components/shared/ErrorBoundary";
import { CapacitorShell } from "./components/shared/CapacitorShell";
import { ModalProvider } from "./context/ModalContext";

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BookingProvider>
          <ModalProvider>
            <CapacitorShell>
              <RouterProvider router={router} />
            </CapacitorShell>
          </ModalProvider>
        </BookingProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}