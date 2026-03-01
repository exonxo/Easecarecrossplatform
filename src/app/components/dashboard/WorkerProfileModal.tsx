import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Star,
  Shield,
  MapPin,
  Clock,
  Briefcase,
  Award,
  Phone,
  MessageCircle,
  ChevronRight,
  CheckCircle2,
  Building2,
  Users,
  Calendar,
  ThumbsUp,
  Languages,
  Heart,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import type { BidProfile } from "./BidsSwipeScreen";

// ─── Extended Worker Data (mock enrichment) ───
interface WorkerExtended {
  bio: string;
  languages: string[];
  skills: string[];
  gigsCompleted: number;
  memberSince: string;
  location: string;
  responseTime: string;
  repeatClients: number;
  agencyLogo?: string;
  agencyDesc?: string;
  agencyRating?: number;
  agencyWorkers?: number;
  agencyEstablished?: string;
  reviews: {
    name: string;
    rating: number;
    date: string;
    text: string;
    avatar: string;
  }[];
}

const EXTENDED_DATA: Record<string, WorkerExtended> = {
  b1: {
    bio: "Dedicated and compassionate caregiver with over 5 years of experience in parental and elderly care. I believe in treating every patient like family. Trained in first-aid, medication management, and physiotherapy assistance.",
    languages: ["Hindi", "Bengali", "English"],
    skills: [
      "Elder Care",
      "Medication Mgmt",
      "Physiotherapy",
      "First Aid",
      "Meal Preparation",
      "Hygiene Assistance",
    ],
    gigsCompleted: 47,
    memberSince: "Jan 2022",
    location: "Salt Lake, Kolkata",
    responseTime: "~15 min",
    repeatClients: 12,
    agencyDesc:
      "Bright Cleaners is a well-established home care agency serving the greater Kolkata area since 2018. Specializing in elderly care, parental assistance, and post-operative support.",
    agencyRating: 4.6,
    agencyWorkers: 85,
    agencyEstablished: "2018",
    reviews: [
      {
        name: "Rina Mukherjee",
        rating: 5,
        date: "Dec 2025",
        text: "Sunita was extremely caring and attentive. My mother loved her company and she managed all medications perfectly. Highly recommend!",
        avatar: "RM",
      },
      {
        name: "Amit Ghosh",
        rating: 4,
        date: "Nov 2025",
        text: "Very professional and punctual. She prepared nutritious meals and kept the room spotless. Will hire again.",
        avatar: "AG",
      },
      {
        name: "Priyanka Das",
        rating: 5,
        date: "Oct 2025",
        text: "Amazing with elderly patients. She went above and beyond, even helped with light physiotherapy exercises.",
        avatar: "PD",
      },
    ],
  },
  b2: {
    bio: "Experienced male caregiver specializing in elderly and post-surgical care. Certified in advanced first-aid and patient mobility assistance. I bring patience, discipline, and warmth to every assignment.",
    languages: ["Hindi", "English", "Urdu"],
    skills: [
      "Post-Surgery Care",
      "Patient Mobility",
      "Wound Dressing",
      "Night Shift Care",
      "Emergency Response",
      "Companionship",
    ],
    gigsCompleted: 82,
    memberSince: "Mar 2021",
    location: "New Town, Kolkata",
    responseTime: "~10 min",
    repeatClients: 24,
    agencyDesc:
      "CareFirst Agency is a premium home healthcare provider with trained professionals across West Bengal. Known for their rigorous screening process and ongoing training programs.",
    agencyRating: 4.8,
    agencyWorkers: 150,
    agencyEstablished: "2016",
    reviews: [
      {
        name: "Suresh Mehta",
        rating: 5,
        date: "Jan 2026",
        text: "Rajesh handled my father's post-surgery recovery brilliantly. He was calm, knowledgeable, and my father felt very comfortable.",
        avatar: "SM",
      },
      {
        name: "Kavita Jain",
        rating: 5,
        date: "Dec 2025",
        text: "Exceptional night-shift care. He stayed alert all night and was always responsive to my mother's needs.",
        avatar: "KJ",
      },
    ],
  },
  b3: {
    bio: "Young and energetic care professional with a genuine passion for helping people. Specialized in childcare and parental support. CPR certified and trained in pediatric first-aid.",
    languages: ["Hindi", "Bengali"],
    skills: [
      "Childcare",
      "Parental Support",
      "CPR Certified",
      "Meal Planning",
      "Light Housekeeping",
      "Companionship",
    ],
    gigsCompleted: 23,
    memberSince: "Aug 2023",
    location: "Howrah, Kolkata",
    responseTime: "~20 min",
    repeatClients: 6,
    agencyDesc: undefined,
    agencyRating: undefined,
    agencyWorkers: undefined,
    agencyEstablished: undefined,
    reviews: [
      {
        name: "Tanuja Roy",
        rating: 5,
        date: "Feb 2026",
        text: "Meena was wonderful with my kids! She's patient, fun, and kept them engaged all day. Will definitely book again.",
        avatar: "TR",
      },
    ],
  },
  b4: {
    bio: "Certified nursing assistant with 6+ years in critical and long-term home care. Expert in managing chronic conditions, dialysis support, and palliative care. Professional, empathetic, and reliable.",
    languages: ["Hindi", "English", "Marathi"],
    skills: [
      "Nursing Assistance",
      "Dialysis Support",
      "Palliative Care",
      "Chronic Disease Mgmt",
      "Vital Monitoring",
      "IV Management",
    ],
    gigsCompleted: 64,
    memberSince: "Jun 2021",
    location: "Park Street, Kolkata",
    responseTime: "~8 min",
    repeatClients: 18,
    agencyDesc:
      "MedCare Plus provides medically trained home healthcare professionals. All workers hold valid nursing certifications and undergo monthly skill assessments.",
    agencyRating: 4.9,
    agencyWorkers: 200,
    agencyEstablished: "2014",
    reviews: [
      {
        name: "Dr. Rajan Sharma",
        rating: 5,
        date: "Jan 2026",
        text: "Priya is outstanding. Her clinical knowledge is impressive and she managed my patient's dialysis schedule flawlessly at home.",
        avatar: "DR",
      },
      {
        name: "Neha Banerjee",
        rating: 5,
        date: "Nov 2025",
        text: "My grandmother's health improved significantly under Priya's care. She monitors vitals diligently and communicates updates daily.",
        avatar: "NB",
      },
      {
        name: "Arun Chatterjee",
        rating: 4,
        date: "Sep 2025",
        text: "Very knowledgeable and professional. She handled a medical emergency calmly and efficiently. Great addition to MedCare Plus.",
        avatar: "AC",
      },
    ],
  },
  b5: {
    bio: "Enthusiastic caregiver starting her career with a fresh perspective and loads of energy. Trained in basic nursing, child safety, and elderly companionship. Eager to learn and grow.",
    languages: ["Hindi", "English"],
    skills: [
      "Basic Nursing",
      "Elderly Companionship",
      "Child Safety",
      "Errand Assistance",
      "Light Cooking",
      "Medication Reminders",
    ],
    gigsCompleted: 11,
    memberSince: "May 2024",
    location: "Jadavpur, Kolkata",
    responseTime: "~25 min",
    repeatClients: 3,
    reviews: [
      {
        name: "Sneha Ghosh",
        rating: 4,
        date: "Feb 2026",
        text: "Anjali was very sweet and caring. She's still learning but her energy and positivity are infectious. Good value for money.",
        avatar: "SG",
      },
    ],
  },
};

