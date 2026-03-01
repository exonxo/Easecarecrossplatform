import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { AnimatePresence } from "motion/react";
import {
  Clock,
  ChevronRight,
  Star,
  Plus,
  Wallet,
  Loader2,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PullToRefresh } from "./PullToRefresh";
import {
  RaiseIssueModal,
  IssueSubmittedAlert,
  SupportChatModal,
  StickyTicketCard,
} from "./RaiseIssueModal";
import svgPaths from "../../../imports/svg-zdwmi91rdf";
import {
  bookingsApi,
  requirementsApi,
  isApiReachable,
  type BookingRecord,
  type RequirementRecord,
} from "../../services/api";
import { dataService } from "../../services/DataService";
import type { CompletedGig } from "../../context/BookingContext";

// ─── Types ───
interface ActiveRequest {
  id: string;
  service: string;
  reqId: string;
  postedAgo: string;
  status: "active" | "pending" | "expired";
  shift: string;
  budget: string;
  offerCount: number;
  bidders: string[];
  iconBg: string;
  iconColor: string;
}

interface HistoryBooking {
  id: string;
  providerName: string;
  providerPhoto: string;
  service: string;
  rating: number;
  agency: string;
  date: string;
  verified: boolean;
}

// ─── Mock Data ───
const ACTIVE_REQUESTS: ActiveRequest[] = [
  {
    id: "req1",
    service: "Parental Care",
    reqId: "#00123",
    postedAgo: "2h ago",
    status: "active",
    shift: "12hr Shift",
    budget: "130/hr",
    offerCount: 10,
    bidders: [
      "https://images.unsplash.com/photo-1590905707155-17c680dd7867?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
      "https://images.unsplash.com/photo-1698465281093-9f09159733b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
      "https://images.unsplash.com/photo-1667382137969-a11fd256717d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    ],
    iconBg: "#e5e7eb",
    iconColor: "#9CA3AF",
  },
  {
    id: "req2",
    service: "Child Education",
    reqId: "#00456",
    postedAgo: "1d ago",
    status: "pending",
    shift: "Afternoon",
    budget: "120/hr",
    offerCount: 8,
    bidders: [
      "https://images.unsplash.com/photo-1704927768421-bc9549b5097d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
      "https://images.unsplash.com/photo-1717964028300-f2861ae1bf8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    ],
    iconBg: "#eff6ff",
    iconColor: "#60A5FA",
  },
  {
    id: "req3",
    service: "After-School Activities",
    reqId: "#00789",
    postedAgo: "3d ago",
    status: "active",
    shift: "3-4hrs",
    budget: "100/hr",
    offerCount: 5,
    bidders: [
      "https://images.unsplash.com/photo-1590905707155-17c680dd7867?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    ],
    iconBg: "#faf5ff",
    iconColor: "#C084FC",
  },
];

const HISTORY_BOOKINGS: HistoryBooking[] = [
  {
    id: "h1",
    providerName: "Jane Williams",
    providerPhoto:
      "https://images.unsplash.com/photo-1710425804836-a1de39056b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    service: "Housekeeping",
    rating: 4.8,
    agency: "Bright Cleaners Agency",
    date: "25/01/2026",
    verified: true,
  },
  {
    id: "h2",
    providerName: "Rajesh Kumar",
    providerPhoto:
      "https://images.unsplash.com/photo-1698465281093-9f09159733b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    service: "Parental Care",
    rating: 4.9,
    agency: "CareFirst Agency",
    date: "18/01/2026",
    verified: true,
  },
];

const STATUS_CONFIG = {
  active: {
    label: "Active",
    bg: "bg-[#dcfce7]",
    text: "text-[#15803d]",
    border: "border-[#bbf7d0]",
  },
  pending: {
    label: "Pending",
    bg: "bg-[#fef9c3]",
    text: "text-[#a16207]",
    border: "border-[#fef08a]",
  },
  expired: {
    label: "Expired",
    bg: "bg-[#f1f5f9]",
    text: "text-[#64748b]",
    border: "border-[#e2e8f0]",
  },
};

// ─── Helpers ───
function timeAgo(dateStr: string): string {
  const now = Date.now();
  const created = new Date(dateStr).getTime();
  const diffMs = now - created;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  return `${diffDays}d ago`;
}

const ICON_COLORS = [
  { bg: "#e5e7eb", color: "#9CA3AF" },
  { bg: "#eff6ff", color: "#60A5FA" },
  { bg: "#faf5ff", color: "#C084FC" },
  { bg: "#fef3c7", color: "#F59E0B" },
  { bg: "#ccfbf1", color: "#0D9488" },
];

// ─── Service Icon ───
function ServiceIcon({
  bg,
  color,
}: {
  bg: string;
  color: string;
  service?: string;
}) {
  const iconPath = svgPaths.p39428e98 || svgPaths.p17c09480;
  return (
    <div
      className="size-[48px] rounded-full flex items-center justify-center shrink-0 overflow-hidden"
      style={{ backgroundColor: bg }}
    >
      <svg width={20} height={20} viewBox="0 0 17.5195 26.8945" fill="none">
        <path d={iconPath} fill={color} />
      </svg>
    </div>
  );
}

// ─── Active Request Card ───
function ActiveRequestCard({ req }: { req: ActiveRequest }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-[12px] border border-[#e5e7eb] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
      <div className="p-[17px] flex flex-col gap-3">
        {/* Header: icon + title + status */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <ServiceIcon
              bg={req.iconBg}
              color={req.iconColor}
              service={req.service}
            />
            <div>
              <h4 className="font-['Lexend',sans-serif] font-bold text-[16px] text-[#111827] leading-[24px]">
                {req.service}
              </h4>
              <p className="font-['Inter',sans-serif] text-[12px] text-[#6b7280] leading-[16px]">
                {req.reqId} • Posted {req.postedAgo}
              </p>
            </div>
          </div>
        </div>

        {/* Shift + Budget row */}
        <div className="flex items-center gap-4 px-1">
          <div className="flex items-center gap-1">
            <Clock size={13} className="text-[#6b7280]" />
            <span className="font-['Inter',sans-serif] text-[14px] text-[#6b7280] leading-[20px]">
              {req.shift}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Wallet size={13} className="text-[#6b7280]" />
            <span className="font-['Inter',sans-serif] text-[14px] text-[#6b7280] leading-[20px]">
              Budget: {req.budget}
            </span>
          </div>
        </div>

        {/* Offers row */}
        <div className="bg-[#f3f4f6] rounded-[8px] px-3 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {req.bidders.slice(0, 3).map((src, i) => (
                <div
                  key={i}
                  className="size-[24px] rounded-full overflow-hidden border-2 border-white shrink-0"
                  style={{ marginLeft: i > 0 ? -8 : 0, zIndex: 3 - i }}
                >
                  <ImageWithFallback
                    src={src}
                    alt="Bidder"
                    className="size-full object-cover"
                  />
                </div>
              ))}
            </div>
            <span className="font-['Inter',sans-serif] font-semibold text-[14px] text-[#1f2937] leading-[20px]">
              {req.offerCount} Offers Received
            </span>
          </div>
          <ChevronRight size={16} className="text-[#9ca3af]" />
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-1">
          <button className="flex-1 py-2.5 rounded-[8px] border border-[#e5e7eb] font-['Inter',sans-serif] font-medium text-[14px] text-[#111827] cursor-pointer hover:bg-[#f9fafb] transition-colors text-center">
            Manage
          </button>
          <button
            onClick={() => navigate(`/bookings/${req.id}/bids`)}
            className="flex-1 py-2.5 rounded-[8px] bg-[#1f2937] font-['Inter',sans-serif] font-medium text-[14px] text-white cursor-pointer hover:bg-[#374151] transition-colors shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] text-center"
          >
            View Bids
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── History Booking Card ───
function HistoryCard({
  booking,
  onReportIssue,
}: {
  booking: HistoryBooking;
  onReportIssue: (booking: HistoryBooking) => void;
}) {
  return (
    <div className="bg-white rounded-[16px] border border-[#e5e7eb] shadow-[0px_4px_20px_-2px_rgba(0,0,0,0.05)] overflow-hidden">
      <div className="p-5">
        <p className="font-['Inter',sans-serif] text-[12px] text-[#6b7280] leading-[16px] mb-4">
          {booking.date}
        </p>
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="size-[64px] rounded-[16px] overflow-hidden border-2 border-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
              <ImageWithFallback
                src={booking.providerPhoto}
                alt={booking.providerName}
                className="size-full object-cover"
              />
            </div>
            {booking.verified && (
              <div className="absolute -bottom-1 -right-1 size-[17px] rounded-full bg-[#3b82f6] border-2 border-white flex items-center justify-center">
                <svg width={8} height={6} viewBox="0 0 8 6" fill="none">
                  <path
                    d="M2.8 4.6L1.15 2.95L0.5 3.6L2.8 5.9L7.5 1.2L6.85 0.55L2.8 4.6Z"
                    fill="white"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-['Lexend',sans-serif] font-bold text-[18px] text-[#111827] leading-[28px] truncate">
              {booking.providerName}
            </h4>
            <p className="font-['Inter',sans-serif] text-[14px] text-[#6b7280] leading-[20px]">
              {booking.service}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Star size={12} className="text-[#facc15] fill-[#facc15]" />
              <span className="font-['Inter',sans-serif] font-medium text-[12px] text-[#111827]">
                {booking.rating}
              </span>
              <span className="font-['Inter',sans-serif] text-[12px] text-[#6b7280]">
                • {booking.agency}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-[#e5e7eb] bg-[#f9fafb] px-5 py-3 flex justify-center">
        <button
          onClick={() => onReportIssue(booking)}
          className="font-['Inter',sans-serif] font-semibold text-[14px] text-[#111827] cursor-pointer hover:text-[#ef4444] transition-colors"
        >
          Report an Issue
        </button>
      </div>
    </div>
  );
}

// ─── Help Button ───
function HelpButton() {
  return (
    <button className="bg-white border border-[#e5e7eb] rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-[#f9fafb] transition-colors shrink-0">
      <svg width={14} height={17} viewBox="0 0 13.5 16.5234" fill="none">
        <path
          d="M6.75 0C3.02344 0 0 3.02344 0 6.75V12.0234C0 13.2539 1.01953 14.2734 2.25 14.2734H4.5V8.26172H1.51172V6.75C1.51172 3.86719 3.83203 1.51172 6.75 1.51172C9.66797 1.51172 11.9883 3.86719 11.9883 6.75V8.26172H9V14.2734H11.9883V15.0117H6.75V16.5234H11.25C12.4805 16.5234 13.5 15.5039 13.5 14.2734V6.75C13.5 3.02344 10.4766 0 6.75 0V0"
          fill="#111827"
        />
      </svg>
      <span className="font-['Inter',sans-serif] font-medium text-[14px] text-[#111827]">
        Help
      </span>
    </button>
  );
}

// ─── Main Bookings Page ───
export function BookingsPage() {
  const [activeTab, setActiveTab] = useState<"requests" | "history">(
    "requests"
  );

  // ── Supabase data ──
  const [serverBookings, setServerBookings] = useState<BookingRecord[]>([]);
  const [serverRequirements, setServerRequirements] = useState<RequirementRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      setLoading(true);
      try {
        // Skip API calls entirely when circuit breaker is open — go straight to localStorage
        const apiUp = isApiReachable();

        const [bks, reqs] = await Promise.all([
          apiUp
            ? bookingsApi.getAll().catch(() => [] as BookingRecord[])
            : Promise.resolve([] as BookingRecord[]),
          apiUp
            ? requirementsApi.getAll().catch(() => [] as RequirementRecord[])
            : Promise.resolve([] as RequirementRecord[]),
        ]);

        // Merge with localStorage fallback data (written by PaymentFlow when API is down)
        let mergedBookings = bks;
        try {
          const localBookings: BookingRecord[] = JSON.parse(localStorage.getItem("ec_bookings") || "[]");
          if (localBookings.length > 0) {
            const serverIds = new Set(bks.map((b) => b.bookingId));
            const extras = localBookings.filter((lb) => !serverIds.has(lb.bookingId));
            if (extras.length > 0) {
              mergedBookings = [...bks, ...extras];
            }
          }
        } catch { /* ignore parse errors */ }

        if (!cancelled) {
          setServerBookings(mergedBookings);
          setServerRequirements(reqs);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchData();
    return () => { cancelled = true; };
  }, []);

  // Convert server requirements -> ActiveRequest cards
  const serverRequestCards: ActiveRequest[] = serverRequirements.map((r, idx) => ({
    id: `srv-req-${r.reqId}`,
    service: r.service,
    reqId: `#${r.reqId}`,
    postedAgo: r.createdAt ? timeAgo(r.createdAt) : "just now",
    status: r.status || "active",
    shift: r.duration || "Full Day",
    budget: r.budget || "",
    offerCount: 0,
    bidders: [],
    iconBg: ICON_COLORS[idx % ICON_COLORS.length].bg,
    iconColor: ICON_COLORS[idx % ICON_COLORS.length].color,
  }));

  // Convert server bookings -> HistoryBooking cards
  const serverHistoryCards: HistoryBooking[] = serverBookings.map((b) => ({
    id: `srv-bk-${b.bookingId}`,
    providerName: b.providerName,
    providerPhoto: b.providerPhoto,
    service: b.service,
    rating: b.rating,
    agency: b.agency || "",
    date: b.createdAt
      ? new Date(b.createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "",
    verified: b.verified,
  }));

  // Load completed gigs from localStorage (written by OngoingServiceCard slider)
  const [completedGigs, setCompletedGigs] = useState<CompletedGig[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("ec_completed_gigs");
      if (raw) setCompletedGigs(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  const completedGigCards: HistoryBooking[] = completedGigs.map((g) => ({
    id: g.id,
    providerName: g.providerName,
    providerPhoto: g.providerPhoto,
    service: g.service,
    rating: g.rating,
    agency: g.agency || "",
    date: new Date(g.completedAt).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    verified: true,
  }));

  // Merged lists — completed gigs first so newest show at top, deduplicated by id
  const allRequestsRaw = [...serverRequestCards, ...ACTIVE_REQUESTS];
  const allRequests = allRequestsRaw.filter(
    (r, i, arr) => arr.findIndex((x) => x.id === r.id) === i,
  );
  const allHistoryRaw = [...completedGigCards, ...serverHistoryCards, ...HISTORY_BOOKINGS];
  const allHistory = allHistoryRaw.filter(
    (h, i, arr) => arr.findIndex((x) => x.id === h.id) === i,
  );

  // Issue reporting state
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [reportingBooking, setReportingBooking] =
    useState<HistoryBooking | null>(null);
  const [submittedTicket, setSubmittedTicket] = useState<{
    ticketId: string;
    priority: "urgent" | "high" | "normal";
    category: string;
    description: string;
    bookingId: string;
    providerName: string;
  } | null>(null);
  const [showSubmittedAlert, setShowSubmittedAlert] = useState(false);
  const [showSupportChat, setShowSupportChat] = useState(false);

  const handleReportIssue = (booking: HistoryBooking) => {
    setReportingBooking(booking);
    setShowIssueModal(true);
  };

  const handleIssueSubmit = (ticket: {
    ticketId: string;
    priority: "urgent" | "high" | "normal";
    category: string;
    description: string;
    bookingId: string;
    providerName: string;
  }) => {
    setSubmittedTicket(ticket);
    setShowIssueModal(false);
    setShowSubmittedAlert(true);

    // Persist support ticket to Supabase
    dataService
      .createIssue({
        bookingId: ticket.bookingId,
        category: ticket.category,
        priority: ticket.priority,
        description: ticket.description,
        providerName: ticket.providerName,
      })
      .then(({ id }) => console.log(`[BookingsPage] Issue ${id} persisted to Supabase`))
      .catch((err) => console.warn("[BookingsPage] Failed to persist issue:", err));
  };

  const handleOpenChat = () => {
    setShowSubmittedAlert(false);
    setShowSupportChat(true);
  };

  return (
    <PullToRefresh>
      <main className="flex-1 pb-[100px] md:pb-0">
        <div className="max-w-[800px] md:max-w-full mx-auto">
          {/* Header */}
          <div className="sticky top-0 z-10 backdrop-blur-[6px] bg-[rgba(255,255,255,0.95)] border-b border-[#f1f5f9]">
            <div className="px-4 md:px-8 py-3 flex items-center justify-between md:max-w-full">
              <h1 className="font-['Lexend',sans-serif] font-bold text-[30px] text-[#0f172a] tracking-[-0.75px]">
                Bookings
              </h1>
              <HelpButton />
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#e5e7eb]">
              <button
                onClick={() => setActiveTab("requests")}
                className={`flex-1 py-3 text-center cursor-pointer transition-colors relative ${
                  activeTab === "requests"
                    ? "font-['Inter',sans-serif] font-semibold text-[14px] text-[#2077cf]"
                    : "font-['Inter',sans-serif] font-medium text-[14px] text-[#6b7280]"
                }`}
              >
                My Active Requests
                {activeTab === "requests" && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2077cf]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`flex-1 py-3 text-center cursor-pointer transition-colors relative ${
                  activeTab === "history"
                    ? "font-['Inter',sans-serif] font-semibold text-[14px] text-[#2077cf]"
                    : "font-['Inter',sans-serif] font-medium text-[14px] text-[#6b7280]"
                }`}
              >
                History
                {activeTab === "history" && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2077cf]" />
                )}
              </button>
            </div>
          </div>

          {/* Loading indicator */}
          {loading && (
            <div className="flex items-center justify-center py-8 gap-2">
              <Loader2 size={18} className="text-[#1975d2] animate-spin" />
              <span className="font-['Inter',sans-serif] text-[13px] text-[#94a3b8]">
                Loading from server...
              </span>
            </div>
          )}

          {/* Content */}
          <div className="px-4 pt-4 pb-4 flex flex-col gap-4">
            {activeTab === "requests" ? (
              <>
                {/* Server requirements badge */}
                {serverRequirements.length > 0 && !loading && (
                  <div className="bg-[#eff6ff] border border-[#dbeafe] rounded-[10px] px-3 py-2 flex items-center gap-2">
                    <div className="size-[6px] rounded-full bg-[#1975d2] animate-pulse" />
                    <span className="font-['Inter',sans-serif] text-[12px] text-[#1e40af]">
                      {serverRequirements.length} requirement{serverRequirements.length > 1 ? "s" : ""} synced from server
                    </span>
                  </div>
                )}
                {allRequests.map((req) => (
                  <ActiveRequestCard key={req.id} req={req} />
                ))}
                {allRequests.length === 0 && !loading && (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="size-[64px] rounded-full bg-[#dbeafe] flex items-center justify-center mb-4">
                      <Plus size={28} className="text-[#1975d2]" />
                    </div>
                    <h3 className="font-['Lexend',sans-serif] font-bold text-[16px] text-[#0f172a] mb-1">
                      No active requests
                    </h3>
                    <p className="font-['Inter',sans-serif] text-[14px] text-[#94a3b8] max-w-[240px]">
                      Post a care requirement to get started.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Server bookings badge */}
                {serverBookings.length > 0 && !loading && (
                  <div className="bg-[#ecfdf5] border border-[#bbf7d0] rounded-[10px] px-3 py-2 flex items-center gap-2">
                    <div className="size-[6px] rounded-full bg-[#22c55e] animate-pulse" />
                    <span className="font-['Inter',sans-serif] text-[12px] text-[#166534]">
                      {serverBookings.length} booking{serverBookings.length > 1 ? "s" : ""} synced from server
                    </span>
                  </div>
                )}
                {allHistory.map((booking) => (
                  <HistoryCard
                    key={booking.id}
                    booking={booking}
                    onReportIssue={handleReportIssue}
                  />
                ))}
                {allHistory.length === 0 && !loading && (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="size-[64px] rounded-full bg-[#f1f5f9] flex items-center justify-center mb-4">
                      <Clock size={28} className="text-[#94a3b8]" />
                    </div>
                    <h3 className="font-['Lexend',sans-serif] font-bold text-[16px] text-[#0f172a] mb-1">
                      No history yet
                    </h3>
                    <p className="font-['Inter',sans-serif] text-[14px] text-[#94a3b8] max-w-[240px]">
                      Completed bookings will appear here.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Sticky Ticket Card */}
        {submittedTicket && activeTab === "history" && !showSupportChat && (
          <StickyTicketCard
            ticket={submittedTicket}
            onOpenChat={() => setShowSupportChat(true)}
          />
        )}
      </main>

      {/* Raise Issue Modal */}
      <AnimatePresence>
        {showIssueModal && reportingBooking && (
          <RaiseIssueModal
            isOpen={showIssueModal}
            onClose={() => {
              setShowIssueModal(false);
              setReportingBooking(null);
            }}
            onSubmit={handleIssueSubmit}
            bookingId={reportingBooking.id}
            providerName={reportingBooking.providerName}
          />
        )}
      </AnimatePresence>

      {/* Issue Submitted Alert */}
      <AnimatePresence>
        {showSubmittedAlert && submittedTicket && (
          <IssueSubmittedAlert
            ticket={submittedTicket}
            onOpenChat={handleOpenChat}
            onClose={() => setShowSubmittedAlert(false)}
          />
        )}
      </AnimatePresence>

      {/* Support Chat */}
      <AnimatePresence>
        {showSupportChat && submittedTicket && (
          <SupportChatModal
            isOpen={showSupportChat}
            onClose={() => setShowSupportChat(false)}
            ticket={submittedTicket}
          />
        )}
      </AnimatePresence>
    </PullToRefresh>
  );
}