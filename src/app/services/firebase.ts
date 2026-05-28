// ─── Firebase Phone Auth (OTP) ───
//
// Ported from ease-care-ui-design/src/app/services/firebase.ts.
// Lazy-initialised: the SDK is only touched when a real config is present and a
// send/verify actually runs, so VITE_USE_MOCK / offline dev never loads Firebase.
// INTEGRATION-owned.

import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
  type Auth,
  type ConfirmationResult,
} from "firebase/auth";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

/** True when a real Firebase web config is present (not missing/placeholder). */
export const isFirebaseConfigured = !!apiKey && apiKey !== "your-firebase-api-key";

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;

function ensureAuth(): Auth {
  if (!_auth) {
    _app = initializeApp({
      apiKey,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    });
    _auth = getAuth(_app);
  }
  return _auth;
}

/** Create an invisible reCAPTCHA verifier bound to a container element id. */
export function createRecaptcha(containerId: string): RecaptchaVerifier {
  return new RecaptchaVerifier(ensureAuth(), containerId, { size: "invisible" });
}

/**
 * Send an OTP to a phone number (E.164, e.g. "+919876543210").
 * Returns a ConfirmationResult used to verify the entered code.
 */
export async function sendOtp(
  phone: string,
  verifier: RecaptchaVerifier,
): Promise<ConfirmationResult> {
  const auth = ensureAuth();
  // Seeker/provider OTP must always use real reCAPTCHA (the admin login screen
  // may flip this flag elsewhere). Reset before use.
  auth.settings.appVerificationDisabledForTesting = false;
  return signInWithPhoneNumber(auth, phone, verifier);
}

/** Sign out of Firebase (best-effort; safe if never initialised). */
export async function firebaseSignOut(): Promise<void> {
  if (_auth) {
    try {
      await signOut(_auth);
    } catch {
      /* ignore */
    }
  }
}

export type { ConfirmationResult };
