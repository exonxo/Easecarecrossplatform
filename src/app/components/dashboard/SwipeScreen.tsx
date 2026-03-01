import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, ChevronLeft, Shield, Star } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PrimaryButton } from "../shared/PrimaryButton";

// ─── Types ───
export interface ProviderProfile {
  id: string;
  name: string;
  age: number;
  photo: string;
  service: string;
  experience: string;
  rating: number;
  verified: boolean;
  duration: string;
  expectedPay: string;
  agency?: string;
}

// ─── Mock Providers ───
export const MOCK_PROVIDERS: ProviderProfile[] = [
  {
    id: "p1",
    name: "Sunita Devi",
    age: 32,
    photo: "https://images.unsplash.com/photo-1590905707155-17c680dd7867?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    service: "Housekeeping",
    experience: "5yrs Experience",
    rating: 4.7,
    verified: true,
    duration: "6hrs / day",
    expectedPay: "Rs. 2k-3k",
    agency: "Bright Cleaners",
  },
  {
    id: "p2",
    name: "Rajesh Kumar",
    age: 35,
    photo: "https://images.unsplash.com/photo-1606309028742-4039c7b625b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    service: "Parental Care",
    experience: "8yrs Experience",
    rating: 4.9,
    verified: true,
    duration: "8hrs / day",
    expectedPay: "Rs. 3k-4k",
    agency: "CareFirst Agency",
  },
  {
    id: "p3",
    name: "Meena Kumari",
    age: 28,
    photo: "https://images.unsplash.com/photo-1608518801158-e4700da8ce36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    service: "Elder Care",
    experience: "3yrs Experience",
    rating: 4.5,
    verified: true,
    duration: "4hrs / day",
    expectedPay: "Rs. 1.5k-2k",
  },
  {
    id: "p4",
    name: "Priya Sharma",
    age: 30,
    photo: "https://images.unsplash.com/photo-1659353888906-adb3e0041693?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    service: "Medical Care",
    experience: "6yrs Experience",
    rating: 4.8,
    verified: true,
    duration: "12hrs / day",
    expectedPay: "Rs. 4k-5k",
    agency: "MedCare Plus",
  },
];

