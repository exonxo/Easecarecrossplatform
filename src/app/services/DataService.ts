// ─── EaseCare Data Service (Local-Only / Frontend Demo) ───
// All data flows through localStorage. No backend dependency.

import {
  bookingsApi,
  requirementsApi,
  transactionsApi,
  addressesApi,
  profileApi,
  promoApi,
  upiApi,
  paymentsApi,
  receiptsApi,
  issuesApi,
  questionnaireApi,
  type BookingRecord,
  type RequirementRecord,
  type TransactionRecord,
  type AddressRecord,
  type IssueRecord,
} from "./api";
import { ApiDataService } from "./ApiDataService";

// ─── DataService Interface ───

export interface IDataService {
  // Bookings
  getBookings(): Promise<BookingRecord[]>;
  getBookingById(id: string): Promise<BookingRecord | null>;
  saveBooking(booking: BookingRecord): Promise<void>;
  removeBooking(id: string): Promise<void>;

  // Requirements
  getRequirements(): Promise<RequirementRecord[]>;
  saveRequirement(req: RequirementRecord): Promise<void>;
  removeRequirement(id: string): Promise<void>;

  // Transactions
  getTransactions(): Promise<TransactionRecord[]>;
  saveTransaction(txn: TransactionRecord): Promise<void>;

  // Addresses
  getAddresses(): Promise<AddressRecord[]>;
  saveAddress(addr: AddressRecord): Promise<void>;
  removeAddress(id: string): Promise<void>;

  // User Profile
  getProfile(): Promise<Record<string, unknown> | null>;
  saveProfile(profile: Record<string, unknown>): Promise<void>;

  // Promo Codes
  validatePromoCode(code: string): Promise<{
    valid: boolean;
    discount?: number;
    label?: string;
    message?: string;
  }>;

  // UPI Verification
  verifyUpiId(upiId: string): Promise<{
    verified: boolean;
    name?: string;
    message?: string;
  }>;

  // Payments
  processPayment(
    paymentDetails: Record<string, unknown>,
    bookingDetails: Record<string, unknown>
  ): Promise<{
    status: "success" | "failed";
    transactionId?: string;
    timestamp?: string;
    reason?: string;
  }>;

  // Receipts
  generateReceipt(bookingId: string): Promise<{
    receiptUrl: string;
    fileName: string;
  }>;

  // Issues
  getIssues(): Promise<IssueRecord[]>;
  createIssue(issue: Omit<IssueRecord, "id" | "status" | "createdAt">): Promise<{ id: string }>;

  // Questionnaire
  saveQuestionnaire(data: Record<string, unknown>): Promise<{ id: string }>;
}

// ─── Local Implementation ───

class LocalDataService implements IDataService {
  getBookings = () => bookingsApi.getAll();
  getBookingById = (id: string) => bookingsApi.getById(id);
  saveBooking = (booking: BookingRecord) => bookingsApi.save(booking);
  removeBooking = (id: string) => bookingsApi.remove(id);

  getRequirements = () => requirementsApi.getAll();
  saveRequirement = (req: RequirementRecord) => requirementsApi.save(req);
  removeRequirement = (id: string) => requirementsApi.remove(id);

  getTransactions = () => transactionsApi.getAll();
  saveTransaction = (txn: TransactionRecord) => transactionsApi.save(txn);

  getAddresses = () => addressesApi.getAll();
  saveAddress = (addr: AddressRecord) => addressesApi.save(addr);
  removeAddress = (id: string) => addressesApi.remove(id);

  getProfile = () => profileApi.get();
  saveProfile = (profile: Record<string, unknown>) => profileApi.save(profile);

  validatePromoCode = (code: string) => promoApi.validate(code);
  verifyUpiId = (upiId: string) => upiApi.verify(upiId);

  processPayment = (
    paymentDetails: Record<string, unknown>,
    bookingDetails: Record<string, unknown>
  ) => paymentsApi.process(paymentDetails, bookingDetails);

  generateReceipt = (bookingId: string) => receiptsApi.generate(bookingId);

  getIssues = () => issuesApi.getAll();
  createIssue = (issue: Omit<IssueRecord, "id" | "status" | "createdAt">) =>
    issuesApi.create(issue);

  saveQuestionnaire = (data: Record<string, unknown>) => questionnaireApi.save(data);
}

// ─── Active Service ───
// Default = real backend (ApiDataService). Set VITE_USE_MOCK="true" for an
// offline/local demo backed by localStorage (LocalDataService).
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const dataService: IDataService = USE_MOCK
  ? new LocalDataService()
  : new ApiDataService();

// Re-export types for convenience
export type {
  BookingRecord,
  RequirementRecord,
  TransactionRecord,
  AddressRecord,
  IssueRecord,
};
