/**
 * AuthContext - Authentication state management with localStorage persistence.
 *
 * Session persistence: Stores user session in localStorage under "easecare_session".
 * Profile persistence: Stores user profile in localStorage under "easecare_profile".
 *
 * Login flow:
 *   - Phone 8670803180 → marks onboarding complete, skips registration.
 *   - All other phones → onboarding NOT complete, must finish registration + location.
 *
 * Provides: user, profile, loading, login, completeOnboarding, refreshProfile, logout.
 */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

const SESSION_KEY = "easecare_session";
const PROFILE_KEY = "easecare_profile";

/** Known phone that skips onboarding entirely */
const SKIP_ONBOARDING_PHONE = "8670803180";

export type User = { uid: string; phoneNumber: string } | null;

export interface UserProfile {
  uid: string;
  phone: string;
  name?: string;
  email?: string;
  gender?: string;
  relationship?: string;
  location?: string;
  onboardingComplete: boolean;
}

interface AuthContextType {
  user: User;
  profile: UserProfile | null;
  loading: boolean;
  /** Call after OTP verification — creates session + profile stub */
  login: (phone: string) => void;
  /** Call after registration + location steps to mark onboarding done */
  completeOnboarding: (data?: Partial<UserProfile>) => void;
  refreshProfile: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  login: () => {},
  completeOnboarding: () => {},
  refreshProfile: async () => {},
  logout: () => {},
});

function generateUid(phone: string): string {
  // crypto.randomUUID() is available in all modern browsers and is cryptographically secure
  const random = typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID().replace(/-/g, "").slice(0, 12)
    : Math.random().toString(36).slice(2, 14);
  return `user_${phone}_${random}`;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Hydrate session from localStorage on mount
  useEffect(() => {
    try {
      const storedSession = localStorage.getItem(SESSION_KEY);
      const storedProfile = localStorage.getItem(PROFILE_KEY);

      if (storedSession) {
        const parsed: User = JSON.parse(storedSession);
        setUser(parsed);
      }
      if (storedProfile) {
        const parsed: UserProfile = JSON.parse(storedProfile);
        setProfile(parsed);
      }
    } catch {
      // Corrupted storage — clear and start fresh
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(PROFILE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  /** Persist helpers */
  const persistSession = (u: User) => {
    if (u) localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    else localStorage.removeItem(SESSION_KEY);
  };
  const persistProfile = (p: UserProfile | null) => {
    if (p) localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
    else localStorage.removeItem(PROFILE_KEY);
  };

  /**
   * login — called after successful OTP verification.
   * For the known phone, marks onboarding complete immediately.
   */
  const login = useCallback((phone: string) => {
    const uid = generateUid(phone);
    const newUser: User = { uid, phoneNumber: phone };
    const isKnown = phone === SKIP_ONBOARDING_PHONE;

    // Detect returning user: if stored profile belongs to same phone and is complete
    let returningData: Partial<UserProfile> = {};
    try {
      const stored = localStorage.getItem(PROFILE_KEY);
      if (stored) {
        const parsed: UserProfile = JSON.parse(stored);
        if (parsed.phone === phone && parsed.onboardingComplete) {
          returningData = {
            name: parsed.name,
            email: parsed.email,
            gender: parsed.gender,
            relationship: parsed.relationship,
            onboardingComplete: true,
          };
        }
      }
    } catch { /* noop */ }

    const newProfile: UserProfile = {
      uid,
      phone,
      onboardingComplete: isKnown || (returningData.onboardingComplete ?? false),
      ...(isKnown ? { name: "EaseCare User" } : returningData),
    };

    setUser(newUser);
    setProfile(newProfile);
    persistSession(newUser);
    persistProfile(newProfile);
  }, []);

  /**
   * completeOnboarding — called after RegistrationStep + LocationStep.
   * Merges provided data into the profile and sets onboardingComplete = true.
   */
  const completeOnboarding = useCallback(
    (data?: Partial<UserProfile>) => {
      setProfile((prev) => {
        if (!prev) return prev;
        const updated: UserProfile = {
          ...prev,
          ...data,
          onboardingComplete: true,
        };
        persistProfile(updated);
        return updated;
      });
    },
    []
  );

  const refreshProfile = useCallback(async () => {
    // In a real app this would fetch from backend; here we re-read localStorage
    try {
      const stored = localStorage.getItem(PROFILE_KEY);
      if (stored) setProfile(JSON.parse(stored));
    } catch {
      /* noop */
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(PROFILE_KEY);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, profile, loading, login, completeOnboarding, refreshProfile, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
