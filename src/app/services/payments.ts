// ─── Razorpay payments ───
//
// Mirrors ease-care-ui-design's paymentsApi + the backend schemas
// (CreateOrderIn/Out, VerifyPaymentIn/Out, package checkout/confirm).
//
// Money-path rules baked in (see the Phase-4 premortem):
//  - The backend owns booking creation: create-order auto-creates the Order
//    (payment_service._resolve_order → SVC-… ) and verify/accept confirm it.
//    The frontend NEVER writes the booking itself.
//  - Server `verify` (HMAC) is the ONLY success signal. The Razorpay `handler`
//    firing is not sufficient.
//  - amount is sent in RUPEES to create-order; Razorpay is charged the paise
//    `amount` returned by the backend.
//  - key_id always comes from the order response (never hardcoded).
// INTEGRATION-owned.

import { fetchJson } from "./apiClient";

export interface CreateOrderResult {
  order_id: string; // Razorpay order id (for the SDK)
  db_order_id?: string; // backend Order UUID
  amount: number; // paise
  currency: string;
  key_id: string;
  expire_by?: number | null; // unix seconds
}

export interface VerifyResult {
  verified: boolean;
  transaction_id?: string;
  error?: string;
  already_verified?: boolean;
}

/** POST /payments/create-order — amount in RUPEES. */
export function createOrder(data: {
  booking_id: string;
  amount: number;
  manual_capture?: boolean;
}): Promise<CreateOrderResult> {
  return fetchJson<CreateOrderResult>("/payments/create-order", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/** POST /payments/verify — the authoritative success check (HMAC verified server-side). */
export function verifyPayment(data: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}): Promise<VerifyResult> {
  return fetchJson<VerifyResult>("/payments/verify", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ─── Care-package purchase (separate backend flow) ───

export interface PackageCheckoutResult {
  order_id: string;
  order_number?: string;
  razorpay_order_id: string;
  amount_paise: number;
  currency: string;
  key_id: string;
}

/** POST /packages/{id}/checkout — start a package purchase (creates Order + Razorpay order). */
export function packageCheckout(
  packageId: string,
  body: { activation_date?: string },
): Promise<PackageCheckoutResult> {
  return fetchJson<PackageCheckoutResult>(
    `/packages/${encodeURIComponent(packageId)}/checkout`,
    { method: "POST", body: JSON.stringify(body) },
  );
}

/** POST /packages/{id}/confirm — verify payment + create the PackagePurchase. */
export function packageConfirm(
  packageId: string,
  body: { order_id: string; razorpay_payment_id: string; razorpay_signature: string },
): Promise<Record<string, unknown>> {
  return fetchJson<Record<string, unknown>>(
    `/packages/${encodeURIComponent(packageId)}/confirm`,
    { method: "POST", body: JSON.stringify(body) },
  );
}

/** True once the Razorpay Checkout SDK (loaded in index.html) is available. */
export function isRazorpayAvailable(): boolean {
  return typeof window !== "undefined" && !!window.Razorpay;
}

export interface RazorpaySuccess {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

/**
 * Open Razorpay Checkout. Returns false if the SDK/key isn't available so the
 * caller can show a graceful "gateway unavailable" error (never a fake success).
 * `onSuccess` receives the Razorpay response — the caller MUST then call
 * verifyPayment() before treating the payment as complete.
 */
export function openRazorpayCheckout(args: {
  keyId: string;
  amount: number; // paise
  currency: string;
  orderId: string; // Razorpay order id
  name?: string;
  description?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  onSuccess: (r: RazorpaySuccess) => void | Promise<void>;
  onDismiss?: () => void;
  onFailed?: () => void;
}): boolean {
  if (!args.keyId || typeof window === "undefined" || !window.Razorpay) return false;
  const rzp = new window.Razorpay({
    key: args.keyId,
    amount: args.amount,
    currency: args.currency,
    order_id: args.orderId,
    name: args.name ?? "EaseCare",
    description: args.description ?? "Care Service Payment",
    prefill: args.prefill,
    handler: (response: unknown) => {
      void args.onSuccess(response as RazorpaySuccess);
    },
    modal: { ondismiss: () => args.onDismiss?.() },
    theme: { color: "#1975d2" },
  });
  rzp.on("payment.failed", () => args.onFailed?.());
  rzp.open();
  return true;
}
