/**
 * ModalContext - Tracks whether any modal/bottom sheet is open.
 *
 * When a modal registers itself as open, DashboardLayout hides the
 * top and bottom navigation bars. Also provides a useModalOverlay()
 * hook that handles scroll-lock (body overflow hidden) automatically.
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
  /** Number of currently open modals */
  openCount: number;
  /** Whether at least one modal is open */
  isAnyModalOpen: boolean;
  /** Called when a modal opens */
  register: () => void;
  /** Called when a modal closes */
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
 * useModalOverlay - call this inside every modal/bottom-sheet component.
 *
 * When `isOpen` is true it:
 *  1. Registers with ModalContext so nav bars hide
 *  2. Locks body scroll (overflow: hidden)
 *  3. Cleans up on close / unmount
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
      document.body.style.overflow = "hidden";
    } else {
      if (registered.current) {
        unregister();
        registered.current = false;
      }
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      if (registered.current) {
        unregister();
        registered.current = false;
      }
    };
  }, [isOpen, register, unregister]);
}