// ─── Worker Profile Modal ───
export function WorkerProfileModal({
  profile,
  onClose,
  onAccept,
  onReject,
  status,
}: {
  profile: BidProfile;
  onClose: () => void;
  onAccept: () => void;
  onReject: () => void;
  status: "pending" | "accepted" | "rejected";
}) {
  const ext = EXTENDED_DATA[profile.id] || EXTENDED_DATA.b1;
  const [showAllReviews, setShowAllReviews] = useState(false);
  const displayedReviews = showAllReviews
    ? ext.reviews
    : ext.reviews.slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex flex-col bg-[#f6f8fc]"
    >
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* ── Hero Banner ── */}
        <div className="relative h-[380px] sm:h-[420px]">
          <ImageWithFallback
            src={profile.photo}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 px-4 pt-4 flex items-center justify-between z-10">
            <button
              onClick={onClose}
              className="size-[40px] rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors"
            >
              <X size={20} className="text-white" />
            </button>
            <button className="size-[40px] rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors">
              <Heart size={18} className="text-white" />
            </button>
          </div>

          {/* Bottom info on banner */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 z-10">
            {/* Badges row */}
            <div className="flex items-center gap-2 mb-3">
              {profile.verified && (
                <div className="bg-[#22c55e] backdrop-blur-sm rounded-[8px] px-3 py-1.5 flex items-center gap-1.5">
                  <Shield size={12} className="text-white" />
                  <span className="font-['Inter',sans-serif] font-bold text-[11px] text-white uppercase tracking-wide">
                    Aadhaar Verified
                  </span>
                </div>
              )}
              <div className="bg-[#f79009] rounded-[8px] px-3 py-1.5 flex items-center gap-1.5">
                <Star size={12} className="text-black" fill="black" />
                <span className="font-['Inter',sans-serif] font-bold text-[12px] text-black">
                  {profile.rating}
                </span>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-[8px] px-3 py-1.5">
                <span className="font-['Inter',sans-serif] font-bold text-[11px] text-white">
                  {ext.gigsCompleted} Gigs
                </span>
              </div>
            </div>

            {/* Name */}
            <h1 className="font-['Lexend',sans-serif] font-bold text-[32px] text-white leading-[38px]">
              {profile.name}
            </h1>
            <p className="font-['Inter',sans-serif] text-[14px] text-white/70 mt-1">
              {profile.age} yrs old &bull; {profile.service}
            </p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <MapPin size={13} className="text-white/50" />
              <span className="font-['Inter',sans-serif] text-[13px] text-white/50">
                {ext.location}
              </span>
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="px-5 pt-5 pb-32 space-y-4">
          {/* Quick Stats Row */}
          <div className="grid grid-cols-4 gap-2.5">
            {[
              {
                icon: Briefcase,
                label: "Experience",
                value: profile.experience.replace(" Experience", ""),
              },
              {
                icon: Award,
                label: "Gigs Done",
                value: `${ext.gigsCompleted}`,
              },
              {
                icon: Users,
                label: "Repeat Clients",
                value: `${ext.repeatClients}`,
              },
              {
                icon: Clock,
                label: "Avg Response",
                value: ext.responseTime,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-[16px] p-3 flex flex-col items-center text-center shadow-[0px_1px_3px_rgba(0,0,0,0.04)]"
              >
                <div className="size-[36px] rounded-[10px] bg-[#EBF3FC] flex items-center justify-center mb-2">
                  <stat.icon size={16} className="text-[#1975D2]" />
                </div>
                <p className="font-['Lexend',sans-serif] font-bold text-[16px] text-[#111827] leading-[20px]">
                  {stat.value}
                </p>
                <p className="font-['Inter',sans-serif] text-[10px] text-[#9ca3af] mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* About */}
          <div className="bg-white rounded-[20px] p-5 shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
            <h3 className="font-['Lexend',sans-serif] font-bold text-[16px] text-[#111827] mb-3">
              About
            </h3>
            <p className="font-['Inter',sans-serif] text-[13px] text-[#6b7280] leading-[21px]">
              {ext.bio}
            </p>

            {/* Languages */}
            <div className="flex items-center gap-2 mt-4">
              <Languages size={14} className="text-[#9ca3af]" />
              <span className="font-['Inter',sans-serif] text-[12px] text-[#6b7280]">
                {ext.languages.join(", ")}
              </span>
            </div>

            {/* Member since */}
            <div className="flex items-center gap-2 mt-2">
              <Calendar size={14} className="text-[#9ca3af]" />
              <span className="font-['Inter',sans-serif] text-[12px] text-[#6b7280]">
                Member since {ext.memberSince}
              </span>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-[20px] p-5 shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
            <h3 className="font-['Lexend',sans-serif] font-bold text-[16px] text-[#111827] mb-3">
              Skills & Services
            </h3>
            <div className="flex flex-wrap gap-2">
              {ext.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-[#EBF3FC] text-[#1975D2] font-['Inter',sans-serif] font-medium text-[12px] px-3 py-1.5 rounded-[8px]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Bid Details */}
          <div className="bg-white rounded-[20px] p-5 shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
            <h3 className="font-['Lexend',sans-serif] font-bold text-[16px] text-[#111827] mb-3">
              Bid Details
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-['Inter',sans-serif] text-[13px] text-[#6b7280]">
                  Bid Amount
                </span>
                <span className="font-['Lexend',sans-serif] font-bold text-[18px] text-[#111827]">
                  {profile.bidAmount || profile.expectedPay}
                </span>
              </div>
              <div className="h-px bg-[#f3f4f6]" />
              <div className="flex items-center justify-between">
                <span className="font-['Inter',sans-serif] text-[13px] text-[#6b7280]">
                  Expected Range
                </span>
                <span className="font-['Inter',sans-serif] font-medium text-[14px] text-[#374151]">
                  {profile.expectedPay}
                </span>
              </div>
              <div className="h-px bg-[#f3f4f6]" />
              <div className="flex items-center justify-between">
                <span className="font-['Inter',sans-serif] text-[13px] text-[#6b7280]">
                  Duration
                </span>
                <span className="font-['Inter',sans-serif] font-medium text-[14px] text-[#374151]">
                  {profile.duration}
                </span>
              </div>
            </div>
          </div>

          {/* Agency Card */}
          {profile.agency && (
            <div className="bg-white rounded-[20px] overflow-hidden shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
              {/* Agency Header */}
              <div className="bg-gradient-to-r from-[#1975D2] to-[#1565C0] px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="size-[44px] rounded-[12px] bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Building2 size={22} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-['Lexend',sans-serif] font-bold text-[16px] text-white leading-[20px]">
                      {profile.agency}
                    </h3>
                    <p className="font-['Inter',sans-serif] text-[11px] text-white/70 mt-0.5">
                      Registered Care Agency
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-white/50" />
                </div>
              </div>

              {/* Agency Stats */}
              <div className="px-5 py-4">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {ext.agencyRating && (
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star
                          size={12}
                          className="text-[#f79009]"
                          fill="#f79009"
                        />
                        <span className="font-['Lexend',sans-serif] font-bold text-[16px] text-[#111827]">
                          {ext.agencyRating}
                        </span>
                      </div>
                      <p className="font-['Inter',sans-serif] text-[10px] text-[#9ca3af] mt-0.5">
                        Rating
                      </p>
                    </div>
                  )}
                  {ext.agencyWorkers && (
                    <div className="text-center">
                      <span className="font-['Lexend',sans-serif] font-bold text-[16px] text-[#111827]">
                        {ext.agencyWorkers}+
                      </span>
                      <p className="font-['Inter',sans-serif] text-[10px] text-[#9ca3af] mt-0.5">
                        Workers
                      </p>
                    </div>
                  )}
                  {ext.agencyEstablished && (
                    <div className="text-center">
                      <span className="font-['Lexend',sans-serif] font-bold text-[16px] text-[#111827]">
                        {ext.agencyEstablished}
                      </span>
                      <p className="font-['Inter',sans-serif] text-[10px] text-[#9ca3af] mt-0.5">
                        Est. Since
                      </p>
                    </div>
                  )}
                </div>
                {ext.agencyDesc && (
                  <p className="font-['Inter',sans-serif] text-[12px] text-[#6b7280] leading-[19px]">
                    {ext.agencyDesc}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Reviews */}
          <div className="bg-white rounded-[20px] p-5 shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-['Lexend',sans-serif] font-bold text-[16px] text-[#111827]">
                Reviews
              </h3>
              <div className="flex items-center gap-1.5">
                <Star size={14} className="text-[#f79009]" fill="#f79009" />
                <span className="font-['Lexend',sans-serif] font-bold text-[15px] text-[#111827]">
                  {profile.rating}
                </span>
                <span className="font-['Inter',sans-serif] text-[12px] text-[#9ca3af]">
                  ({ext.reviews.length})
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {displayedReviews.map((review, idx) => (
                <div
                  key={idx}
                  className={
                    idx > 0 ? "pt-4 border-t border-[#f3f4f6]" : ""
                  }
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    {/* Avatar */}
                    <div className="size-[36px] rounded-full bg-gradient-to-br from-[#1975D2] to-[#42a5f5] flex items-center justify-center shrink-0">
                      <span className="font-['Inter',sans-serif] font-bold text-[12px] text-white">
                        {review.avatar}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-['Inter',sans-serif] font-semibold text-[13px] text-[#111827]">
                        {review.name}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={10}
                              className={
                                i < review.rating
                                  ? "text-[#f79009]"
                                  : "text-[#e5e7eb]"
                              }
                              fill={
                                i < review.rating ? "#f79009" : "#e5e7eb"
                              }
                            />
                          ))}
                        </div>
                        <span className="font-['Inter',sans-serif] text-[10px] text-[#9ca3af]">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="font-['Inter',sans-serif] text-[12px] text-[#6b7280] leading-[19px] pl-[48px]">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>

            {ext.reviews.length > 2 && (
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="w-full mt-4 pt-3 border-t border-[#f3f4f6] text-center cursor-pointer"
              >
                <span className="font-['Inter',sans-serif] font-semibold text-[13px] text-[#1975D2]">
                  {showAllReviews
                    ? "Show Less"
                    : `View All ${ext.reviews.length} Reviews`}
                </span>
              </button>
            )}
          </div>

          {/* Contact Options */}
          <div className="bg-white rounded-[20px] p-5 shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
            <h3 className="font-['Lexend',sans-serif] font-bold text-[16px] text-[#111827] mb-3">
              Contact
            </h3>
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-[12px] bg-[#EBF3FC] cursor-pointer hover:bg-[#dde9f8] transition-colors active:scale-[0.98]">
                <Phone size={16} className="text-[#1975D2]" />
                <span className="font-['Inter',sans-serif] font-semibold text-[13px] text-[#1975D2]">
                  Call
                </span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-[12px] bg-[#EBF3FC] cursor-pointer hover:bg-[#dde9f8] transition-colors active:scale-[0.98]">
                <MessageCircle size={16} className="text-[#1975D2]" />
                <span className="font-['Inter',sans-serif] font-semibold text-[13px] text-[#1975D2]">
                  Message
                </span>
              </button>
            </div>
          </div>

          {/* Trust & Safety */}
          <div className="bg-white rounded-[20px] p-5 shadow-[0px_1px_3px_rgba(0,0,0,0.04)]">
            <h3 className="font-['Lexend',sans-serif] font-bold text-[16px] text-[#111827] mb-3">
              Trust & Safety
            </h3>
            <div className="space-y-3">
              {[
                {
                  icon: Shield,
                  text: "Aadhaar identity verified",
                  active: profile.verified,
                },
                {
                  icon: CheckCircle2,
                  text: "Background check cleared",
                  active: true,
                },
                {
                  icon: ThumbsUp,
                  text: `${ext.repeatClients} repeat clients`,
                  active: true,
                },
                {
                  icon: Award,
                  text: `${ext.gigsCompleted} gigs completed on platform`,
                  active: true,
                },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div
                    className={`size-[28px] rounded-[8px] flex items-center justify-center ${
                      item.active ? "bg-[#dcfce7]" : "bg-[#f3f4f6]"
                    }`}
                  >
                    <item.icon
                      size={14}
                      className={
                        item.active ? "text-[#22c55e]" : "text-[#9ca3af]"
                      }
                    />
                  </div>
                  <span
                    className={`font-['Inter',sans-serif] text-[13px] ${
                      item.active ? "text-[#374151]" : "text-[#9ca3af]"
                    }`}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky Bottom Action Bar ── */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-[#f3f4f6] px-5 py-4 pb-[max(16px,env(safe-area-inset-bottom))]">
        {status === "pending" ? (
          <div className="flex gap-3">
            <button
              onClick={() => {
                onReject();
                onClose();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[14px] border-2 border-[#fecaca] bg-[#fef2f2] cursor-pointer hover:bg-[#fee2e2] active:scale-[0.98] transition-all"
            >
              <X size={18} className="text-[#ef4444]" />
              <span className="font-['Lexend',sans-serif] font-bold text-[15px] text-[#ef4444]">
                Reject
              </span>
            </button>
            <button
              onClick={() => {
                onAccept();
                onClose();
              }}
              className="flex-[1.5] flex items-center justify-center gap-2 py-3.5 rounded-[14px] bg-[#22c55e] cursor-pointer hover:bg-[#16a34a] active:scale-[0.98] transition-all shadow-[0px_4px_16px_-2px_rgba(34,197,94,0.4)]"
            >
              <CheckCircle2 size={18} className="text-white" />
              <span className="font-['Lexend',sans-serif] font-bold text-[15px] text-white">
                Accept Bid
              </span>
            </button>
          </div>
        ) : (
          <div
            className={`flex items-center justify-center gap-2 py-3.5 rounded-[14px] ${
              status === "accepted"
                ? "bg-[#dcfce7] border border-[#bbf7d0]"
                : "bg-[#fef2f2] border border-[#fecaca]"
            }`}
          >
            {status === "accepted" ? (
              <CheckCircle2 size={18} className="text-[#22c55e]" />
            ) : (
              <X size={18} className="text-[#ef4444]" />
            )}
            <span
              className={`font-['Lexend',sans-serif] font-bold text-[15px] ${
                status === "accepted"
                  ? "text-[#22c55e]"
                  : "text-[#ef4444]"
              }`}
            >
              {status === "accepted"
                ? "Bid Accepted"
                : "Bid Rejected"}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