// ─── Grid Provider Card (matches Bids card style) ───
function ProviderGridCard({
  profile,
  onAccept,
  onReject,
  status,
}: {
  profile: ProviderProfile;
  onAccept: () => void;
  onReject: () => void;
  status: "pending" | "accepted" | "rejected";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`bg-[#111827] rounded-[20px] overflow-hidden shadow-[0px_8px_30px_-6px_rgba(0,0,0,0.5)] relative flex flex-col ${
        status === "rejected" ? "opacity-50" : ""
      }`}
    >
      {/* Status overlay */}
      {status !== "pending" && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div
            className={`px-4 py-2 rounded-[10px] backdrop-blur-md ${
              status === "accepted"
                ? "bg-[#22c55e]/80 border border-[#22c55e]"
                : "bg-[#ef4444]/70 border border-[#ef4444]"
            }`}
          >
            <span className="font-['Lexend',sans-serif] font-bold text-[13px] text-white uppercase tracking-wide">
              {status === "accepted" ? "Accepted" : "Rejected"}
            </span>
          </div>
        </div>
      )}

      {/* Photo */}
      <div className="relative h-[140px] sm:h-[160px]">
        <ImageWithFallback
          src={profile.photo}
          alt={profile.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Badges */}
        <div className="absolute bottom-2 left-2.5 flex gap-1.5">
          {profile.verified && (
            <div className="bg-[#22c55e]/90 backdrop-blur-sm rounded-[5px] px-2 py-0.5 flex items-center gap-1">
              <Shield size={9} className="text-white" />
              <span className="font-['Inter',sans-serif] font-bold text-[9px] text-white uppercase">
                Verified
              </span>
            </div>
          )}
          <div className="bg-[#f79009] backdrop-blur-sm rounded-[5px] px-2 py-0.5 flex items-center gap-1">
            <Star size={9} className="text-black" fill="black" />
            <span className="font-['Inter',sans-serif] font-bold text-[9px] text-black">
              {profile.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="px-3.5 pt-2.5 pb-2 flex-1 flex flex-col">
        <h3 className="font-['Lexend',sans-serif] font-bold text-[15px] text-white leading-[20px] truncate">
          {profile.name}, {profile.age}
        </h3>
        <p className="font-['Inter',sans-serif] text-[11px] text-white/50 mt-0.5 truncate">
          {profile.experience} • {profile.duration}
        </p>

        {/* Expected Pay */}
        <div className="mt-2 pt-2 border-t border-white/10">
          <p className="font-['Inter',sans-serif] text-[10px] text-white/40">Expected Pay</p>
          <p className="font-['Lexend',sans-serif] font-bold text-[16px] text-white leading-[22px]">
            {profile.expectedPay}
          </p>
        </div>

        {/* Agency */}
        {profile.agency && (
          <p className="font-['Inter',sans-serif] text-[10px] text-[#1975D2] mt-1 truncate">
            {profile.agency}
          </p>
        )}
      </div>

      {/* Accept / Reject Buttons */}
      {status === "pending" && (
        <div className="px-3 pb-3 flex gap-2">
          <button
            onClick={onReject}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[10px] bg-white/5 border border-white/10 cursor-pointer hover:bg-[#ef4444]/20 hover:border-[#ef4444]/40 active:scale-[0.97] transition-all group"
          >
            <X size={14} className="text-[#ef4444]" />
            <span className="font-['Inter',sans-serif] font-semibold text-[12px] text-white/70 group-hover:text-[#ef4444] transition-colors">
              Reject
            </span>
          </button>
          <button
            onClick={onAccept}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[10px] bg-[#22c55e]/15 border border-[#22c55e]/30 cursor-pointer hover:bg-[#22c55e]/30 active:scale-[0.97] transition-all group"
          >
            <Check size={14} className="text-[#22c55e]" />
            <span className="font-['Inter',sans-serif] font-semibold text-[12px] text-[#22c55e] transition-colors">
              Accept
            </span>
          </button>
        </div>
      )}
    </motion.div>
  );
}

// ─── Main Swipe Screen (now grid-based, matching Bids layout) ───
export function SwipeScreen({
  title = "Quick Find",
  profiles = MOCK_PROVIDERS,
  onClose,
  onAccept,
  onBidPost,
}: {
  title?: string;
  profiles?: ProviderProfile[];
  onClose: () => void;
  onAccept?: (profile: ProviderProfile) => void;
  onBidPost?: () => void;
}) {
  const [statuses, setStatuses] = useState<Record<string, "pending" | "accepted" | "rejected">>(
    () => Object.fromEntries(profiles.map((p) => [p.id, "pending"]))
  );

  const acceptedCount = Object.values(statuses).filter((s) => s === "accepted").length;
  const rejectedCount = Object.values(statuses).filter((s) => s === "rejected").length;
  const pendingCount = Object.values(statuses).filter((s) => s === "pending").length;

  const handleAccept = (profile: ProviderProfile) => {
    setStatuses((prev) => ({ ...prev, [profile.id]: "accepted" }));
    if (onAccept) onAccept(profile);
  };

  const handleReject = (profileId: string) => {
    setStatuses((prev) => ({ ...prev, [profileId]: "rejected" }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-[#0a0f1e] to-[#0d1529] flex flex-col">
      {/* Header */}
      <div className="shrink-0 px-5 pt-4 pb-3 flex items-center justify-between">
        <button
          onClick={onClose}
          className="size-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        >
          <ChevronLeft size={22} className="text-white" />
        </button>
        <div className="text-center">
          <h2 className="font-['Lexend',sans-serif] font-bold text-[18px] text-white">
            {title}
          </h2>
          <p className="font-['Inter',sans-serif] text-[11px] text-white/40 mt-0.5">
            {profiles.length} providers matched
          </p>
        </div>
        <button
          onClick={onClose}
          className="size-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X size={20} className="text-white" />
        </button>
      </div>

      {/* Stats pills */}
      <div className="shrink-0 px-5 pb-4 flex items-center gap-2">
        <div className="bg-white/5 border border-white/10 rounded-[8px] px-3 py-1.5 flex items-center gap-1.5">
          <div className="size-[6px] rounded-full bg-[#f59e0b]" />
          <span className="font-['Inter',sans-serif] text-[11px] text-white/60">
            {pendingCount} Pending
          </span>
        </div>
        <div className="bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-[8px] px-3 py-1.5 flex items-center gap-1.5">
          <div className="size-[6px] rounded-full bg-[#22c55e]" />
          <span className="font-['Inter',sans-serif] text-[11px] text-[#22c55e]/80">
            {acceptedCount} Accepted
          </span>
        </div>
        <div className="bg-[#ef4444]/10 border border-[#ef4444]/20 rounded-[8px] px-3 py-1.5 flex items-center gap-1.5">
          <div className="size-[6px] rounded-full bg-[#ef4444]" />
          <span className="font-['Inter',sans-serif] text-[11px] text-[#ef4444]/80">
            {rejectedCount} Rejected
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-8 no-scrollbar">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {profiles.map((profile) => (
            <ProviderGridCard
              key={profile.id}
              profile={profile}
              status={statuses[profile.id]}
              onAccept={() => handleAccept(profile)}
              onReject={() => handleReject(profile.id)}
            />
          ))}
        </div>

        {/* All reviewed message */}
        {pendingCount === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex flex-col items-center"
          >
            <div className="size-[56px] rounded-full bg-white/10 flex items-center justify-center mb-3">
              <Check size={26} className="text-white/50" />
            </div>
            <p className="font-['Lexend',sans-serif] font-bold text-[16px] text-white mb-1">
              All profiles reviewed!
            </p>
            <p className="font-['Inter',sans-serif] text-[13px] text-white/40 text-center mb-4">
              {acceptedCount > 0
                ? `You accepted ${acceptedCount} provider${acceptedCount > 1 ? "s" : ""}.`
                : "You can go back and reconsider."}
            </p>
            {onBidPost && (
              <PrimaryButton
                onClick={onBidPost}
                fullWidth={false}
                compact
              >
                Post as Bid Instead
              </PrimaryButton>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}