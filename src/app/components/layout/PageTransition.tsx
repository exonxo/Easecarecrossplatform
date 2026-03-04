/**
 * PageTransition - Wraps standalone (non-dashboard) pages with a fade transition.
 *
 * Used for full-screen routes outside DashboardLayout (e.g. /post-requirement,
 * /services, /add-location, /bookings/:id/bids).
 *
 * Animates opacity only (GPU composited) with the standard 280ms MUI easing.
 */
import { motion } from "motion/react";

const PAGE_TRANSITION = {
  duration: 0.28,
  ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={PAGE_TRANSITION}
      className="flex-1 flex flex-col min-h-screen"
      style={{ willChange: "opacity" }}
    >
      {children}
    </motion.div>
  );
}
