import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  Clock,
  ChevronRight,
  Star,
  Plus,
  Wallet,
  Loader2,
  X,
  CalendarCheck,
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

// ─── Types ───────────────────────────────────────────────────────────────────

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
  userRating?: number;
  agency: string;
  date: string;
  verified: boolean;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const ACTIVE_REQUESTS: ActiveRequest[] = [
  {
    id: "req1",
    service: "Parental Care",
    reqId: "#00123",
    postedAgo: "2h ago",
    status: "active",
    shift: "12hr Shift",
    budget: "₹130/hr",
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
    budget: "₹120/hr",
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
    shift: "3–4 hrs",
    budget: "₹100/hr",
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
    userRating: 5,
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
  active: { label: "Active", bg: "bg-[#dcfce7]", text: "text-[#15803d]", dot: "bg-[#22c55e]" },
  pending: { label: "Pending", bg: "bg-[#fef9c3]", text: "text-[#a16207]", dot: "bg-[#eab308]" },
  expired: { label: "Expired", bg: "bg-[#f1f5f9]", text: "text-[#64748b]", dot: "bg-[#94a3b8]" },
};

const ICON_COLORS = [
  { bg: "#e5e7eb", color: "#9CA3AF" },
  { bg: "#eff6ff", color: "#60A5FA" },
  { bg: "#faf5ff", color: "#C084FC" },
  { bg: "#fef3c7", color: "#F59E0B" },
  { bg: "#ccfbf1", color: "#0D9488" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const created = new Date(dateStr).getTime();
  const diffMs = now - created;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  return `${Math.floor(diffHrs / 24)}d ago`;
}

// ─── Service Icon ─────────────────────────────────────────────────────────────

function ServiceIcon({ bg, color }: { bg: string; color: string }) {
  const iconPath = svgPaths.p39428e98 || svgPaths.p17c09480;
  return (
    <div
      className="size-[44px] rounded-full flex items-center justify-center shrink-0"
      style={{ backgroundColor: bg }}
    >
      <svg width={18} height={18} viewBox="0 0 17.5195 26.8945" fill="none">
        <path d={iconPath} fill={color} />
      </svg>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ActiveRequest["status"] }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold font-['Inter',sans-serif] ${cfg.bg} ${cfg.text}`}
    >
      <span className={`size-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

// ─── Bidder Avatars ───────────────────────────────────────────────────────────

function BidderAvatars({ bidders, count }: { bidders: string[]; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {bidders.slice(0, 3).map((src, i) => (
          <div
            key={i}
            className="size-6 rounded-full overflow-hidden border-[2px] border-white shrink-0"
            style={{ marginLeft: i > 0 ? -8 : 0, zIndex: 3 - i }}
          >
            <ImageWithFallback src={src} alt="Bidder" className="size-full object-cover" />
          </div>
        ))}
      </div>
      <span className="font-['Inter',sans-serif] font-semibold text-[13px] text-[#1f2937]">
        {count} Offers
      </span>
    </div>
  );
}

// ─── Active Request Card ──────────────────────────────────────────────────────

function ActiveRequestCard({
  req,
  selected,
  onClick,
}: {
  req: ActiveRequest;
  selected: boolean;
  onClick: () => void;
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-[14px] border shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden cursor-pointer transition-all duration-150 ${
        selected
          ? "border-[#1975D2] ring-[2px] ring-[rgba(25,117,210,0.15)]"
          : "border-[#e5e7eb] hover:border-[#c7d9f0] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
      }`}
    >
      <div className="p-4 flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <ServiceIcon bg={req.iconBg} color={req.iconColor} />
            <div className="min-w-0">
              <h4 className="font-['Lexend',sans-serif] font-bold text-[15px] text-[#111827] truncate">
                {req.service}
              </h4>
              <p className="font-['Inter',sans-serif] text-[11px] text-[#6b7280]">
                {req.reqId} · {req.postedAgo}
              </p>
            </div>
          </div>
          <StatusBadge status={req.status} />
        </div>

        {/* Shift + Budget */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Clock size={12} className="text-[#6b7280]" />
            <span className="font-['Inter',sans-serif] text-[12px] text-[#6b7280]">{req.shift}</span>
          </div>
          <div className="flex items-center gap-1">
            <Wallet size={12} className="text-[#6b7280]" />
            <span className="font-['Inter',sans-serif] text-[12px] text-[#6b7280]">{req.budget}</span>
          </div>
        </div>

        {/* Offers row */}
        <div className="bg-[#f8fafc] rounded-[8px] px-3 py-2.5 flex items-center justify-between">
          <BidderAvatars bidders={req.bidders} count={req.offerCount} />
          <ChevronRight size={14} className="text-[#9ca3af]" />
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-0.5" onClick={(e) => e.stopPropagation()}>
          <button className="flex-1 py-2 rounded-[8px] border border-[#e5e7eb] font-['Inter',sans-serif] font-medium text-[13px] text-[#111827] cursor-pointer hover:bg-[#f9fafb] transition-colors">
            Manage
          </button>
          <button
            onClick={() => navigate(`/bookings/${req.id}/bids`)}
            className="flex-1 py-2 rounded-[8px] bg-[#1975D2] font-['Inter',sans-serif] font-medium text-[13px] text-white cursor-pointer hover:bg-[#1565b8] transition-colors"
          >
            View Bids
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Request Detail Panel ─────────────────────────────────────────────────────

function RequestDetailPanel({
  req,
  onClose,
}: {
  req: ActiveRequest;
  onClose: () => void;
}) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ type: "tween", duration: 0.2 }}
      className="bg-white rounded-[16px] border border-[#e5e7eb] shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex flex-col overflow-hidden h-fit"
    >
      {/* Panel header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#f1f5f9]">
        <span className="font-['Lexend',sans-serif] font-bold text-[14px] text-[#0f172a]">
          Request Details
        </span>
        <button
          onClick={onClose}
          className="size-7 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X size={14} className="text-[#64748b]" />
        </button>
      </div>

      {/* Panel body */}
      <div className="p-5 flex flex-col gap-5">
        {/* Service + status */}
        <div className="flex items-center gap-3">
          <ServiceIcon bg={req.iconBg} color={req.iconColor} />
          <div>
            <h3 className="font-['Lexend',sans-serif] font-bold text-[18px] text-[#111827]">
              {req.service}
            </h3>
            <p className="font-['Inter',sans-serif] text-[12px] text-[#6b7280]">{req.reqId}</p>
          </div>
        </div>

        <StatusBadge status={req.status} />

        {/* Meta rows */}
        <div className="flex flex-col gap-2.5">
          <div className="flex justify-between items-center">
            <span className="font-['Inter',sans-serif] text-[13px] text-[#64748b]">Posted</span>
            <span className="font-['Inter',sans-serif] font-medium text-[13px] text-[#1e293b]">{req.postedAgo}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-['Inter',sans-serif] text-[13px] text-[#64748b]">Shift</span>
            <span className="font-['Inter',sans-serif] font-medium text-[13px] text-[#1e293b]">{req.shift}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-['Inter',sans-serif] text-[13px] text-[#64748b]">Budget</span>
            <span className="font-['Inter',sans-serif] font-medium text-[13px] text-[#1975D2]">{req.budget}</span>
          </div>
        </div>

        {/* Offers */}
        <div className="bg-[#f8fafc] rounded-[10px] p-3 flex items-center justify-between">
          <BidderAvatars bidders={req.bidders} count={req.offerCount} />
          <span className="font-['Inter',sans-serif] text-[11px] text-[#94a3b8]">providers bid</span>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => navigate(`/bookings/${req.id}/bids`)}
            className="w-full py-2.5 rounded-[10px] bg-[#1975D2] font-['Inter',sans-serif] font-semibold text-[14px] text-white cursor-pointer hover:bg-[#1565b8] transition-colors"
          >
            View All Bids
          </button>
          <button className="w-full py-2.5 rounded-[10px] border border-[#e5e7eb] font-['Inter',sans-serif] font-medium text-[14px] text-[#111827] cursor-pointer hover:bg-[#f9fafb] transition-colors">
            Manage Request
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Star Rating Widget ───────────────────────────────────────────────────────

function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={(e) => { e.stopPropagation(); onChange(star); }}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="cursor-pointer transition-transform hover:scale-110"
        >
          <Star
            size={18}
            className={
              star <= (hovered || value)
                ? "text-[#facc15] fill-[#facc15]"
                : "text-[#d1d5db]"
            }
          />
        </button>
      ))}
    </div>
  );
}

// ─── History Card ─────────────────────────────────────────────────────────────

function HistoryCard({
  booking,
  onReportIssue,
  onRate,
}: {
  booking: HistoryBooking;
  onReportIssue: (booking: HistoryBooking) => void;
  onRate: (id: string, rating: number) => void;
}) {
  const [rating, setRating] = useState(booking.userRating ?? 0);
  const [rated, setRated] = useState(!!booking.userRating);

  const handleRate = (v: number) => {
    setRating(v);
    setRated(true);
    onRate(booking.id, v);
  };

  return (
    <div className="bg-white rounded-[14px] border border-[#e5e7eb] shadow-[0_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
      <div className="p-4">
        <p className="font-['Inter',sans-serif] text-[11px] text-[#94a3b8] mb-3">{booking.date}</p>

        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="size-[56px] rounded-[12px] overflow-hidden border border-[#f1f5f9]">
              <ImageWithFallback
                src={booking.providerPhoto}
                alt={booking.providerName}
                className="size-full object-cover"
              />
            </div>
            {booking.verified && (
              <div className="absolute -bottom-1 -right-1 size-[16px] rounded-full bg-[#3b82f6] border-[2px] border-white flex items-center justify-center">
                <svg width={7} height={5} viewBox="0 0 8 6" fill="none">
                  <path d="M2.8 4.6L1.15 2.95L0.5 3.6L2.8 5.9L7.5 1.2L6.85 0.55L2.8 4.6Z" fill="white" />
                </svg>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-['Lexend',sans-serif] font-bold text-[15px] text-[#111827] truncate">
              {booking.providerName}
            </h4>
            <p className="font-['Inter',sans-serif] text-[13px] text-[#6b7280]">{booking.service}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Star size={11} className="text-[#facc15] fill-[#facc15]" />
              <span className="font-['Inter',sans-serif] font-medium text-[11px] text-[#111827]">
                {booking.rating}
              </span>
              <span className="font-['Inter',sans-serif] text-[11px] text-[#94a3b8]">
                · {booking.agency}
              </span>
            </div>
          </div>
        </div>

        {/* Rating section */}
        <div className="mt-3 pt-3 border-t border-[#f1f5f9]">
          {rated ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      className={s <= rating ? "text-[#facc15] fill-[#facc15]" : "text-[#e2e8f0]"}
                    />
                  ))}
                </div>
                <span className="font-['Inter',sans-serif] text-[12px] text-[#64748b]">Your rating</span>
              </div>
              <button
                onClick={() => onReportIssue(booking)}
                className="font-['Inter',sans-serif] text-[12px] text-[#94a3b8] hover:text-[#ef4444] transition-colors cursor-pointer"
              >
                Report issue
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="font-['Inter',sans-serif] text-[12px] text-[#64748b]">Rate this booking:</span>
                <StarRating value={rating} onChange={handleRate} />
              </div>
              <button
                onClick={() => onReportIssue(booking)}
                className="font-['Inter',sans-serif] text-[12px] text-[#94a3b8] hover:text-[#ef4444] transition-colors cursor-pointer"
              >
                Report issue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({
  type,
}: {
  type: "requests" | "history";
}) {
  const navigate = useNavigate();

  if (type === "requests") {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="size-20 rounded-full bg-[#eff6ff] flex items-center justify-center mb-5">
          <Plus size={32} className="text-[#1975D2]" />
        </div>
        <h3 className="font-['Lexend',sans-serif] font-bold text-[18px] text-[#0f172a] mb-2">
          No active requests yet
        </h3>
        <p className="font-['Inter',sans-serif] text-[14px] text-[#94a3b8] max-w-[260px] leading-[22px] mb-6">
          Post a care requirement and get matched with verified providers in your area.
        </p>
        <button
          onClick={() => navigate("/post-requirement")}
          className="bg-[#1975D2] text-white font-['Lexend',sans-serif] font-semibold text-[14px] px-6 py-3 rounded-[12px] hover:bg-[#1565b8] active:scale-[0.98] transition-all cursor-pointer shadow-[0_4px_12px_rgba(25,117,210,0.25)]"
        >
          Post a Requirement
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="size-20 rounded-full bg-[#f1f5f9] flex items-center justify-center mb-5">
        <CalendarCheck size={32} className="text-[#94a3b8]" />
      </div>
      <h3 className="font-['Lexend',sans-serif] font-bold text-[18px] text-[#0f172a] mb-2">
        No bookings yet
      </h3>
      <p className="font-['Inter',sans-serif] text-[14px] text-[#94a3b8] max-w-[260px] leading-[22px] mb-6">
        Once you complete a booking, it will appear here along with your ratings and history.
      </p>
      <button
        onClick={() => navigate("/post-requirement")}
        className="bg-[#0f172a] text-white font-['Lexend',sans-serif] font-semibold text-[14px] px-6 py-3 rounded-[12px] hover:bg-[#1e293b] active:scale-[0.98] transition-all cursor-pointer"
      >
        Book a Service
      </button>
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <h2 className="font-['Lexend',sans-serif] font-bold text-[16px] text-[#0f172a]">{title}</h2>
      {count > 0 && (
        <span className="bg-[#EBF3FC] text-[#1975D2] font-['Inter',sans-serif] font-semibold text-[11px] px-2 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
}

// ─── Main Bookings Page ───────────────────────────────────────────────────────

export function BookingsPage() {
  const [activeTab, setActiveTab] = useState<"requests" | "history">("requests");
  const [selectedReqId, setSelectedReqId] = useState<string | null>(null);

  // ── Server data ──
  const [serverBookings, setServerBookings] = useState<BookingRecord[]>([]);
  const [serverRequirements, setServerRequirements] = useState<RequirementRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      setLoading(true);
      try {
        const apiUp = isApiReachable();
        const [bks, reqs] = await Promise.all([
          apiUp ? bookingsApi.getAll().catch(() => [] as BookingRecord[]) : Promise.resolve([] as BookingRecord[]),
          apiUp ? requirementsApi.getAll().catch(() => [] as RequirementRecord[]) : Promise.resolve([] as RequirementRecord[]),
        ]);

        let mergedBookings = bks;
        try {
          const localBookings: BookingRecord[] = JSON.parse(localStorage.getItem("ec_bookings") || "[]");
          if (localBookings.length > 0) {
            const serverIds = new Set(bks.map((b) => b.bookingId));
            const extras = localBookings.filter((lb) => !serverIds.has(lb.bookingId));
            if (extras.length > 0) mergedBookings = [...bks, ...extras];
          }
        } catch { /* ignore */ }

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

  // Convert server requirements → ActiveRequest cards
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

  // Convert server bookings → HistoryBooking cards
  const serverHistoryCards: HistoryBooking[] = serverBookings.map((b) => ({
    id: `srv-bk-${b.bookingId}`,
    providerName: b.providerName,
    providerPhoto: b.providerPhoto,
    service: b.service,
    rating: b.rating,
    agency: b.agency || "",
    date: (() => {
      if (!b.createdAt) return "";
      const d = new Date(b.createdAt);
      return isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" });
    })(),
    verified: b.verified,
  }));

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
    date: new Date(g.completedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" }),
    verified: true,
  }));

  const allRequests = [...serverRequestCards, ...ACTIVE_REQUESTS].filter(
    (r, i, arr) => arr.findIndex((x) => x.id === r.id) === i,
  );
  const allHistory = [...completedGigCards, ...serverHistoryCards, ...HISTORY_BOOKINGS].filter(
    (h, i, arr) => arr.findIndex((x) => x.id === h.id) === i,
  );

  const selectedReq = allRequests.find((r) => r.id === selectedReqId) ?? null;

  // Issue reporting
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [reportingBooking, setReportingBooking] = useState<HistoryBooking | null>(null);
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

  const handleIssueSubmit = (ticket: typeof submittedTicket & {}) => {
    if (!ticket) return;
    setSubmittedTicket(ticket);
    setShowIssueModal(false);
    setShowSubmittedAlert(true);
    dataService
      .createIssue({ bookingId: ticket.bookingId, category: ticket.category, priority: ticket.priority, description: ticket.description, providerName: ticket.providerName })
      .then(({ id }) => console.log(`[BookingsPage] Issue ${id} persisted`))
      .catch((err) => console.warn("[BookingsPage] Failed to persist issue:", err));
  };

  const handleRate = (id: string, rating: number) => {
    try {
      const key = "ec_ratings";
      const stored: Record<string, number> = JSON.parse(localStorage.getItem(key) || "{}");
      stored[id] = rating;
      localStorage.setItem(key, JSON.stringify(stored));
    } catch {
      // localStorage unavailable — no-op
    }
  };

  return (
    <div className="flex flex-col flex-1">

      {/* ── Subheader — outside PullToRefresh so it's in the real document flow.
           sticky top-[64px] correctly clears TopNav here (no overflow-y-auto ancestor). ── */}
      <div className="sticky top-[64px] z-10 bg-white border-b border-[#f1f5f9] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        {/* Pill segmented control */}
        <div className="px-4 md:px-8 py-3 flex items-center justify-between gap-3">
          <div className="inline-flex bg-[#f1f5f9] rounded-full p-1 gap-1">
            {(["requests", "history"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setSelectedReqId(null); }}
                className={`relative px-4 py-1.5 rounded-full font-['Inter',sans-serif] text-[13px] font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-white text-[#0f172a] shadow-[0_1px_4px_rgba(0,0,0,0.12)] font-semibold"
                    : "text-[#64748b] hover:text-[#334155]"
                }`}
              >
                {tab === "requests" ? "Active Requests" : "History"}
                {tab === "requests" && allRequests.length > 0 && (
                  <span
                    className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                      activeTab === "requests"
                        ? "bg-[#EBF3FC] text-[#1975D2]"
                        : "bg-[#e2e8f0] text-[#64748b]"
                    }`}
                  >
                    {allRequests.length}
                  </span>
                )}
              </button>
            ))}
          </div>
          {loading && (
            <div className="flex items-center gap-1.5">
              <Loader2 size={13} className="text-[#1975d2] animate-spin" />
              <span className="font-['Inter',sans-serif] text-[11px] text-[#94a3b8]">Syncing…</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Scrollable content inside PullToRefresh ── */}
      <PullToRefresh>
        <main className="pb-[80px] lg:pb-8">
          <div className="px-4 md:px-8 pt-6 pb-4">
            <AnimatePresence mode="wait">

              {/* REQUESTS TAB */}
              {activeTab === "requests" && (
                <motion.div
                  key="requests"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  {allRequests.length === 0 && !loading ? (
                    <EmptyState type="requests" />
                  ) : (
                    <div className="flex gap-6 items-start">
                      <div className="flex-1 min-w-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                          {allRequests.map((req) => (
                            <ActiveRequestCard
                              key={req.id}
                              req={req}
                              selected={selectedReqId === req.id}
                              onClick={() =>
                                setSelectedReqId(selectedReqId === req.id ? null : req.id)
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <AnimatePresence>
                        {selectedReq && (
                          <div className="hidden lg:block w-[340px] xl:w-[380px] shrink-0">
                            <RequestDetailPanel
                              req={selectedReq}
                              onClose={() => setSelectedReqId(null)}
                            />
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </motion.div>
              )}

              {/* HISTORY TAB */}
              {activeTab === "history" && (
                <motion.div
                  key="history"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  {allHistory.length === 0 && !loading ? (
                    <EmptyState type="history" />
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {allHistory.map((booking) => (
                        <HistoryCard
                          key={booking.id}
                          booking={booking}
                          onReportIssue={handleReportIssue}
                          onRate={handleRate}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {submittedTicket && activeTab === "history" && !showSupportChat && (
            <StickyTicketCard
              ticket={submittedTicket}
              onOpenChat={() => setShowSupportChat(true)}
            />
          )}
        </main>
      </PullToRefresh>

      <AnimatePresence>
        {showIssueModal && reportingBooking && (
          <RaiseIssueModal
            isOpen={showIssueModal}
            onClose={() => { setShowIssueModal(false); setReportingBooking(null); }}
            onSubmit={handleIssueSubmit}
            bookingId={reportingBooking.id}
            providerName={reportingBooking.providerName}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSubmittedAlert && submittedTicket && (
          <IssueSubmittedAlert
            ticket={submittedTicket}
            onOpenChat={() => { setShowSubmittedAlert(false); setShowSupportChat(true); }}
            onClose={() => setShowSubmittedAlert(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSupportChat && submittedTicket && (
          <SupportChatModal
            isOpen={showSupportChat}
            onClose={() => setShowSupportChat(false)}
            ticket={submittedTicket}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
