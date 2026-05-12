import { useState, useRef, useEffect } from "react";
import {
  Search,
  ArrowLeft,
} from "lucide-react";
import svgPaths from "../../../imports/svg-zdwmi91rdf";
import chatSvgPaths from "../../../imports/svg-6cbwsvbvc1";
import headerSvgPaths from "../../../imports/svg-q58z9bynfm";
import inputSvgPaths from "../../../imports/svg-cjrq1vd87y";
import imgDoctorAvatar from "figma:asset/9993cb21c2b590b10a8340e790d7b18afe9e7dc6.png";
import imgOverlayImage from "figma:asset/ea1647a0fa0c866a7d71d5f9feeeadf8c374265d.png";
import imgHeaderAvatar from "figma:asset/60c32ee24ed0badb8d0109d61574ae6a3d23a828.png";

// ─── Types ───
interface Message {
  id: string;
  text: string;
  time: string;
  fromMe: boolean;
  status?: "sent" | "delivered" | "read";
  arrivalCard?: {
    estArrival: string;
    distance: string;
  };
}

interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
  initialsColor: string;
  initialsBg: string;
  lastMessage: string;
  time: string;
  unread: number;
  online?: boolean;
  role?: string;
  messages: Message[];
  arrivalInfo?: string;
}

// ─── Mock Data ───
const conversations: Conversation[] = [
  {
    id: "1",
    name: "Dr. Sarah Smith",
    avatar: imgHeaderAvatar,
    initials: "SS",
    initialsColor: "#0055d4",
    initialsBg: "#eff6ff",
    lastMessage: "Just your previous medical records if you have them handy.",
    time: "10m",
    unread: 2,
    online: true,
    role: "General Practitioner",
    arrivalInfo: "Arriving in 5 mins",
    messages: [
      { id: "m1", text: "Hello! I'm reviewing your file now. I'll be heading over to your location shortly for the check-up.", time: "9:41 AM", fromMe: false },
      { id: "m2", text: "Hi Dr. Smith! Thanks for letting me know. Is there anything specific I should prepare?", time: "9:45 AM", fromMe: true, status: "read" },
      { id: "m3", text: "Just your previous medical records if you have them handy. I'm on my way now!", time: "9:50 AM", fromMe: false, arrivalCard: { estArrival: "10 mins", distance: "2.4 km" } },
      { id: "m4", text: "Got it. See you soon!", time: "10:05 AM", fromMe: true, status: "read" },
    ],
  },
  {
    id: "2",
    name: "Care Center Support",
    initials: "CC",
    initialsColor: "#0055d4",
    initialsBg: "#eff6ff",
    lastMessage: "How can we help you today?",
    time: "2d",
    unread: 1,
    online: true,
    role: "Support Team",
    messages: [
      { id: "m1", text: "Hello! Welcome to EaseCare Support. 👋", time: "10:00 AM", fromMe: false },
      { id: "m2", text: "How can we help you today?", time: "10:01 AM", fromMe: false },
    ],
  },
  {
    id: "3",
    name: "Priya Sharma",
    initials: "PS",
    initialsColor: "#7c3aed",
    initialsBg: "#f5f3ff",
    lastMessage: "Your mother's vitals are looking great today!",
    time: "5h",
    unread: 0,
    online: true,
    role: "Assigned Caregiver",
    messages: [
      { id: "m1", text: "Good morning! I've arrived at your mother's place.", time: "8:00 AM", fromMe: false },
      { id: "m2", text: "Thank you Priya! How is she doing today?", time: "8:15 AM", fromMe: true, status: "read" },
      { id: "m3", text: "She's in great spirits! We just finished her morning exercises.", time: "9:30 AM", fromMe: false },
      { id: "m4", text: "Your mother's vitals are looking great today!", time: "10:45 AM", fromMe: false },
    ],
  },
  {
    id: "4",
    name: "Dr. Rajesh Kumar",
    initials: "RK",
    initialsColor: "#059669",
    initialsBg: "#ecfdf5",
    lastMessage: "Next appointment is scheduled for March 5th.",
    time: "1w",
    unread: 0,
    online: false,
    role: "Physiotherapist",
    messages: [
      { id: "m1", text: "Hello! I've reviewed the therapy progress report.", time: "Mon", fromMe: false },
      { id: "m2", text: "Great improvement in mobility this week.", time: "Mon", fromMe: false },
      { id: "m3", text: "That's wonderful to hear, Doctor!", time: "Mon", fromMe: true, status: "read" },
      { id: "m4", text: "Should we adjust the exercise routine?", time: "Mon", fromMe: true, status: "read" },
      { id: "m5", text: "Let's keep the current routine for now. Next appointment is scheduled for March 5th.", time: "Tue", fromMe: false },
    ],
  },
  {
    id: "5",
    name: "HomeCare Agency",
    initials: "HC",
    initialsColor: "#d97706",
    initialsBg: "#fffbeb",
    lastMessage: "Your booking #EC2045 has been confirmed.",
    time: "2w",
    unread: 0,
    online: false,
    role: "Agency",
    messages: [
      { id: "m1", text: "Your booking #EC2045 has been confirmed.", time: "Feb 10", fromMe: false },
      { id: "m2", text: "Caregiver Priya Sharma will arrive at 8:00 AM.", time: "Feb 10", fromMe: false },
      { id: "m3", text: "Thank you for the update!", time: "Feb 10", fromMe: true, status: "read" },
    ],
  },
];

