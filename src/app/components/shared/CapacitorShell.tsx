/**
 * CapacitorShell - Initializes Capacitor native features.
 *
 * StatusBar: Configures non-overlapping status bar with primary blue background.
 * BackButton: Double-back-to-exit on Home; browser-history back on other screens.
 * Safe Area: Adds CSS custom property for safe-area-inset-top.
 *
 * Uses window.location.hash directly (compatible with createHashRouter)
 * so this component can live outside <RouterProvider>.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Capacitor } from "@capacitor/core";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  children: ReactNode;
}

export function CapacitorShell({ children }: Props) {
  const [showExitToast, setShowExitToast] = useState(false);
  const lastBackPress = useRef(0);
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // StatusBar initialization
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    (async () => {
      try {
        const { StatusBar } = await import("@capacitor/status-bar");
        await StatusBar.setOverlaysWebView({ overlay: false });
        await StatusBar.setBackgroundColor({ color: "#1975D2" });
      } catch {
        // StatusBar plugin not available
      }
    })();
  }, []);

  // Hardware back button handler
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    let listener: { remove: () => Promise<void> } | null = null;

    (async () => {
      try {
        const { App } = await import("@capacitor/app");

        listener = await App.addListener("backButton", () => {
          // Read current hash path
          const hash = window.location.hash; // e.g. "#/" or "#/bookings"
          const path = hash.replace(/^#/, "") || "/";
          const isHome = path === "/" || path === "";

          if (!isHome) {
            // Navigate back using browser history (works with hash router)
            window.history.back();
            return;
          }

          // Double-back-to-exit on Home
          const now = Date.now();
          if (now - lastBackPress.current < 2000) {
            App.exitApp();
          } else {
            lastBackPress.current = now;
            setShowExitToast(true);
            if (toastTimeout.current) clearTimeout(toastTimeout.current);
            toastTimeout.current = setTimeout(() => setShowExitToast(false), 2000);
          }
        });
      } catch {
        // App plugin not available
      }
    })();

    return () => {
      listener?.remove();
      if (toastTimeout.current) clearTimeout(toastTimeout.current);
    };
  }, []);

  return (
    <>
      {children}

      {/* Exit toast — shown on native when user presses back on Home */}
      <AnimatePresence>
        {showExitToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none"
          >
            <div className="bg-[#1e293b] text-white font-['Lexend',sans-serif] text-[13px] px-5 py-2.5 rounded-full shadow-lg">
              Press back again to exit
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
