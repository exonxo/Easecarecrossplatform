/**
 * AuthContext — authentication state for EaseCare.
 *
 * Two modes (VITE_USE_MOCK):
 *  - real (default): Firebase Phone OTP → POST /auth/firebase-login → JWT (stored
 *    via apiClient tokenManager). Seeker registration via POST /auth/register-seeker
 *    (with seeker_tos policy_version). Profile from GET /auth/profile.
 *  - mock ("true"): the original localStorage-only simulation (offline demo).
 *
 * The exported surface is BACKWARD-COMPATIBLE: every method the previous version
 * exposed (login, completeOnboarding, refreshProfile, logout) is preserved with a
 * compatible signature; sendOtp/verifyOtp/getSeekerPolicy are ADDITIVE so existing
 * consumers (AuthGuard, useRequireAuth, LoginModal, OnboardingFlow) keep compiling.
 */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { fetchJson, setTokens, clearTokens, hasSession } from "../services/apiClient";
import {
  isFirebaseConfigured,
  createRecaptcha,
  sendOtp as fbSendOtp,
  firebaseSignOut,
  type ConfirmationResult,
} from "../services/firebase";
import { logger } from "../lib/logger";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

const SESSION_KEY = "easecare_session";
const PROFILE_KEY = "easecare_profile";
const UID_KEY = "easecare_uid";
const RECAPTCHA_CONTAINER_ID = "recaptcha-container";

/** Known phone that skips onboarding entirely — MOCK mode only. */
const SKIP_ONBOARDING_PHONE = "8670803180";

export type User = { uid: string; phoneNumber: string } | null;

export interface PendingPolicy {
  code: string;
  version: string;
  title: string;
  content_md: string;
  deletion_due_at?: string | null;
}

export interface SeekerPolicy {
  code: string;
  version: string;
  title: string;
  content_md: string;
}

export interface UserProfile {
  uid: string;
  phone: string;
  name?: string;
  email?: string;
  gender?: string;
  relationship?: string;
  location?: string;
  onboardingComplete: boolean;
  /** Set when the backend requires re-acceptance of an updated policy. */
  pendingPolicyAcceptance?: PendingPolicy | null;
}

/** Extra fields the onboarding flow threads into completeOnboarding. */
export interface CompleteOnboardingData extends Partial<UserProfile> {
  policyVersion?: string;
}

interface AuthContextType {
  user: User;
  profile: UserProfile | null;
  loading: boolean;
  /** @deprecated real-mode auth uses sendOtp/verifyOtp; kept for mock + back-compat. */
  login: (phone: string) => void;
  /** Send an OTP to the phone (real mode: Firebase; mock: resolves immediately). */
  sendOtp: (phone: string) => Promise<void>;
  /** Verify the OTP; returns whether the user is new and if onboarding is complete. */
  verifyOtp: (code: string, phone: string) => Promise<{ isNewUser: boolean; onboardingComplete: boolean }>;
  /** Fetch the active seeker_tos policy (for the PolicyAcceptanceStep). */
  getSeekerPolicy: () => Promise<SeekerPolicy>;
  /** Finish onboarding: register-seeker (+ policy + address) then refresh profile. */
  completeOnboarding: (data?: CompleteOnboardingData) => Promise<void>;
  refreshProfile: () => Promise<void>;
  logout: () => void;
}

const noopAsync = async () => {};
const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  login: () => {},
  sendOtp: noopAsync,
  verifyOtp: async () => ({ isNewUser: false, onboardingComplete: false }),
  getSeekerPolicy: async () => ({ code: "seeker_tos", version: "", title: "", content_md: "" }),
  completeOnboarding: noopAsync,
  refreshProfile: noopAsync,
  logout: () => {},
});

// ─── Backend response shapes (subset) ───
interface LoginOut {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user_id: string;
  phone_number: string;
  is_new_user: boolean;
}
interface ProfileOut {
  name?: string | null;
  email?: string | null;
  phone: string;
  avatar_url?: string | null;
  onboardingComplete: boolean;
  pendingPolicyAcceptance?: PendingPolicy | null;
}

