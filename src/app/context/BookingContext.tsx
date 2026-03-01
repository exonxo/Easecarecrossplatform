import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface BookedProvider {
  providerName: string;
  providerPhoto: string;
  service: string;
  rating: number;
  agency: string;
  timeSlot: string;
  bidAmount: string;
  /** True when booked via a care package (system-assigned worker) */
  isPackageBooking?: boolean;
  /** Assignment lifecycle: confirming → assigning → assigned → ongoing */
  packageStage?: "confirming" | "assigning" | "assigned" | "ongoing";
  packageTitle?: string;
}

export interface CompletedGig {
  id: string;
  providerName: string;
  providerPhoto: string;
  service: string;
  rating: number;
  agency: string;
  timeSlot: string;
  bidAmount: string;
  completedAt: string;
}

interface BookingContextValue {
  bookedProvider: BookedProvider | null;
  setBookedProvider: (provider: BookedProvider | null) => void;
  clearBooking: () => void;
  completeGig: () => void;
}

const STORAGE_KEY = "easecare_booked_provider";
const COMPLETED_GIGS_KEY = "ec_completed_gigs";

function loadFromSession(): BookedProvider | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveToSession(provider: BookedProvider | null) {
  try {
    if (provider) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(provider));
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // sessionStorage unavailable — no-op
  }
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookedProvider, setBookedProviderState] = useState<BookedProvider | null>(
    () => loadFromSession()
  );

  // Persist to sessionStorage whenever bookedProvider changes
  useEffect(() => {
    saveToSession(bookedProvider);
  }, [bookedProvider]);

  const setBookedProvider = (provider: BookedProvider | null) => {
    setBookedProviderState(provider);
  };

  const clearBooking = () => {
    setBookedProviderState(null);
  };

  const completeGig = () => {
    if (!bookedProvider) return;
    const completedGig: CompletedGig = {
      id: `gig-${Date.now()}`,
      ...bookedProvider,
      completedAt: new Date().toISOString(),
    };
    try {
      const existing: CompletedGig[] = JSON.parse(localStorage.getItem(COMPLETED_GIGS_KEY) || "[]");
      existing.unshift(completedGig);
      localStorage.setItem(COMPLETED_GIGS_KEY, JSON.stringify(existing));
    } catch {
      // localStorage unavailable — no-op
    }
    clearBooking();
  };

  return (
    <BookingContext.Provider
      value={{ bookedProvider, setBookedProvider, clearBooking, completeGig }}
    >
      {children}
    </BookingContext.Provider>
  );
}