type FilterTab = "all" | "unread" | "archived";

// ─── Avatar Component ───
function ConversationAvatar({
  conv,
  size = 48,
}: {
  conv: Conversation;
  size?: number;
}) {
  return (
    <div className="relative shrink-0">
      {conv.avatar ? (
        <div
          className="rounded-full overflow-hidden"
          style={{ width: size, height: size }}
        >
          <img src={conv.avatar} alt={conv.name} className="size-full object-cover" />
        </div>
      ) : (
        <div
          className="rounded-full flex items-center justify-center"
          style={{
            width: size,
            height: size,
            backgroundColor: conv.initialsBg,
            boxShadow: `0 0 0 1px ${conv.initialsBg}`,
          }}
        >
          <span
            className="font-['Inter',sans-serif] font-bold"
            style={{
              color: conv.initialsColor,
              fontSize: size * 0.29,
            }}
          >
            {conv.initials}
          </span>
        </div>
      )}
      {conv.online && (
        <div
          className="absolute bottom-0 right-0 bg-[#22c55e] rounded-full border-2 border-white"
          style={{ width: size * 0.25, height: size * 0.25 }}
        />
      )}
    </div>
  );
}

// ─── Chat Bubble Avatar (small, for received messages) ───
function ChatAvatar({ conv }: { conv: Conversation }) {
  const avatarSrc = conv.id === "1" ? imgDoctorAvatar : conv.avatar;
  return (
    <div className="flex flex-col items-end pb-[4px] shrink-0 w-[32px] self-end">
      <div className="relative rounded-full shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] size-[32px] overflow-hidden">
        {avatarSrc ? (
          <img src={avatarSrc} alt="" className="size-full object-cover rounded-full" />
        ) : (
          <div
            className="size-full rounded-full flex items-center justify-center"
            style={{ backgroundColor: conv.initialsBg }}
          >
            <span
              className="font-['Inter',sans-serif] font-bold text-[10px]"
              style={{ color: conv.initialsColor }}
            >
              {conv.initials}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Arrival Card ───
function ArrivalCard({ estArrival, distance }: { estArrival: string; distance: string }) {
  return (
    <div className="bg-white flex flex-col gap-[12px] items-start p-[13px] rounded-[12px] w-full relative">
      <div aria-hidden="true" className="absolute border border-[rgba(226,232,240,0.6)] inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      {/* Map preview */}
      <div className="bg-[#f1f5f9] h-[112px] relative rounded-[8px] w-full overflow-hidden">
        <div className="absolute inset-px opacity-90">
          <div className="absolute inset-0 overflow-hidden">
            <img alt="" className="absolute h-[236.36%] left-0 max-w-none top-[-68.18%] w-full object-cover" src={imgOverlayImage} />
          </div>
          <div className="absolute bg-[rgba(255,255,255,0.2)] inset-0 mix-blend-saturation" />
        </div>
        {/* Center icon */}
        <div className="absolute inset-px flex items-center justify-center">
          <div className="backdrop-blur-[2px] bg-[#0055d4] flex items-center justify-center p-[4px] rounded-full size-[40px] relative">
            <div aria-hidden="true" className="absolute border-4 border-[rgba(255,255,255,0.3)] inset-0 pointer-events-none rounded-full" />
            <svg width={13.5} height={12} viewBox="0 0 13.5 12" fill="none">
              <path d={chatSvgPaths.p22eb5380} fill="white" />
            </svg>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#f1f5f9] inset-0 pointer-events-none rounded-[8px]" />
      </div>
      {/* Info row */}
      <div className="flex items-center justify-between w-full px-[4px]">
        <div className="flex flex-col gap-[2px]">
          <span className="font-['Inter',sans-serif] font-bold text-[12px] text-[#64748b] uppercase tracking-[0.6px] leading-[16px]">
            Est. Arrival
          </span>
          <span className="font-['Inter',sans-serif] font-bold text-[20px] text-[#0055d4] leading-[28px]">
            {estArrival}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-['Inter',sans-serif] font-medium text-[12px] text-[#64748b] leading-[16px]">
            Distance
          </span>
          <span className="font-['Inter',sans-serif] font-semibold text-[16px] text-[#0f172a] leading-[24px]">
            {distance}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Timestamp Pill ───
function TimestampPill({ time }: { time: string }) {
  return (
    <div className="flex justify-center py-[8px]">
      <div className="bg-white px-[13px] py-[5px] rounded-full relative">
        <div aria-hidden="true" className="absolute border border-[#e2e8f0] inset-0 pointer-events-none rounded-full shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
        <span className="font-['Inter',sans-serif] font-medium text-[12px] text-[#64748b] leading-[16px] relative">
          {time}
        </span>
      </div>
    </div>
  );
}

// ─── Conversation List ───
function ConversationList({
  conversations,
  activeId,
  onSelect,
  search,
  onSearchChange,
  filter,
  onFilterChange,
}: {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  search: string;
  onSearchChange: (v: string) => void;
  filter: FilterTab;
  onFilterChange: (f: FilterTab) => void;
}) {
  const filtered = conversations.filter((c) => {
    if (filter === "unread" && c.unread === 0) return false;
    if (filter === "archived") return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const filters: { key: FilterTab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread" },
    { key: "archived", label: "Archived" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="px-4 md:px-5 pt-4 pb-0">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <svg width={15} height={15} viewBox="0 0 15 15" fill="none">
              <path d={svgPaths.p2dbaedc0} fill="#94A3B8" />
            </svg>
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search conversations"
            className="w-full pl-10 pr-4 py-[11px] bg-white rounded-lg font-['Inter',sans-serif] text-[14px] text-[#0f172a] placeholder-[#94a3b8] outline-none border border-transparent focus:border-[#247BD3]/30 transition-colors"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 px-5 py-3">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => onFilterChange(f.key)}
            className={`px-3 py-[6px] rounded-md font-['Inter',sans-serif] font-medium text-[12px] transition-colors cursor-pointer ${
              filter === f.key
                ? "bg-[#1975d2] text-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                : "bg-white text-[#475569] border border-[#e2e8f0] hover:bg-[#f8fafc]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Conversation Items */}
      <div className="flex-1 overflow-y-auto px-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <div className="size-[56px] rounded-full bg-[#f1f5f9] flex items-center justify-center mb-3">
              <Search size={22} className="text-[#94a3b8]" />
            </div>
            <p className="font-['Inter',sans-serif] font-medium text-[15px] text-[#64748b]">
              {filter === "archived" ? "No archived messages" : "No conversations found"}
            </p>
            <p className="font-['Inter',sans-serif] text-[13px] text-[#94a3b8] mt-1">
              {filter === "archived"
                ? "Archived chats will appear here"
                : "Try a different search term"}
            </p>
          </div>
        ) : (
          filtered.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onSelect(conv.id)}
              className={`w-full flex gap-[14px] items-start p-[13px] rounded-lg transition-colors cursor-pointer ${
                activeId === conv.id
                  ? "bg-[#eff6ff] md:bg-[#f0f7fa]"
                  : "hover:bg-[#f8fafc]"
              }`}
            >
              <ConversationAvatar conv={conv} size={48} />
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between">
                  <h4 className="font-['Inter',sans-serif] font-semibold text-[15px] text-[#0f172a] truncate pr-2">
                    {conv.name}
                  </h4>
                  <span className="font-['Inter',sans-serif] font-medium text-[12px] text-[#94a3b8] shrink-0">
                    {conv.time}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-[2px]">
                  <p className="font-['Inter',sans-serif] text-[14px] text-[#64748b] truncate pr-2">
                    {conv.lastMessage}
                  </p>
                  {conv.unread > 0 && (
                    <span className="shrink-0 bg-[#1975d2] text-white font-['Inter',sans-serif] font-bold text-[11px] rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1.5">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

// ─── Figma-styled Chat Header ───
function ChatHeader({ conv, onBack }: { conv: Conversation; onBack: () => void }) {
  return (
    <div className="bg-white border-b border-[#e2e8f0] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] px-4 md:px-6 py-3 flex items-center gap-4 shrink-0 relative">
      {/* Back button (mobile) */}
      <button
        onClick={onBack}
        className="md:hidden p-1 -ml-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <ArrowLeft size={20} className="text-[#0f172a]" />
      </button>

      {/* Avatar with online dot */}
      <div className="relative shrink-0">
        <div className="rounded-full size-[40px] relative overflow-hidden shadow-[0px_0px_0px_2px_#f8fafc]">
          {conv.avatar ? (
            <img src={conv.avatar} alt={conv.name} className="size-full object-cover" />
          ) : (
            <div
              className="size-full flex items-center justify-center"
              style={{ backgroundColor: conv.initialsBg }}
            >
              <span className="font-['Inter',sans-serif] font-bold text-[12px]" style={{ color: conv.initialsColor }}>
                {conv.initials}
              </span>
            </div>
          )}
        </div>
        {conv.online && (
          <div className="absolute bottom-0 right-0 bg-[#22c55e] rounded-full size-[10px] border-2 border-white" />
        )}
      </div>

      {/* Name + role + online */}
      <div className="flex-1 min-w-0">
        <h3 className="font-['Inter',sans-serif] font-bold text-[18px] text-[#0f172a] truncate leading-[22.5px]">
          {conv.name}
        </h3>
        <div className="flex gap-[8px] items-center mt-[1px]">
          <span className="font-['Inter',sans-serif] font-medium text-[12px] text-[#64748b] leading-[16px]">
            {conv.role || "Offline"}
          </span>
          {conv.online && (
            <>
              <div className="bg-[#cbd5e1] h-[4px] rounded-full w-[2.38px]" />
              <span className="font-['Inter',sans-serif] font-semibold text-[12px] text-[#16a34a] leading-[16px]">
                Online
              </span>
            </>
          )}
        </div>
      </div>

      {/* Right side: arrival badge + actions */}
      <div className="flex gap-[8px] items-center shrink-0">
        {conv.arrivalInfo && (
          <>
            <div className="bg-[#eff6ff] flex gap-[6px] items-center px-[13px] py-[7px] rounded-full relative">
              <div aria-hidden="true" className="absolute border border-[#dbeafe] inset-0 pointer-events-none rounded-full" />
              <svg width={12} height={14} viewBox="0 0 12 14" fill="none">
                <path d={headerSvgPaths.p374d5f00} fill="#1D4ED8" />
              </svg>
              <span className="font-['Inter',sans-serif] font-bold text-[12px] text-[#1d4ed8] leading-[16px]">
                {conv.arrivalInfo}
              </span>
            </div>
            <div className="px-[8px]">
              <div className="bg-[#e2e8f0] h-[24px] w-[0.77px]" />
            </div>
          </>
        )}
        {/* Phone */}
        <button className="flex h-[36px] items-center justify-center rounded-[8px] w-[27.52px] cursor-pointer hover:bg-[#f1f5f9] transition-colors">
          <svg width={15} height={15} viewBox="0 0 15 15" fill="none">
            <path d={headerSvgPaths.p3ca41900} fill="#475569" />
          </svg>
        </button>
        {/* Video */}
        <button className="hidden md:flex h-[36px] items-center justify-center rounded-[8px] w-[27.52px] cursor-pointer hover:bg-[#f1f5f9] transition-colors">
          <svg width={16.667} height={13.333} viewBox="0 0 16.6667 13.3333" fill="none">
            <path d={headerSvgPaths.p2eb9f680} fill="#475569" />
          </svg>
        </button>
        {/* More */}
        <button className="flex h-[36px] items-center justify-center rounded-[8px] w-[27.52px] cursor-pointer hover:bg-[#f1f5f9] transition-colors">
          <svg width={3.333} height={13.333} viewBox="0 0 3.33333 13.3333" fill="none">
            <path d={headerSvgPaths.p246f4800} fill="#475569" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Figma-styled Chat Input ───
function ChatInput({
  value,
  onChange,
  onSend,
  recipientName,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  recipientName: string;
}) {
  return (
    <div className="bg-white px-[16px] pt-[17px] pb-[16px] shrink-0 relative">
      <div className="absolute border-[#e2e8f0] border-t left-0 right-0 top-0 pointer-events-none" />
      <div className="bg-[#f8fafc] rounded-[12px] relative">
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
        <div className="flex gap-[8px] items-end p-[9px]">
          {/* Plus button */}
          <button className="rounded-[8px] size-[40px] flex items-center justify-center shrink-0 cursor-pointer hover:bg-[#f1f5f9] transition-colors">
            <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
              <path d={inputSvgPaths.p2d8e4cc0} fill="#94A3B8" />
            </svg>
          </button>
          {/* Text input */}
          <div className="flex-1 min-h-[44px] flex items-center">
            <input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSend()}
              placeholder={`Type a message to ${recipientName.split(" ").pop()}...`}
              className="w-full bg-transparent font-['Inter',sans-serif] text-[15px] text-[#334155] placeholder-[#94a3b8] outline-none leading-[24px] px-[12px] py-[10px]"
            />
          </div>
          {/* Send button */}
          <button
            onClick={onSend}
            className={`rounded-[8px] size-[40px] flex items-center justify-center shrink-0 cursor-pointer transition-all ${
              value.trim()
                ? "bg-[#0055d4] shadow-[0px_1px_2px_0px_#bfdbfe] hover:bg-[#0048b8] active:scale-95"
                : "bg-[#0055d4]/60"
            }`}
          >
            <svg width={15.833} height={13.333} viewBox="0 0 15.8333 13.3333" fill="none">
              <path d={inputSvgPaths.pf594000} fill="white" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Figma-styled Chat View ───
function ChatView({
  conv,
  onBack,
}: {
  conv: Conversation;
  onBack: () => void;
}) {
  const [newMsg, setNewMsg] = useState("");
  const [messages, setMessages] = useState(conv.messages);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(conv.messages);
  }, [conv.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMsg.trim()) return;
    const msg: Message = {
      id: `m${Date.now()}`,
      text: newMsg.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      fromMe: true,
      status: "sent",
    };
    setMessages((prev) => [...prev, msg]);
    setNewMsg("");
  };

  // Group consecutive messages for avatar display
  const isLastInGroup = (idx: number) => {
    if (idx === messages.length - 1) return true;
    return messages[idx].fromMe !== messages[idx + 1].fromMe;
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f8fb]">
      {/* Header */}
      <ChatHeader conv={conv} onBack={onBack} />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-[24px] py-4">
        {/* Timestamp pill */}
        <TimestampPill time="Today, 9:41 AM" />

        {/* Message bubbles */}
        <div className="space-y-[16px] mt-2">
          {messages.map((msg, idx) => {
            const showAvatar = !msg.fromMe && isLastInGroup(idx);

            if (msg.fromMe) {
              return (
                <div key={msg.id} className="flex flex-col items-end max-w-[275px] ml-auto">
                  <div className="bg-[#0055d4] rounded-tl-[16px] rounded-tr-[16px] rounded-bl-[16px] rounded-br-[2px] relative px-[16px] py-[16px]">
                    <div className="absolute bg-[rgba(255,255,255,0)] inset-0 shadow-[0px_4px_6px_-1px_rgba(59,130,246,0.1),0px_2px_4px_-2px_rgba(59,130,246,0.1)]" />
                    <p className="font-['Inter',sans-serif] text-[15px] text-white leading-[24.38px] relative">
                      {msg.text}
                    </p>
                  </div>
                  {/* Read receipt */}
                  {msg.status === "read" && isLastInGroup(idx) && (
                    <div className="flex gap-[4px] items-center mt-[4px]">
                      <span className="font-['Inter',sans-serif] font-medium text-[11px] text-[#94a3b8] leading-[16.5px]">
                        Read {msg.time}
                      </span>
                      <svg width={12.775} height={7.015} viewBox="0 0 12.775 7.01458" fill="none">
                        <path d={chatSvgPaths.pfb5e518} fill="#0055D4" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            }

            // Received message
            return (
              <div key={msg.id} className="flex gap-[16px] items-end max-w-[275px]">
                {/* Avatar column */}
                <div className="w-[32px] shrink-0">
                  {showAvatar ? (
                    <ChatAvatar conv={conv} />
                  ) : (
                    <div className="w-[32px]" />
                  )}
                </div>
                {/* Bubble + optional card */}
                <div className="flex flex-col gap-[8px] flex-1 min-w-0">
                  <div className="bg-white rounded-tl-[16px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[2px] relative">
                    <div aria-hidden="true" className="absolute border border-[rgba(226,232,240,0.6)] inset-0 pointer-events-none rounded-tl-[16px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[2px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
                    <div className="p-[17px]">
                      <p className="font-['Inter',sans-serif] text-[15px] text-[#334155] leading-[24.38px]">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                  {msg.arrivalCard && (
                    <ArrivalCard
                      estArrival={msg.arrivalCard.estArrival}
                      distance={msg.arrivalCard.distance}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <ChatInput
        value={newMsg}
        onChange={setNewMsg}
        onSend={handleSend}
        recipientName={conv.name}
      />
    </div>
  );
}

// ─── Empty State ───
function EmptyChatState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#fafbfc] px-8">
      <div className="size-[72px] rounded-full bg-[#eff6ff] flex items-center justify-center mb-5">
        <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
          <path d={inputSvgPaths.p2d8e4cc0} fill="#1975d2" />
        </svg>
      </div>
      <h3 className="font-['Inter',sans-serif] font-semibold text-[18px] text-[#0f172a] mb-2">
        Your Messages
      </h3>
      <p className="font-['Inter',sans-serif] text-[14px] text-[#64748b] text-center max-w-[280px]">
        Select a conversation to start chatting with care providers and support.
      </p>
    </div>
  );
}

// ─── Main Messages Page ───
export function MessagesPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterTab>("all");

  const activeConv = conversations.find((c) => c.id === activeId) || null;

  return (
    <main className="flex-1 flex flex-col md:flex-row pb-[84px] md:pb-0 overflow-hidden" style={{ height: "calc(100vh - 72px)" }}>
      {/* ─── Conversation List Panel ─── */}
      <div
        className={`w-full md:w-[360px] lg:w-[400px] md:shrink-0 md:border-r md:border-[#f1f5f9] bg-[#f6f8fc] md:bg-[#f9fafb] flex flex-col overflow-hidden ${
          activeId ? "hidden md:flex" : "flex"
        }`}
      >
        {/* Unread count — desktop only, replaces old title row */}
        <div className="hidden md:flex items-center justify-end px-5 pt-4 pb-1">
          <span className="font-['Inter',sans-serif] text-[12px] text-[#94a3b8]">
            {conversations.filter((c) => c.unread > 0).length} unread
          </span>
        </div>

        <ConversationList
          conversations={conversations}
          activeId={activeId}
          onSelect={setActiveId}
          search={search}
          onSearchChange={setSearch}
          filter={filter}
          onFilterChange={setFilter}
        />
      </div>

      {/* ─── Chat Panel ─── */}
      <div
        className={`flex-1 flex flex-col overflow-hidden ${
          activeId ? "flex" : "hidden md:flex"
        }`}
      >
        {activeConv ? (
          <ChatView conv={activeConv} onBack={() => setActiveId(null)} />
        ) : (
          <EmptyChatState />
        )}
      </div>
    </main>
  );
}