function generateUid(phone: string): string {
  const random =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID().replace(/-/g, "").slice(0, 12)
      : Math.random().toString(36).slice(2, 14);
  return `user_${phone}_${random}`;
}

function toE164(phone: string): string {
  const digits = phone.replace(/\D/g, "").slice(-10);
  return `+91${digits}`;
}

function profileFromBackend(uid: string, p: ProfileOut): UserProfile {
  return {
    uid,
    phone: p.phone,
    name: p.name ?? undefined,
    email: p.email ?? undefined,
    onboardingComplete: p.onboardingComplete,
    pendingPolicyAcceptance: p.pendingPolicyAcceptance ?? null,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Firebase OTP state (real mode)
  const confirmationRef = useRef<ConfirmationResult | null>(null);
  const verifierRef = useRef<ReturnType<typeof createRecaptcha> | null>(null);

  const persistMockSession = (u: User) => {
    if (u) localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    else localStorage.removeItem(SESSION_KEY);
  };
  const persistMockProfile = (p: UserProfile | null) => {
    if (p) localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
    else localStorage.removeItem(PROFILE_KEY);
  };

  // ── Hydrate on mount ──
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (USE_MOCK) {
          const s = localStorage.getItem(SESSION_KEY);
          const p = localStorage.getItem(PROFILE_KEY);
          if (s) setUser(JSON.parse(s));
          if (p) setProfile(JSON.parse(p));
          return;
        }
        if (hasSession()) {
          const uid = localStorage.getItem(UID_KEY) || "";
          const prof = await fetchJson<ProfileOut>("/auth/profile");
          if (!cancelled) {
            setUser({ uid, phoneNumber: prof.phone });
            setProfile(profileFromBackend(uid, prof));
          }
        }
      } catch {
        // Corrupted/expired session — start clean.
        clearTokens();
        localStorage.removeItem(UID_KEY);
        localStorage.removeItem(SESSION_KEY);
        localStorage.removeItem(PROFILE_KEY);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // ── React to a dead session (apiClient dispatches this after refresh fails) ──
  useEffect(() => {
    const onUnauthorized = () => doLogout();
    window.addEventListener("easecare:unauthorized", onUnauthorized);
    return () => window.removeEventListener("easecare:unauthorized", onUnauthorized);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── login (mock fake session / real no-op) ──
  const login = useCallback((phone: string) => {
    if (!USE_MOCK) {
      logger.debug("login() is a no-op in real mode; use sendOtp/verifyOtp");
      return;
    }
    const uid = generateUid(phone);
    const newUser: User = { uid, phoneNumber: phone };
    const isKnown = phone === SKIP_ONBOARDING_PHONE;
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
    } catch {
      /* noop */
    }
    const newProfile: UserProfile = {
      uid,
      phone,
      onboardingComplete: isKnown || (returningData.onboardingComplete ?? false),
      ...(isKnown ? { name: "EaseCare User" } : returningData),
    };
    setUser(newUser);
    setProfile(newProfile);
    persistMockSession(newUser);
    persistMockProfile(newProfile);
  }, []);

  // ── sendOtp ──
  const sendOtp = useCallback(async (phone: string) => {
    if (USE_MOCK || !isFirebaseConfigured) {
      // Offline demo: no real SMS; verifyOtp accepts any 6 digits.
      return;
    }
    // reCAPTCHA tokens are single-use — recreate the verifier each send.
    if (verifierRef.current) {
      try {
        verifierRef.current.clear();
      } catch {
        /* ignore */
      }
      verifierRef.current = null;
    }
    const verifier = createRecaptcha(RECAPTCHA_CONTAINER_ID);
    verifierRef.current = verifier;
    confirmationRef.current = await fbSendOtp(toE164(phone), verifier);
  }, []);

  // ── verifyOtp ──
  const verifyOtp = useCallback(async (code: string, phone: string) => {
    if (USE_MOCK || !isFirebaseConfigured) {
      // Mock: reuse the legacy fake-session logic.
      login(phone);
      const complete = phone === SKIP_ONBOARDING_PHONE;
      return { isNewUser: !complete, onboardingComplete: complete };
    }

    const confirmation = confirmationRef.current;
    if (!confirmation) throw new Error("Please request an OTP first.");
    const cred = await confirmation.confirm(code);
    const idToken = await cred.user.getIdToken();

    const res = await fetchJson<LoginOut>("/auth/firebase-login", {
      method: "POST",
      body: JSON.stringify({ firebase_id_token: idToken }),
    });
    setTokens({
      accessToken: res.access_token,
      refreshToken: res.refresh_token,
      expiresIn: res.expires_in,
    });
    localStorage.setItem(UID_KEY, res.user_id);

    const prof = await fetchJson<ProfileOut>("/auth/profile");
    setUser({ uid: res.user_id, phoneNumber: res.phone_number });
    setProfile(profileFromBackend(res.user_id, prof));
    return { isNewUser: res.is_new_user, onboardingComplete: prof.onboardingComplete };
  }, [login]);

  // ── getSeekerPolicy ──
  const getSeekerPolicy = useCallback(async (): Promise<SeekerPolicy> => {
    if (USE_MOCK || !isFirebaseConfigured) {
      return {
        code: "seeker_tos",
        version: "demo-1",
        title: "Terms of Service",
        content_md: "Demo mode — terms acceptance is simulated.",
      };
    }
    return fetchJson<SeekerPolicy>("/policies/active/seeker_tos");
  }, []);

  // ── completeOnboarding ──
  const completeOnboarding = useCallback(async (data?: CompleteOnboardingData) => {
    if (USE_MOCK || !isFirebaseConfigured) {
      setProfile((prev) => {
        if (!prev) return prev;
        const updated: UserProfile = { ...prev, ...data, onboardingComplete: true };
        persistMockProfile(updated);
        return updated;
      });
      return;
    }

    await fetchJson<ProfileOut>("/auth/register-seeker", {
      method: "POST",
      body: JSON.stringify({
        name: data?.name ?? "",
        email: data?.email || null,
        relationship: data?.relationship || null,
        policy_version: data?.policyVersion,
      }),
    });

    if (data?.location) {
      try {
        await fetchJson("/addresses", {
          method: "POST",
          body: JSON.stringify({
            label: "Home",
            icon: "home",
            address: data.location,
            coords: [0, 0],
          }),
        });
      } catch (e) {
        logger.warn("Failed to save onboarding address (non-fatal)", e);
      }
    }

    await refreshProfile();
    // Merge client-only fields (gender/relationship/location) the backend doesn't return.
    setProfile((prev) =>
      prev
        ? {
            ...prev,
            gender: data?.gender ?? prev.gender,
            relationship: data?.relationship ?? prev.relationship,
            location: data?.location ?? prev.location,
          }
        : prev,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── refreshProfile ──
  const refreshProfile = useCallback(async () => {
    if (USE_MOCK || !isFirebaseConfigured) {
      try {
        const stored = localStorage.getItem(PROFILE_KEY);
        if (stored) setProfile(JSON.parse(stored));
      } catch {
        /* noop */
      }
      return;
    }
    try {
      const uid = localStorage.getItem(UID_KEY) || user?.uid || "";
      const prof = await fetchJson<ProfileOut>("/auth/profile");
      setUser((u) => u ?? { uid, phoneNumber: prof.phone });
      setProfile(profileFromBackend(uid, prof));
    } catch (e) {
      logger.warn("refreshProfile failed", e);
    }
  }, [user?.uid]);

  // ── logout ──
  const doLogout = useCallback(() => {
    setUser(null);
    setProfile(null);
    clearTokens();
    localStorage.removeItem(UID_KEY);
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(PROFILE_KEY);
    confirmationRef.current = null;
    if (!USE_MOCK) void firebaseSignOut();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        login,
        sendOtp,
        verifyOtp,
        getSeekerPolicy,
        completeOnboarding,
        refreshProfile,
        logout: doLogout,
      }}
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
