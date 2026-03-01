import { useState, useRef, useCallback } from "react";

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh?: () => Promise<void>;
}

export function PullToRefresh({ children, onRefresh }: PullToRefreshProps) {
  const [pulling, setPulling] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const threshold = 80;

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (scrollRef.current && scrollRef.current.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
      setPulling(true);
    }
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!pulling || refreshing) return;
      const currentY = e.touches[0].clientY;
      const diff = currentY - startY.current;
      if (diff > 0 && scrollRef.current && scrollRef.current.scrollTop === 0) {
        // Damping factor for rubber-band feel
        const dampedDiff = Math.min(diff * 0.4, 120);
        setPullDistance(dampedDiff);
      }
    },
    [pulling, refreshing]
  );

  const handleTouchEnd = useCallback(async () => {
    if (!pulling) return;
    setPulling(false);

    if (pullDistance >= threshold && !refreshing) {
      setRefreshing(true);
      setPullDistance(50);
      try {
        if (onRefresh) {
          await onRefresh();
        } else {
          // Simulate refresh
          await new Promise((r) => setTimeout(r, 1200));
        }
      } finally {
        setRefreshing(false);
        setPullDistance(0);
      }
    } else {
      setPullDistance(0);
    }
  }, [pulling, pullDistance, refreshing, onRefresh]);

  const progress = Math.min(pullDistance / threshold, 1);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull indicator */}
      <div
        className="flex items-center justify-center overflow-hidden transition-[height] duration-200 ease-out md:hidden"
        style={{
          height: pullDistance > 0 ? `${pullDistance}px` : "0px",
          transition: pulling ? "none" : "height 0.3s ease-out",
        }}
      >
        <div className="flex flex-col items-center gap-1">
          {/* Spinner */}
          <div
            className="size-6 border-2 border-[#1975D2]/20 border-t-[#1975D2] rounded-full"
            style={{
              transform: refreshing ? "none" : `rotate(${progress * 360}deg)`,
              animation: refreshing ? "spin 0.8s linear infinite" : "none",
            }}
          />
          <span className="font-['Lexend',sans-serif] text-[11px] text-[#94a3b8]">
            {refreshing ? "Refreshing..." : progress >= 1 ? "Release to refresh" : "Pull to refresh"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          transform: pullDistance > 0 ? `translateY(0)` : "none",
          transition: pulling ? "none" : "transform 0.3s ease-out",
        }}
      >
        {children}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
