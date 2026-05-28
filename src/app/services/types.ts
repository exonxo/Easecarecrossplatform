// ─── EaseCare canonical data types (Pydantic ↔ TypeScript contract) ───
//
// These mirror the ease-care-backend response schemas (see
// ease-care-backend/src/app/schemas/*.py — the backend docstrings literally say
// "Matches frontend X shape exactly"). They are the single source of truth for
// the record shapes used by BOTH the localStorage mock (`api.ts`) and the real
// `ApiDataService`. Keep this module INTEGRATION-owned and stable — design
// (Figma Make) re-exports must never regenerate it. Extra optional fields below
// are backend additions that older mock data simply omits (non-breaking).

/** Package block on a booking created from a care-package checkout (PKG- orders). */
export interface BookingPackageBlock {
  package_id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  duration_days: number;
  price_paise: number;
  highlights: string[] | null;
  included: string[] | null;
  features: string[] | null;
  activation_date: string | null;
  expiry_date: string | null;
  days_remaining: number | null;
  can_cancel: boolean;
}

export interface BookingRecord {
  bookingId: string;
  providerName: string;
  providerPhoto: string;
  service: string;
  rating: number;
  agency: string;
  verified: boolean;
  serviceType: string;
  startDate: string;
  startTime: string;
  duration: string;
  durationDays: number;
  location: string;
  dailyRate: number;
  totalPaid: number;
  paymentMethod: string;
  transactionId: string;
  status: "confirmed" | "ongoing" | "completed" | "cancelled";
  createdAt?: string;
  // Backend extras (optional — mock data omits them):
  providerPhone?: string | null;
  providerUserId?: string | null; // for conversation creation
  package?: BookingPackageBlock | null;
}

export interface RequirementRecord {
  reqId: string;
  service: string;
  careFor: string;
  duration: string;
  budget: string;
  language: string;
  status: "active" | "pending" | "expired";
  createdAt?: string;
  // Backend extras surfaced for the seeker dashboard (optional):
  recipientAge?: number | null;
  description?: string | null;
  durationDays?: number | null;
  startDate?: string | null;
  startTime?: string | null;
  locationCity?: string | null;
  locationArea?: string | null;
  budgetMin?: number | null;
  budgetMax?: number | null;
  shift?: string | null;
  specialNotes?: string | null;
  bidCount?: number;
  bidCountAccepted?: number;
  bidCountRejected?: number;
  bidCountPending?: number;
  expiresAt?: string | null;
}

export interface TransactionRecord {
  transactionId: string;
  bookingId: string;
  amount: number;
  paymentMethod: string;
  status: "success" | "failed" | "refunded";
  providerName: string;
  service: string;
  createdAt?: string;
}

export interface AddressRecord {
  id: string;
  label: string;
  icon: "home" | "work" | "favorite" | "other";
  address: string;
  coords: [number, number];
  isDefault?: boolean;
  createdAt?: string;
  // #509 granular fields (backend AddressRecordOut; optional for mock):
  house?: string | null;
  area?: string | null;
  city?: string | null;
  state?: string | null;
  pincode?: string | null;
  country?: string | null;
}

export interface IssueRecord {
  id?: string;
  // Kept required to match the existing mock contract (backend accepts null and
  // ApiDataService coerces). Do not widen — components read it as a string.
  bookingId: string;
  category: string;
  priority: string;
  description: string;
  evidenceUrls?: string[];
  providerName?: string;
  status?: string;
  createdAt?: string;
}

// ─── Small result types (mirror backend payment/promo/upi/receipt schemas) ───

export interface PromoValidateResult {
  valid: boolean;
  discount?: number;
  label?: string;
  message?: string;
}

export interface UpiVerifyResult {
  verified: boolean;
  name?: string;
  message?: string;
}

export interface PaymentResult {
  status: "success" | "failed";
  transactionId?: string;
  timestamp?: string;
  reason?: string;
}

export interface ReceiptResult {
  receiptUrl: string;
  fileName: string;
}
