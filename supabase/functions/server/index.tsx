import { Hono } from "npm:hono@4";
import { cors } from "npm:hono@4/cors";
import { logger } from "npm:hono@4/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Logging
app.use("*", logger(console.log));

// CORS
app.use(
  "*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  })
);

// Global error handler
app.onError((err, c) => {
  console.log(`[Server] Unhandled error: ${err.message}`);
  return c.json({ error: `Internal server error: ${err.message}` }, 500);
});

const P = "/make-server-dd96299e";

// ─── Health ───
app.get(`${P}/health`, (c) => c.json({ status: "ok" }));

// ══════════════════════════════════════════════
// PROMO CODES
// ══════════════════════════════════════════════

const VALID_PROMO_CODES: Record<string, { discount: number; label: string }> = {
  WELCOME15: { discount: 15, label: "WELCOME15" },
  EASYCARE20: { discount: 20, label: "EASYCARE20" },
  CARE100: { discount: 0, label: "CARE100" }, // flat discount handled by caller
  FESTIVE10: { discount: 10, label: "FESTIVE10" },
};

app.post(`${P}/promo/validate`, async (c) => {
  try {
    const { code } = await c.req.json();
    if (!code) return c.json({ valid: false, message: "No code provided" });
    const upper = String(code).trim().toUpperCase();
    const match = VALID_PROMO_CODES[upper];
    if (match) {
      return c.json({ valid: true, discount: match.discount, label: match.label });
    }
    // Also check KV store for dynamic promo codes
    const dynamic = await kv.get(`promo:${upper}`);
    if (dynamic) {
      return c.json({ valid: true, ...dynamic });
    }
    return c.json({ valid: false, message: "This code has expired or is invalid" });
  } catch (err) {
    console.log(`[Promo] Validate error: ${err}`);
    return c.json({ error: `${err}` }, 500);
  }
});

// ══════════════════════════════════════════════
// UPI VERIFICATION
// ══════════════════════════════════════════════

app.post(`${P}/upi/verify`, async (c) => {
  try {
    const { upiId } = await c.req.json();
    if (!upiId || !String(upiId).includes("@") || String(upiId).indexOf("@") === 0) {
      return c.json({ verified: false, message: "UPI ID not found" });
    }
    // In production, this would call a UPI verification API
    // For now, simulate verification with a name lookup
    const names = ["Priya Sharma", "Rahul Verma", "Anita Das", "Vikram Singh"];
    const hash = String(upiId).split("").reduce((a, b) => a + b.charCodeAt(0), 0);
    return c.json({
      verified: true,
      name: names[hash % names.length],
    });
  } catch (err) {
    console.log(`[UPI] Verify error: ${err}`);
    return c.json({ error: `${err}` }, 500);
  }
});

// ══════════════════════════════════════════════
// PAYMENT PROCESSING
// ══════════════════════════════════════════════

