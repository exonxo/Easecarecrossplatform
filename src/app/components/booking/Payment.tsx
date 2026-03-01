/**
 * Payment (PaymentFlow) - Multi-step payment wizard.
 * Supports UPI, credit/debit card, net banking, and wallet payments.
 * Includes receipt generation, success animation (Confetti), and ChatModal launch.
 * Implementation lives in dashboard/PaymentFlow.tsx
 */
export { PaymentFlow as Payment } from "../dashboard/PaymentFlow";
export type { PaymentProvider, PaymentBookingDetails } from "../dashboard/PaymentFlow";
