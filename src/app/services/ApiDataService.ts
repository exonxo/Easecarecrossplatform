// ─── ApiDataService — real-backend implementation of IDataService ───
//
// Maps each IDataService method to an ease-care-backend endpoint (all under
// /api/v1, same-origin via the LB). Record shapes already match the backend
// response schemas (see types.ts), so responses are returned as-is.
//
// Selected behind the VITE_USE_MOCK flag in DataService.ts. INTEGRATION-owned.
//
// Notes on semantics vs. the localStorage mock:
//  - saveTransaction: NO-OP. The backend creates Transaction rows during payment
//    verification (POST /payments/verify); the seeker client never POSTs them.
//  - processPayment: maps to the simulated POST /payments/process (403 in prod).
//    The real Razorpay flow (create-order → SDK → verify) is wired directly in
//    PaymentFlow in Phase 4, not through this method.
//  - save* upserts: create when no server id is present, else update.

import type { IDataService } from "./DataService";
import type {
  AddressRecord,
  BookingRecord,
  IssueRecord,
  PaymentResult,
  PromoValidateResult,
  ReceiptResult,
  RequirementRecord,
  TransactionRecord,
  UpiVerifyResult,
} from "./types";
import { fetchJson } from "./apiClient";
import { logger } from "../lib/logger";

/** True for a backend-assigned UUID id (vs a transient client id like Date.now()). */
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function isServerId(id: string): boolean {
  return UUID_RE.test(id);
}

export class ApiDataService implements IDataService {
  // ─── Bookings ───
  getBookings(): Promise<BookingRecord[]> {
    return fetchJson<BookingRecord[]>("/bookings");
  }

  async getBookingById(id: string): Promise<BookingRecord | null> {
    try {
      return await fetchJson<BookingRecord>(`/bookings/${encodeURIComponent(id)}`);
    } catch {
      return null;
    }
  }

  async saveBooking(booking: BookingRecord): Promise<void> {
    // Direct (fixed-price) service booking. Bid-accept and package-confirm
    // create bookings through their own endpoints (wired in Phase 4).
    await fetchJson<BookingRecord>("/bookings", {
      method: "POST",
      body: JSON.stringify({
        providerName: booking.providerName,
        providerPhoto: booking.providerPhoto,
        service: booking.service,
        rating: booking.rating,
        agency: booking.agency,
        verified: booking.verified,
        serviceType: booking.serviceType,
        startDate: booking.startDate,
        startTime: booking.startTime,
        duration: booking.duration,
        durationDays: booking.durationDays,
        location: booking.location,
        dailyRate: booking.dailyRate,
        paymentMethod: booking.paymentMethod,
        transactionId: booking.transactionId,
      }),
    });
  }

  async removeBooking(id: string): Promise<void> {
    await fetchJson<void>(`/bookings/${encodeURIComponent(id)}`, { method: "DELETE" });
  }

  // ─── Requirements ───
  getRequirements(): Promise<RequirementRecord[]> {
    return fetchJson<RequirementRecord[]>("/requirements");
  }

  async saveRequirement(req: RequirementRecord): Promise<void> {
    if (req.reqId && isServerId(req.reqId)) {
      await fetchJson<RequirementRecord>(`/requirements/${encodeURIComponent(req.reqId)}`, {
        method: "PUT",
        body: JSON.stringify({
          budget: req.budget,
          duration: req.duration,
          language: req.language,
        }),
      });
      return;
    }
    await fetchJson<RequirementRecord>("/requirements", {
      method: "POST",
      body: JSON.stringify({
        service: req.service,
        careFor: req.careFor,
        duration: req.duration,
        budget: req.budget,
        language: req.language,
      }),
    });
  }

  async removeRequirement(id: string): Promise<void> {
    await fetchJson<void>(`/requirements/${encodeURIComponent(id)}`, { method: "DELETE" });
  }

