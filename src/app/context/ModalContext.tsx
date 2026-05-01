/**
 * ModalContext - Tracks whether any modal/bottom sheet is open.
 *
 * When a modal registers itself as open, DashboardLayout hides the
 * top and bottom navigation bars.
 *
 * Scroll-lock is managed centrally by ModalProvider based on openCount,
 * NOT inside each modal component. This prevents nested modals from
 * prematurely re-enabling scroll when one of them closes.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface ModalContextValue {
  openCount: number;
  isAnyModalOpen: boolean;
  register: () => void;
  unregister: () => void;
}

const ModalCtx = createContext<ModalContextValue>({
  openCount: 0,
  isAnyModalOpen: false,
  register: () => {},
  unregister: () => {},
});

export function ModalProvider({ children }: { children: ReactNode }) {
  const [openCount, setOpenCount] = useState(0);

  const register = useCallback(() => setOpenCount((c) => c + 1), []);
  const unregister = useCallback(() => setOpenCount((c) => Math.max(0, c - 1)), []);

  // Central scroll-lock: only ModalProvider touches body.overflow.
  // Nested modals can open/close independently without one accidentally
  // re-enabling scroll while another is still open.
  useEffect(() => {
    document.body.style.overflow = openCount > 0 ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openCount]);

  return (
    <ModalCtx.Provider
      value={{ openCount, isAnyModalOpen: openCount > 0, register, unregister }}
    >
      {children}
    </ModalCtx.Provider>
  );
}

export function useModalContext() {
  return useContext(ModalCtx);
}

/**
 * useModalOverlay — call inside every modal/bottom-sheet component.
 * Registers/unregisters so DashboardLayout nav bars hide correctly.
 * Does NOT touch body.overflow — ModalProvider owns that.
 */
export function useModalOverlay(isOpen: boolean) {
  const { register, unregister } = useContext(ModalCtx);
  const registered = useRef(false);

  useEffect(() => {
    if (isOpen) {
      if (!registered.current) {
        register();
        registered.current = true;
      }
    } else {
      if (registered.current) {
        unregister();
        registered.current = false;
      }
    }
    return () => {
      if (registered.current) {
        unregister();
        registered.current = false;
      }
    };
  }, [isOpen, register, unregister]);
}
