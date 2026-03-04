/**
 * AnimatedOutlet - Wraps React Router's <Outlet> with fade page transitions.
 *
 * Uses the "frozen outlet" pattern so exit animations show old content
 * while the new route fades in.
 *
 * Performance:
 *   - Only animates `opacity` (GPU-composited, no layout thrash)
 *   - 280ms duration per the animation guide spec for page-level transitions
 *   - MUI standard easing: cubic-bezier(0.4, 0, 0.2, 1)
 *   - Respects prefers-reduced-motion via CSS (see index.css)
 */
import { useState } from "react";
import { useLocation, useOutlet } from "react-router";
import { AnimatePresence, motion } from "motion/react";

const PAGE_TRANSITION = {
  duration: 0.28,
  ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
};

/**
 * Captures the outlet element on first render and never updates,
 * so exit animations display the OLD route content.
 */
function FrozenOutlet({ outlet }: { outlet: React.ReactNode }) {
  const [frozen] = useState(outlet);
  return <>{frozen}</>;
}

export function AnimatedOutlet() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={PAGE_TRANSITION}
        className="flex-1 flex flex-col"
        style={{ willChange: "opacity" }}
      >
        <FrozenOutlet outlet={outlet} />
      </motion.div>
    </AnimatePresence>
  );
}