  // ─── Transactions ───
  getTransactions(): Promise<TransactionRecord[]> {
    return fetchJson<TransactionRecord[]>("/transactions");
  }

  async saveTransaction(_txn: TransactionRecord): Promise<void> {
    // No-op: the backend creates transactions during payment verification.
    logger.debug("saveTransaction is a no-op against the real backend");
  }

  // ─── Addresses ───
  getAddresses(): Promise<AddressRecord[]> {
    return fetchJson<AddressRecord[]>("/addresses");
  }

  async saveAddress(addr: AddressRecord): Promise<void> {
    const body = JSON.stringify({
      label: addr.label,
      icon: addr.icon,
      address: addr.address,
      coords: addr.coords,
      isDefault: addr.isDefault,
      house: addr.house,
      area: addr.area,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      country: addr.country,
    });
    // The backend assigns UUID ids. The UI generates a transient numeric id
    // (Date.now()) for brand-new addresses → treat anything that isn't a server
    // UUID as a create (POST); a real UUID is an update (PUT).
    if (addr.id && isServerId(addr.id)) {
      await fetchJson<AddressRecord>(`/addresses/${encodeURIComponent(addr.id)}`, {
        method: "PUT",
        body,
      });
      return;
    }
    await fetchJson<AddressRecord>("/addresses", { method: "POST", body });
  }

  async removeAddress(id: string): Promise<void> {
    await fetchJson<void>(`/addresses/${encodeURIComponent(id)}`, { method: "DELETE" });
  }

  // ─── Profile ───
  async getProfile(): Promise<Record<string, unknown> | null> {
    try {
      return await fetchJson<Record<string, unknown>>("/auth/profile");
    } catch {
      return null;
    }
  }

  async saveProfile(profile: Record<string, unknown>): Promise<void> {
    await fetchJson<Record<string, unknown>>("/auth/profile", {
      method: "PUT",
      body: JSON.stringify({
        name: profile.name,
        email: profile.email,
        relationship: profile.relationship,
        location: profile.location,
      }),
    });
  }

  // ─── Promo / UPI / Payments / Receipts ───
  validatePromoCode(code: string): Promise<PromoValidateResult> {
    return fetchJson<PromoValidateResult>("/promo/validate", {
      method: "POST",
      body: JSON.stringify({ code }),
    });
  }

  verifyUpiId(upiId: string): Promise<UpiVerifyResult> {
    return fetchJson<UpiVerifyResult>("/upi/verify", {
      method: "POST",
      body: JSON.stringify({ upiId }),
    });
  }

  processPayment(
    paymentDetails: Record<string, unknown>,
    bookingDetails: Record<string, unknown>,
  ): Promise<PaymentResult> {
    return fetchJson<PaymentResult>("/payments/process", {
      method: "POST",
      body: JSON.stringify({ paymentDetails, bookingDetails }),
    });
  }

  generateReceipt(bookingId: string): Promise<ReceiptResult> {
    return fetchJson<ReceiptResult>("/receipts/generate", {
      method: "POST",
      body: JSON.stringify({ bookingId }),
    });
  }

  // ─── Issues ───
  getIssues(): Promise<IssueRecord[]> {
    return fetchJson<IssueRecord[]>("/issues");
  }

  createIssue(
    issue: Omit<IssueRecord, "id" | "status" | "createdAt">,
  ): Promise<{ id: string }> {
    return fetchJson<{ id: string }>("/issues", {
      method: "POST",
      body: JSON.stringify({
        bookingId: issue.bookingId,
        category: issue.category,
        priority: issue.priority,
        description: issue.description,
        evidenceUrls: issue.evidenceUrls,
        providerName: issue.providerName,
      }),
    });
  }

  // ─── Questionnaire ───
  saveQuestionnaire(data: Record<string, unknown>): Promise<{ id: string }> {
    return fetchJson<{ id: string }>("/questionnaire", {
      method: "POST",
      body: JSON.stringify({ data }),
    });
  }
}
