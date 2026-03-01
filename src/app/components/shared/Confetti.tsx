import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from "react";
import confetti from "canvas-confetti";

export interface ConfettiRef {
  fire: () => void;
}

interface ConfettiProps {
  className?: string;
  /** Auto-fire on mount (default: true) */
  autoFire?: boolean;
}

/**
 * Full-viewport confetti canvas.
 * Fires a multi-burst celebration by default on mount.
 */
export const Confetti = forwardRef<ConfettiRef, ConfettiProps>(
  ({ className, autoFire = true }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const confettiInstance = useRef<confetti.CreateTypes | null>(null);

    useEffect(() => {
      if (!canvasRef.current) return;
      confettiInstance.current = confetti.create(canvasRef.current, {
        resize: true,
        useWorker: true,
      });
      return () => {
        confettiInstance.current?.reset();
      };
    }, []);

    const fire = useCallback(() => {
      const cannon = confettiInstance.current;
      if (!cannon) return;

      // Brand-themed colors
      const colors = ["#1975D2", "#60A5FA", "#FBBF24", "#34D399", "#F472B6", "#A78BFA"];

      // Burst from left
      cannon({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.65 },
        colors,
        startVelocity: 45,
        gravity: 1.2,
        ticks: 200,
      });

      // Burst from right
      cannon({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.65 },
        colors,
        startVelocity: 45,
        gravity: 1.2,
        ticks: 200,
      });

      // Center shower after a short delay
      setTimeout(() => {
        cannon({
          particleCount: 80,
          spread: 100,
          origin: { x: 0.5, y: 0.35 },
          colors,
          startVelocity: 30,
          gravity: 0.8,
          scalar: 1.1,
          ticks: 250,
        });
      }, 250);
    }, []);

    useImperativeHandle(ref, () => ({ fire }), [fire]);

    useEffect(() => {
      if (autoFire) {
        // Small delay so the slide-in animation finishes first
        const timer = setTimeout(fire, 400);
        return () => clearTimeout(timer);
      }
    }, [autoFire, fire]);

    return (
      <canvas
        ref={canvasRef}
        className={className}
        style={{ pointerEvents: "none" }}
      />
    );
  }
);

Confetti.displayName = "Confetti";
