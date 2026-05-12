// ─── EaseCare API Client (Local-Only / Frontend Demo) ───
// All data is persisted to localStorage. No backend calls.

// ─── Helpers ───
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function lsGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function lsSet(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Returns false when the browser reports it is offline.
 * In local/demo mode all "API" calls are localStorage operations,
 * so the only real failure mode is the browser being offline.
 */
export function isApiReachable(): boolean {
  return typeof navigator === "undefined" || navigator.onLine !== false;
}

/** No-op warmup */
export function warmUp(): Promise<void> {
  return Promise.resolve();
}

// ─── Types ───
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
}

// ─── localStorage keys ───
const KEYS = {
  bookings: "ec_bookings",
  requirements: "ec_requirements",
  transactions: "ec_transactions",
  addresses: "ec_addresses",
  profile: "ec_profile",
  issues: "ec_issues",
} as const;

// ─── Bookings ───
export const bookingsApi = {
  async getAll(): Promise<BookingRecord[]> {
    return lsGet<BookingRecord[]>(KEYS.bookings, []);
  },

  async getById(id: string): Promise<BookingRecord | null> {
    const all = lsGet<BookingRecord[]>(KEYS.bookings, []);
    return all.find((b) => b.bookingId === id) || null;
  },

  async save(booking: BookingRecord): Promise<void> {
    const all = lsGet<BookingRecord[]>(KEYS.bookings, []);
    const idx = all.findIndex((b) => b.bookingId === booking.bookingId);
    if (idx >= 0) all[idx] = booking;
    else all.push(booking);
    lsSet(KEYS.bookings, all);
  },

  async remove(id: string): Promise<void> {
    const all = lsGet<BookingRecord[]>(KEYS.bookings, []);
    lsSet(KEYS.bookings, all.filter((b) => b.bookingId !== id));
  },
};

// ─── Requirements ───
export const requirementsApi = {
  async getAll(): Promise<RequirementRecord[]> {
    return lsGet<RequirementRecord[]>(KEYS.requirements, []);
  },

  async save(req: RequirementRecord): Promise<void> {
    const all = lsGet<RequirementRecord[]>(KEYS.requirements, []);
    const idx = all.findIndex((r) => r.reqId === req.reqId);
    if (idx >= 0) all[idx] = req;
    else all.push(req);
    lsSet(KEYS.requirements, all);
  },

  async remove(id: string): Promise<void> {
    const all = lsGet<RequirementRecord[]>(KEYS.requirements, []);
    lsSet(KEYS.requirements, all.filter((r) => r.reqId !== id));
  },
};

// ─── Transactions ───
export const transactionsApi = {
  async getAll(): Promise<TransactionRecord[]> {
    return lsGet<TransactionRecord[]>(KEYS.transactions, []);
  },

  async save(txn: TransactionRecord): Promise<void> {
    const all = lsGet<TransactionRecord[]>(KEYS.transactions, []);
    const idx = all.findIndex((t) => t.transactionId === txn.transactionId);
    if (idx >= 0) all[idx] = txn;
    else all.push(txn);
    lsSet(KEYS.transactions, all);
  },
};

// ─── Addresses ───
export const addressesApi = {
  async getAll(): Promise<AddressRecord[]> {
    return lsGet<AddressRecord[]>(KEYS.addresses, []);
  },

  async save(addr: AddressRecord): Promise<void> {
    const all = lsGet<AddressRecord[]>(KEYS.addresses, []);
    const idx = all.findIndex((a) => a.id === addr.id);
    if (idx >= 0) all[idx] = addr;
    else all.push(addr);
    lsSet(KEYS.addresses, all);
  },

  async remove(id: string): Promise<void> {
    const all = lsGet<AddressRecord[]>(KEYS.addresses, []);
    lsSet(KEYS.addresses, all.filter((a) => a.id !== id));
  },
};

