import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";

/**
 * Gate any action behind authentication.
 * - If the user is already logged in → executes the action immediately.
 * - If not → opens the LoginModal, then auto-executes the action once
 *   the user successfully completes login / registration.
 *
 * Race-condition fix: wasLoggedIn is updated at the top of every effect
 * run so rapid auth transitions don't mis-fire. The setTimeout is also
 * cleaned up on unmount to prevent stale-closure execution.
 */
export function useRequireAuth() {
  const { user, profile } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const pendingAction = useRef<(() => void) | null>(null);
  const wasLoggedIn = useRef(!!(user && profile?.onboardingComplete));

  const isLoggedIn = !!(user && profile?.onboardingComplete);

  useEffect(() => {
    const prevLoggedIn = wasLoggedIn.current;
    wasLoggedIn.current = isLoggedIn;

    // Only fire on the false → true transition with a queued action
    if (isLoggedIn && !prevLoggedIn && pendingAction.current) {
      const action = pendingAction.current;
      pendingAction.current = null;
      setLoginOpen(false);

      // Delay so modal close animation finishes; clean up if unmounted
      const timer = setTimeout(action, 320);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  const requireAuth = (action: () => void) => {
    if (isLoggedIn) {
      action();
    } else {
      pendingAction.current = action;
      setLoginOpen(true);
    }
  };

  return { requireAuth, loginOpen, setLoginOpen };
}
