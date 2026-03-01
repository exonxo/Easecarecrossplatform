/**
 * RaiseIssue (RaiseIssueModal) - Support ticket / issue reporting system.
 * Exports:
 *   - RaiseIssue: Modal for creating a new support issue
 *   - IssueSubmittedAlert: Success confirmation after submission
 *   - SupportChatModal: Live chat with support agent
 *   - StickyTicketCard: Persistent ticket status card
 * Used in BookingsPage for per-booking issue reporting.
 * Implementation lives in dashboard/RaiseIssueModal.tsx
 */
export {
  RaiseIssueModal as RaiseIssue,
  IssueSubmittedAlert,
  SupportChatModal,
  StickyTicketCard,
} from "../dashboard/RaiseIssueModal";