// ─── User Profile ───
export const profileApi = {
  async get(): Promise<Record<string, unknown> | null> {
    return lsGet<Record<string, unknown> | null>(KEYS.profile, null);
  },

  async save(profile: Record<string, unknown>): Promise<void> {
    lsSet(KEYS.profile, profile);
  },
};

// ─── Promo Codes ───
const VALID_PROMOS: Record<string, { discount: number; label: string }> = {
  WELCOME15: { discount: 15, label: "WELCOME15" },
  EASECARE20: { discount: 20, label: "EASECARE20" },
  CARE100: { discount: 0, label: "CARE100" },
  FESTIVE10: { discount: 10, label: "FESTIVE10" },
};

export const promoApi = {
  async validate(code: string): Promise<{
    valid: boolean;
    discount?: number;
    label?: string;
    message?: string;
  }> {
    await delay(600 + Math.random() * 400);
    const match = VALID_PROMOS[code.trim().toUpperCase()];
    if (match) return { valid: true, discount: match.discount, label: match.label };
    return { valid: false, message: "This code has expired or is invalid" };
  },
};

// ─── UPI Verification ───
export const upiApi = {
  async verify(upiId: string): Promise<{
    verified: boolean;
    name?: string;
    message?: string;
  }> {
    await delay(800 + Math.random() * 400);
    if (upiId.includes("@") && upiId.indexOf("@") > 0) {
      const names = ["Priya Sharma", "Rahul Verma", "Anita Das", "Vikram Singh"];
      return { verified: true, name: names[Math.floor(Math.random() * names.length)] };
    }
    return { verified: false, message: "UPI ID not found" };
  },
};

// ─── Payments ───
export const paymentsApi = {
  async process(
    _paymentDetails: Record<string, unknown>,
    _bookingDetails: Record<string, unknown>
  ): Promise<{
    status: "success" | "failed";
    transactionId?: string;
    timestamp?: string;
    reason?: string;
  }> {
    await delay(1500 + Math.random() * 1000);
    return {
      status: "success",
      transactionId: `TXN${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      timestamp: new Date().toISOString(),
    };
  },
};

// ─── Receipts ───
export const receiptsApi = {
  async generate(bookingId: string): Promise<{
    receiptUrl: string;
    fileName: string;
  }> {
    await delay(400);
    return {
      receiptUrl: `data:text/plain;charset=utf-8,Receipt for booking ${bookingId}`,
      fileName: `Easecare_Receipt_${bookingId}.pdf`,
    };
  },
};

// ─── Issues / Support Tickets ───
export interface IssueRecord {
  id?: string;
  bookingId: string;
  category: string;
  priority: string;
  description: string;
  evidenceUrls?: string[];
  providerName?: string;
  status?: string;
  createdAt?: string;
}

export const issuesApi = {
  async getAll(): Promise<IssueRecord[]> {
    return lsGet<IssueRecord[]>(KEYS.issues, []);
  },

  async create(issue: Omit<IssueRecord, "id" | "status" | "createdAt">): Promise<{ id: string }> {
    const id = `ISS${Date.now().toString(36).toUpperCase()}`;
    const record: IssueRecord = {
      ...issue,
      id,
      status: "open",
      createdAt: new Date().toISOString(),
    };
    const all = lsGet<IssueRecord[]>(KEYS.issues, []);
    all.push(record);
    lsSet(KEYS.issues, all);
    return { id };
  },
};

// ─── Questionnaire Responses ───
export const questionnaireApi = {
  async save(data: Record<string, unknown>): Promise<{ id: string }> {
    const id = `Q${Date.now().toString(36).toUpperCase()}`;
    // Store in localStorage for reference
    const all = lsGet<Record<string, unknown>[]>("ec_questionnaires", []);
    all.push({ ...data, id, createdAt: new Date().toISOString() });
    lsSet("ec_questionnaires", all);
    return { id };
  },
};