app.post(`${P}/payments/process`, async (c) => {
  try {
    const { paymentDetails, bookingDetails } = await c.req.json();
    if (!paymentDetails || !bookingDetails) {
      return c.json({ error: "Missing paymentDetails or bookingDetails" }, 400);
    }

    // Simulate processing with a 15% failure rate (reduced from 20% for better UX)
    const shouldFail = Math.random() < 0.15;

    if (shouldFail) {
      // Log failed payment attempt
      const failedTxnId = `TXN${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
      await kv.set(`payment:${failedTxnId}`, {
        ...paymentDetails,
        bookingId: bookingDetails.bookingId,
        amount: bookingDetails.amount,
        status: "failed",
        reason: "Bank declined",
        createdAt: new Date().toISOString(),
      });
      return c.json({ status: "failed", reason: "Bank declined" });
    }

    const transactionId = `TXN${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    // Persist payment record
    await kv.set(`payment:${transactionId}`, {
      ...paymentDetails,
      transactionId,
      bookingId: bookingDetails.bookingId,
      amount: bookingDetails.amount,
      status: "success",
      createdAt: timestamp,
    });

    return c.json({ status: "success", transactionId, timestamp });
  } catch (err) {
    console.log(`[Payments] Process error: ${err}`);
    return c.json({ error: `${err}` }, 500);
  }
});

// ══════════════════════════════════════════════
// RECEIPT GENERATION
// ══════════════════════════════════════════════

app.get(`${P}/receipts/:bookingId`, async (c) => {
  try {
    const bookingId = c.req.param("bookingId");
    // In production, this would generate a PDF via an Edge Function
    // For now, return a receipt URL placeholder
    return c.json({
      receiptUrl: `https://easecare.app/receipts/${bookingId}.pdf`,
      fileName: `Easecare_Receipt_${bookingId}.pdf`,
    });
  } catch (err) {
    console.log(`[Receipts] Generate error: ${err}`);
    return c.json({ error: `${err}` }, 500);
  }
});

// ══════════════════════════════════════════════
// ISSUES / SUPPORT TICKETS
// ══════════════════════════════════════════════

app.post(`${P}/issues`, async (c) => {
  try {
    const body = await c.req.json();
    const id = `ISS-${Date.now().toString(36).toUpperCase()}`;
    await kv.set(`issue:${id}`, { ...body, id, status: "open", createdAt: new Date().toISOString() });
    console.log(`[Issues] Created ${id}`);
    return c.json({ success: true, id });
  } catch (err) {
    console.log(`[Issues] POST error: ${err}`);
    return c.json({ error: `${err}` }, 500);
  }
});

app.get(`${P}/issues`, async (c) => {
  try {
    const issues = await kv.getByPrefix("issue:");
    return c.json({ issues });
  } catch (err) {
    console.log(`[Issues] GET error: ${err}`);
    return c.json({ error: `${err}` }, 500);
  }
});

// ══════════════════════════════════════════════
// QUESTIONNAIRE RESPONSES
// ══════════════════════════════════════════════

app.post(`${P}/questionnaire`, async (c) => {
  try {
    const body = await c.req.json();
    const id = body.id || `QR-${Date.now().toString(36).toUpperCase()}`;
    await kv.set(`questionnaire:${id}`, { ...body, id, createdAt: new Date().toISOString() });
    console.log(`[Questionnaire] Saved ${id}`);
    return c.json({ success: true, id });
  } catch (err) {
    console.log(`[Questionnaire] POST error: ${err}`);
    return c.json({ error: `${err}` }, 500);
  }
});

// ══════════════════════════════════════════════
// BOOKINGS
// ══════════════════════════════════════════════

app.post(`${P}/bookings`, async (c) => {
  try {
    const body = await c.req.json();
    const { bookingId, ...rest } = body;
    if (!bookingId) return c.json({ error: "Missing bookingId" }, 400);
    await kv.set(`booking:${bookingId}`, { ...rest, bookingId, createdAt: new Date().toISOString() });
    console.log(`[Bookings] Saved ${bookingId}`);
    return c.json({ success: true, bookingId });
  } catch (err) {
    console.log(`[Bookings] POST error: ${err}`);
    return c.json({ error: `${err}` }, 500);
  }
});

app.get(`${P}/bookings`, async (c) => {
  try {
    const bookings = await kv.getByPrefix("booking:");
    return c.json({ bookings });
  } catch (err) {
    console.log(`[Bookings] GET error: ${err}`);
    return c.json({ error: `${err}` }, 500);
  }
});

app.get(`${P}/bookings/:id`, async (c) => {
  try {
    const id = c.req.param("id");
    const booking = await kv.get(`booking:${id}`);
    if (!booking) return c.json({ error: "Not found" }, 404);
    return c.json({ booking });
  } catch (err) {
    console.log(`[Bookings] GET/:id error: ${err}`);
    return c.json({ error: `${err}` }, 500);
  }
});

app.delete(`${P}/bookings/:id`, async (c) => {
  try {
    await kv.del(`booking:${c.req.param("id")}`);
    return c.json({ success: true });
  } catch (err) {
    console.log(`[Bookings] DELETE error: ${err}`);
    return c.json({ error: `${err}` }, 500);
  }
});

// ══════════════════════════════════════════════
// REQUIREMENTS
// ══════════════════════════════════════════════

app.post(`${P}/requirements`, async (c) => {
  try {
    const body = await c.req.json();
    const { reqId, ...rest } = body;
    if (!reqId) return c.json({ error: "Missing reqId" }, 400);
    await kv.set(`requirement:${reqId}`, { ...rest, reqId, status: "active", createdAt: new Date().toISOString() });
    console.log(`[Requirements] Saved ${reqId}`);
    return c.json({ success: true, reqId });
  } catch (err) {
    console.log(`[Requirements] POST error: ${err}`);
    return c.json({ error: `${err}` }, 500);
  }
});

app.get(`${P}/requirements`, async (c) => {
  try {
    const requirements = await kv.getByPrefix("requirement:");
    return c.json({ requirements });
  } catch (err) {
    console.log(`[Requirements] GET error: ${err}`);
    return c.json({ error: `${err}` }, 500);
  }
});

app.delete(`${P}/requirements/:id`, async (c) => {
  try {
    await kv.del(`requirement:${c.req.param("id")}`);
    return c.json({ success: true });
  } catch (err) {
    console.log(`[Requirements] DELETE error: ${err}`);
    return c.json({ error: `${err}` }, 500);
  }
});

// ══════════════════════════════════════════════
// TRANSACTIONS
// ══════════════════════════════════════════════

app.post(`${P}/transactions`, async (c) => {
  try {
    const body = await c.req.json();
    const { transactionId, ...rest } = body;
    if (!transactionId) return c.json({ error: "Missing transactionId" }, 400);
    await kv.set(`transaction:${transactionId}`, { ...rest, transactionId, createdAt: new Date().toISOString() });
    console.log(`[Transactions] Saved ${transactionId}`);
    return c.json({ success: true, transactionId });
  } catch (err) {
    console.log(`[Transactions] POST error: ${err}`);
    return c.json({ error: `${err}` }, 500);
  }
});

app.get(`${P}/transactions`, async (c) => {
  try {
    const transactions = await kv.getByPrefix("transaction:");
    return c.json({ transactions });
  } catch (err) {
    console.log(`[Transactions] GET error: ${err}`);
    return c.json({ error: `${err}` }, 500);
  }
});

// ══════════════════════════════════════════════
// ADDRESSES
// ══════════════════════════════════════════════

app.post(`${P}/addresses`, async (c) => {
  try {
    const body = await c.req.json();
    const { id, ...rest } = body;
    if (!id) return c.json({ error: "Missing id" }, 400);
    await kv.set(`address:${id}`, { ...rest, id, createdAt: new Date().toISOString() });
    console.log(`[Addresses] Saved ${id}`);
    return c.json({ success: true, id });
  } catch (err) {
    console.log(`[Addresses] POST error: ${err}`);
    return c.json({ error: `${err}` }, 500);
  }
});

app.get(`${P}/addresses`, async (c) => {
  try {
    const addresses = await kv.getByPrefix("address:");
    return c.json({ addresses });
  } catch (err) {
    console.log(`[Addresses] GET error: ${err}`);
    return c.json({ error: `${err}` }, 500);
  }
});

app.delete(`${P}/addresses/:id`, async (c) => {
  try {
    await kv.del(`address:${c.req.param("id")}`);
    return c.json({ success: true });
  } catch (err) {
    console.log(`[Addresses] DELETE error: ${err}`);
    return c.json({ error: `${err}` }, 500);
  }
});

// ══════════════════════════════════════════════
// USER PROFILE
// ══════════════════════════════════════════════

app.post(`${P}/profile`, async (c) => {
  try {
    const body = await c.req.json();
    await kv.set("user:profile", { ...body, updatedAt: new Date().toISOString() });
    return c.json({ success: true });
  } catch (err) {
    console.log(`[Profile] POST error: ${err}`);
    return c.json({ error: `${err}` }, 500);
  }
});

app.get(`${P}/profile`, async (c) => {
  try {
    const profile = await kv.get("user:profile");
    return c.json({ profile: profile || null });
  } catch (err) {
    console.log(`[Profile] GET error: ${err}`);
    return c.json({ error: `${err}` }, 500);
  }
});

Deno.serve((req) => app.fetch(req));