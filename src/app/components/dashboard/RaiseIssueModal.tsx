import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useModalOverlay } from "../../context/ModalContext";
import {
  X,
  Send,
  ChevronDown,
  Upload,
  AlertTriangle,
  AlertCircle,
  Info,
  ImageIcon,
  File,
  CheckCircle2,
  MessageCircle,
  Paperclip,
} from "lucide-react";
import svgPaths from "../../../imports/svg-8dbc8mlgkr";
import { PrimaryButton } from "../shared/PrimaryButton";

// ─── Types ───
type Priority = "urgent" | "high" | "normal";
type IssueCategory =
  | ""
  | "service_quality"
  | "billing"
  | "safety"
  | "punctuality"
  | "misconduct"
  | "other";

interface TicketInfo {
  ticketId: string;
  priority: Priority;
  category: string;
  description: string;
  bookingId: string;
  providerName: string;
}

interface ChatMessage {
  id: number;
  text: string;
  sender: "user" | "support";
  time: string;
}

const CATEGORY_OPTIONS: { value: IssueCategory; label: string }[] = [
  { value: "", label: "Select an issue category" },
  { value: "service_quality", label: "Poor Service Quality" },
  { value: "billing", label: "Billing / Payment Issue" },
  { value: "safety", label: "Safety Concern" },
  { value: "punctuality", label: "Late Arrival / No Show" },
  { value: "misconduct", label: "Unprofessional Behavior" },
  { value: "other", label: "Other" },
];

const CATEGORY_LABELS: Record<string, string> = {
  service_quality: "Poor Service Quality",
  billing: "Billing / Payment Issue",
  safety: "Safety Concern",
  punctuality: "Late Arrival / No Show",
  misconduct: "Unprofessional Behavior",
  other: "Other",
};

// ─── Priority Pill ───
function PriorityPill({
  type,
  selected,
  onClick,
}: {
  type: Priority;
  selected: boolean;
  onClick: () => void;
}) {
  const config = {
    urgent: {
      bg: selected ? "bg-[#fee2e2]" : "bg-[#fef2f2]",
      border: selected ? "border-[#ef4444]" : "border-transparent",
      text: "text-[#ef4444]",
      label: "Urgent",
      iconPath: svgPaths.p1a7e4c60,
      iconColor: "#EF4444",
      iconViewBox: "0 0 18.3333 15.8333",
      iconW: 16,
      iconH: 14,
    },
    high: {
      bg: selected ? "bg-[#fff7ed]" : "bg-[#fff7ed]",
      border: selected ? "border-[#ea580c]" : "border-transparent",
      text: "text-[#ea580c]",
      label: "High",
      iconPath: svgPaths.p1a723780,
      iconColor: "#EA580C",
      iconViewBox: "0 0 3.33333 15",
      iconW: 4,
      iconH: 15,
    },
    normal: {
      bg: selected ? "bg-[#eff6ff]" : "bg-[#eff6ff]",
      border: selected ? "border-[#2563eb]" : "border-transparent",
      text: "text-[#2563eb]",
      label: "Normal",
      iconPath: svgPaths.p2f915d80,
      iconColor: "#2563EB",
      iconViewBox: "0 0 16.6667 16.6667",
      iconW: 15,
      iconH: 15,
    },
  };

  const c = config[type];

  return (
    <button
      onClick={onClick}
      className={`relative flex-1 ${c.bg} rounded-[24px] border-2 ${c.border} flex items-center justify-center gap-2 py-3.5 cursor-pointer transition-all active:scale-[0.97]`}
    >
      <svg
        width={c.iconW}
        height={c.iconH}
        viewBox={c.iconViewBox}
        fill="none"
      >
        <path d={c.iconPath} fill={c.iconColor} />
      </svg>
      <span
        className={`font-['Lexend',sans-serif] font-bold text-[14px] ${c.text}`}
      >
        {c.label}
      </span>
      {selected && (
        <div className="absolute -top-2 -right-1">
          <svg width={14} height={11} viewBox="0 0 13.5083 11.0146" fill="none">
            <rect
              fill={c.iconColor}
              height="11.0146"
              rx="5.50729"
              width="13.5083"
            />
            <path d={svgPaths.p340c2300} fill="white" />
          </svg>
        </div>
      )}
    </button>
  );
}

// ─── Raise Issue Modal ───
export function RaiseIssueModal({
  isOpen,
  onClose,
  onSubmit,
  bookingId,
  providerName,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (ticket: TicketInfo) => void;
  bookingId: string;
  providerName: string;
}) {
  useModalOverlay(isOpen);
  const [priority, setPriority] = useState<Priority>("urgent");
  const [category, setCategory] = useState<IssueCategory>("");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const charCount = description.length;
  const canSubmit = category !== "" && description.trim().length >= 10;

  const handleSubmit = () => {
    const ticketId = `EC-${Date.now().toString().slice(-6)}`;
    onSubmit({
      ticketId,
      priority,
      category: CATEGORY_LABELS[category] || category,
      description,
      bookingId,
      providerName,
    });
  };

  const handleFilePick = () => {
    // Mock: just add a fake filename
    setAttachments((prev) => [
      ...prev,
      `evidence_${prev.length + 1}.jpg`,
    ]);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center px-4"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: "spring", damping: 26, stiffness: 300 }}
        className="relative bg-white rounded-[16px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] w-full max-w-[464px] max-h-[90vh] flex flex-col overflow-hidden"
        style={{ willChange: "transform, opacity" }}
      >
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-[#f1f5f9] flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-['Lexend',sans-serif] font-bold text-[20px] text-[#0f172a] leading-[28px]">
              Raise an Issue
            </h2>
            <p className="font-['Inter',sans-serif] text-[14px] text-[#5f838c] leading-[20px] mt-1">
              Report a concern or incident for review.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-[16px] cursor-pointer hover:bg-[#f1f5f9] transition-colors"
          >
            <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
              <path d={svgPaths.p15494480} fill="#5F838C" />
            </svg>
          </button>
        </div>

        {/* Body - scrollable */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-5 space-y-6">
          {/* Priority */}
          <div>
            <label className="font-['Lexend',sans-serif] font-semibold text-[14px] text-[#334155] leading-[20px] block mb-3">
              Priority Level
            </label>
            <div className="flex gap-3">
              {(["urgent", "high", "normal"] as Priority[]).map((p) => (
                <PriorityPill
                  key={p}
                  type={p}
                  selected={priority === p}
                  onClick={() => setPriority(p)}
                />
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="font-['Lexend',sans-serif] font-semibold text-[14px] text-[#334155] leading-[20px] block mb-2">
              Category
            </label>
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full bg-[#f5f8f8] border border-[#e2e8f0] rounded-[24px] px-4 py-3 flex items-center justify-between cursor-pointer transition-colors hover:border-[#cbd5e1]"
              >
                <span
                  className={`font-['Inter',sans-serif] text-[14px] leading-[20px] ${
                    category ? "text-[#0f172a]" : "text-[#5f838c]"
                  }`}
                >
                  {category
                    ? CATEGORY_LABELS[category]
                    : "Select an issue category"}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-[#6b7280] transition-transform ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-[#e2e8f0] rounded-[16px] shadow-[0px_8px_24px_-4px_rgba(0,0,0,0.1)] overflow-hidden"
                  >
                    {CATEGORY_OPTIONS.filter((o) => o.value !== "").map(
                      (option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setCategory(option.value);
                            setShowDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-3 font-['Inter',sans-serif] text-[14px] cursor-pointer transition-colors ${
                            category === option.value
                              ? "bg-[#EBF3FC] text-[#1975D2] font-medium"
                              : "text-[#374151] hover:bg-[#f9fafb]"
                          }`}
                        >
                          {option.label}
                        </button>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="font-['Lexend',sans-serif] font-semibold text-[14px] text-[#334155] leading-[20px] block mb-2">
              Detailed Description
            </label>
            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value.slice(0, 500))
              }
              placeholder="Describe the issue in detail including time, location, and individuals involved..."
              className="w-full bg-[#f5f8f8] border border-[#e2e8f0] rounded-[24px] px-4 py-3 font-['Inter',sans-serif] text-[14px] text-[#0f172a] placeholder:text-[#5f838c] leading-[20px] resize-none h-[120px] outline-none focus:border-[#1975D2] transition-colors"
            />
            <div className="flex justify-end mt-1">
              <span className="font-['Inter',sans-serif] font-medium text-[12px] text-[#5f838c]">
                {charCount} / 500 characters
              </span>
            </div>
          </div>

          {/* Attach Evidence */}
          <div>
            <label className="font-['Lexend',sans-serif] font-semibold text-[14px] text-[#334155] leading-[20px] block mb-2">
              Attach Evidence
            </label>

            {/* Uploaded files */}
            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {attachments.map((file, idx) => (
                  <div
                    key={idx}
                    className="bg-[#EBF3FC] rounded-[8px] px-3 py-1.5 flex items-center gap-1.5"
                  >
                    <File size={12} className="text-[#1975D2]" />
                    <span className="font-['Inter',sans-serif] text-[12px] text-[#1975D2]">
                      {file}
                    </span>
                    <button
                      onClick={() =>
                        setAttachments((prev) =>
                          prev.filter((_, i) => i !== idx)
                        )
                      }
                      className="cursor-pointer"
                    >
                      <X size={10} className="text-[#1975D2]" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload area */}
            <button
              onClick={handleFilePick}
              className="w-full border-2 border-dashed border-[#e2e8f0] rounded-[24px] py-6 flex flex-col items-center gap-2 cursor-pointer hover:border-[#cbd5e1] hover:bg-[#fafbfc] transition-colors"
            >
              <div className="size-[48px] rounded-full bg-[#f1f5f9] flex items-center justify-center">
                <svg
                  width={22}
                  height={16}
                  viewBox="0 0 22 16"
                  fill="none"
                >
                  <path d={svgPaths.p11e8dc00} fill="#5F838C" />
                </svg>
              </div>
              <span className="font-['Inter',sans-serif] font-medium text-[14px] text-[#0f172a]">
                Click to upload or drag and drop
              </span>
              <span className="font-['Inter',sans-serif] text-[12px] text-[#5f838c]">
                SVG, PNG, JPG or PDF (max. 10MB)
              </span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#f8fafc] border-t border-[#f1f5f9] flex items-center justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="bg-white border border-[#e2e8f0] rounded-[24px] px-5 py-2.5 font-['Inter',sans-serif] font-medium text-[14px] text-[#334155] cursor-pointer shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:bg-[#f9fafb] transition-colors active:scale-[0.98]"
          >
            Cancel
          </button>
          <PrimaryButton
            onClick={() => {
              if (!category) {
                alert("Please select an issue category.");
                return;
              }
              if (description.trim().length < 10) {
                alert("Please add a description (at least 10 characters).");
                return;
              }
              handleSubmit();
            }}
            disabled={!canSubmit}
          >
            Submit Issue
            <svg
              width={14}
              height={12}
              viewBox="0 0 14.25 12"
              fill="none"
            >
              <path d={svgPaths.p17041b00} fill="white" />
            </svg>
          </PrimaryButton>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Issue Submitted Alert ───
export function IssueSubmittedAlert({
  ticket,
  onOpenChat,
  onClose,
}: {
  ticket: TicketInfo;
  onOpenChat: () => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[65] flex items-center justify-center px-6"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 20 }}
        transition={{ type: "spring", damping: 24, stiffness: 280 }}
        className="relative bg-white rounded-[24px] w-full max-w-[380px] p-7 flex flex-col items-center text-center shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.2)]"
      >
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            damping: 12,
            stiffness: 200,
            delay: 0.1,
          }}
          className="size-[72px] rounded-full bg-[#dcfce7] flex items-center justify-center mb-5"
        >
          <CheckCircle2 size={36} className="text-[#22c55e]" />
        </motion.div>

        <h3 className="font-['Lexend',sans-serif] font-bold text-[22px] text-[#0f172a] leading-[28px] mb-2">
          Issue Submitted!
        </h3>
        <p className="font-['Inter',sans-serif] text-[14px] text-[#64748b] leading-[22px] mb-1">
          Your concern has been registered.
        </p>

        {/* Ticket details */}
        <div className="bg-[#f8fafc] rounded-[16px] w-full p-4 mt-4 mb-6 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-['Inter',sans-serif] text-[13px] text-[#64748b]">
              Ticket ID
            </span>
            <span className="font-['Lexend',sans-serif] font-bold text-[14px] text-[#0f172a]">
              {ticket.ticketId}
            </span>
          </div>
          <div className="h-px bg-[#e2e8f0]" />
          <div className="flex items-center justify-between">
            <span className="font-['Inter',sans-serif] text-[13px] text-[#64748b]">
              Priority
            </span>
            <span
              className={`font-['Lexend',sans-serif] font-bold text-[13px] capitalize ${
                ticket.priority === "urgent"
                  ? "text-[#ef4444]"
                  : ticket.priority === "high"
                    ? "text-[#ea580c]"
                    : "text-[#2563eb]"
              }`}
            >
              {ticket.priority}
            </span>
          </div>
          <div className="h-px bg-[#e2e8f0]" />
          <div className="flex items-center justify-between">
            <span className="font-['Inter',sans-serif] text-[13px] text-[#64748b]">
              Category
            </span>
            <span className="font-['Inter',sans-serif] font-medium text-[13px] text-[#0f172a]">
              {ticket.category}
            </span>
          </div>
          <div className="h-px bg-[#e2e8f0]" />
          <div className="flex items-center justify-between">
            <span className="font-['Inter',sans-serif] text-[13px] text-[#64748b]">
              ETA
            </span>
            <span className="font-['Inter',sans-serif] font-medium text-[13px] text-[#22c55e]">
              Within 24 hours
            </span>
          </div>
        </div>

        <p className="font-['Inter',sans-serif] text-[13px] text-[#64748b] leading-[20px] mb-5">
          Our support team will review your issue. You can continue the conversation in the chat.
        </p>

        <div className="flex gap-3 w-full">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-[14px] border border-[#e2e8f0] font-['Inter',sans-serif] font-medium text-[14px] text-[#334155] cursor-pointer hover:bg-[#f9fafb] transition-colors active:scale-[0.98]"
          >
            Close
          </button>
          <PrimaryButton
            onClick={onOpenChat}
            fullWidth={false}
            compact
            className="flex-1"
          >
            <MessageCircle size={16} />
            Open Chat
          </PrimaryButton>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Support Chat Modal ───
export function SupportChatModal({
  isOpen,
  onClose,
  ticket,
}: {
  isOpen: boolean;
  onClose: () => void;
  ticket: TicketInfo;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial messages on open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setMessages([
        {
          id: 1,
          text: `Hi! Your issue ${ticket.ticketId} regarding "${ticket.category}" has been received. A support agent will be with you shortly.`,
          sender: "support",
          time: timeStr,
        },
        {
          id: 2,
          text: `This is a ${ticket.priority} priority ticket. We aim to respond within ${ticket.priority === "urgent" ? "1 hour" : ticket.priority === "high" ? "4 hours" : "24 hours"}.`,
          sender: "support",
          time: timeStr,
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = useCallback(() => {
    if (!input.trim()) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: input.trim(), sender: "user", time: timeStr },
    ]);
    setInput("");

    // Simulated support response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        `Thank you for providing that information about your issue with ${ticket.providerName}. Let me look into this right away.`,
        "I understand your concern. Our team is investigating this matter and will take appropriate action.",
        "I've escalated this to the relevant department. You'll receive an update via notification.",
        "Is there anything else you'd like to add to this report? We want to make sure we have all the details.",
        "I can see the booking details. We'll ensure this is resolved to your satisfaction.",
      ];
      const reply =
        responses[Math.floor(Math.random() * responses.length)];
      const replyTime = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: reply,
          sender: "support",
          time: replyTime,
        },
      ]);
    }, 1500 + Math.random() * 1000);
  }, [input, ticket.providerName]);

  const quickReplies = [
    "Share more details",
    "Request a callback",
    "Escalate this issue",
    "Check status",
  ];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[65] flex flex-col bg-white"
    >
      {/* Header */}
      <div className="shrink-0 bg-white border-b border-[#f1f5f9] px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="size-10 rounded-full bg-[#f3f4f6] flex items-center justify-center cursor-pointer hover:bg-[#e5e7eb] transition-colors active:scale-[0.95]"
          >
            <X size={18} className="text-[#374151]" />
          </button>
          <div className="flex-1">
            <h2 className="font-['Lexend',sans-serif] font-bold text-[16px] text-[#0f172a]">
              Support Chat
            </h2>
            <p className="font-['Inter',sans-serif] text-[12px] text-[#64748b]">
              Ticket {ticket.ticketId}
            </p>
          </div>
          <div
            className={`px-2.5 py-1 rounded-full border ${
              ticket.priority === "urgent"
                ? "bg-[#fef2f2] border-[#fecaca] text-[#ef4444]"
                : ticket.priority === "high"
                  ? "bg-[#fff7ed] border-[#fed7aa] text-[#ea580c]"
                  : "bg-[#eff6ff] border-[#bfdbfe] text-[#2563eb]"
            }`}
          >
            <span className="font-['Inter',sans-serif] font-semibold text-[11px] capitalize">
              {ticket.priority}
            </span>
          </div>
        </div>

        {/* Ticket context */}
        <div className="mt-3 bg-[#f8fafc] rounded-[12px] px-3.5 py-2.5 flex items-center gap-2.5">
          <AlertCircle size={14} className="text-[#64748b] shrink-0" />
          <p className="font-['Inter',sans-serif] text-[12px] text-[#64748b] flex-1 truncate">
            {ticket.category} &bull; Booking with {ticket.providerName}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3 no-scrollbar"
      >
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
            }}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-[18px] px-4 py-2.5 ${
                msg.sender === "user"
                  ? "bg-[#1975D2] text-white rounded-br-[4px]"
                  : "bg-[#f3f4f6] text-[#374151] rounded-bl-[4px]"
              }`}
            >
              <p className="font-['Inter',sans-serif] text-[14px] leading-[21px]">
                {msg.text}
              </p>
              <p
                className={`font-['Inter',sans-serif] text-[10px] mt-1 ${
                  msg.sender === "user"
                    ? "text-white/60"
                    : "text-[#9ca3af]"
                }`}
              >
                {msg.time}
              </p>
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex justify-start"
            >
              <div className="bg-[#f3f4f6] rounded-[18px] rounded-bl-[4px] px-4 py-3 flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="size-[7px] rounded-full bg-[#9ca3af]"
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick replies */}
      {messages.length <= 3 && (
        <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => {
                setInput(reply);
                setTimeout(() => handleSend(), 50);
              }}
              className="shrink-0 bg-white border border-[#e5e7eb] rounded-full px-3.5 py-2 font-['Inter',sans-serif] text-[13px] text-[#374151] cursor-pointer hover:bg-[#f9fafb] hover:border-[#1975D2] hover:text-[#1975D2] transition-colors whitespace-nowrap active:scale-[0.97]"
            >
              {reply}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="shrink-0 bg-white border-t border-[#f1f5f9] px-4 py-3 pb-[max(12px,env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-2">
          <button className="size-10 rounded-full bg-[#f3f4f6] flex items-center justify-center cursor-pointer hover:bg-[#e5e7eb] transition-colors shrink-0">
            <Paperclip size={18} className="text-[#6b7280]" />
          </button>
          <div className="flex-1 bg-[#f3f4f6] rounded-full px-4 py-2.5 flex items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-transparent font-['Inter',sans-serif] text-[14px] text-[#111827] placeholder:text-[#9ca3af] outline-none"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`size-10 rounded-full flex items-center justify-center cursor-pointer transition-all active:scale-[0.93] shrink-0 ${
              input.trim()
                ? "bg-[#1975D2] shadow-[0px_2px_8px_rgba(25,117,210,0.3)]"
                : "bg-[#e5e7eb]"
            }`}
          >
            <Send
              size={16}
              className={input.trim() ? "text-white" : "text-[#9ca3af]"}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Sticky Ticket Card (for History page) ───
export function StickyTicketCard({
  ticket,
  onOpenChat,
}: {
  ticket: TicketInfo;
  onOpenChat: () => void;
}) {
  return (
    <>
      {/* Mobile sticky ticket */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 22, stiffness: 280 }}
        className="md:hidden fixed bottom-[90px] left-4 right-4 z-[40] max-w-[400px] mx-auto"
      >
        <div className="bg-white rounded-[16px] border border-[#e5e7eb] shadow-[0px_8px_30px_-4px_rgba(0,0,0,0.12)] px-4 py-3.5 flex items-center gap-3">
          {/* Status dot */}
          <div className="relative shrink-0">
            <div
              className={`size-[10px] rounded-full ${
                ticket.priority === "urgent"
                  ? "bg-[#ef4444]"
                  : ticket.priority === "high"
                    ? "bg-[#ea580c]"
                    : "bg-[#2563eb]"
              }`}
            />
            <div
              className={`absolute inset-0 rounded-full animate-ping ${
                ticket.priority === "urgent"
                  ? "bg-[#ef4444]/40"
                  : ticket.priority === "high"
                    ? "bg-[#ea580c]/40"
                    : "bg-[#2563eb]/40"
              }`}
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-['Lexend',sans-serif] font-bold text-[13px] text-[#0f172a]">
                Ticket Open
              </span>
              <span
                className={`font-['Inter',sans-serif] font-semibold text-[11px] capitalize px-1.5 py-0.5 rounded-[4px] ${
                  ticket.priority === "urgent"
                    ? "bg-[#fef2f2] text-[#ef4444]"
                    : ticket.priority === "high"
                      ? "bg-[#fff7ed] text-[#ea580c]"
                      : "bg-[#eff6ff] text-[#2563eb]"
                }`}
              >
                {ticket.priority}
              </span>
            </div>
            <p className="font-['Inter',sans-serif] text-[12px] text-[#64748b] mt-0.5 truncate">
              {ticket.ticketId} &bull; {ticket.category}
            </p>
          </div>

          {/* Chat CTA */}
          <button
            onClick={onOpenChat}
            className="bg-[#1975D2] rounded-[10px] px-4 py-2.5 flex items-center gap-1.5 cursor-pointer shadow-[0px_2px_8px_rgba(25,117,210,0.25)] hover:bg-[#1565C0] transition-colors active:scale-[0.97] shrink-0"
          >
            <MessageCircle size={14} className="text-white" />
            <span className="font-['Inter',sans-serif] font-semibold text-[13px] text-white">
              Chat
            </span>
          </button>
        </div>
      </motion.div>

      {/* Desktop sidebar sticky ticket */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 22, stiffness: 280 }}
        className="hidden md:block fixed bottom-4 left-3 w-[236px] z-[40]"
      >
        <button
          onClick={onOpenChat}
          className="w-full bg-white rounded-[16px] border border-[#e5e7eb] shadow-[0px_8px_30px_-4px_rgba(0,0,0,0.12)] p-3.5 flex flex-col gap-2.5 cursor-pointer hover:border-[#cbd5e1] active:scale-[0.98] transition-all group text-left"
        >
          {/* Top row */}
          <div className="flex items-center gap-2.5 w-full">
            <div className="relative shrink-0">
              <div
                className={`size-[8px] rounded-full ${
                  ticket.priority === "urgent"
                    ? "bg-[#ef4444]"
                    : ticket.priority === "high"
                      ? "bg-[#ea580c]"
                      : "bg-[#2563eb]"
                }`}
              />
              <div
                className={`absolute inset-0 rounded-full animate-ping ${
                  ticket.priority === "urgent"
                    ? "bg-[#ef4444]/40"
                    : ticket.priority === "high"
                      ? "bg-[#ea580c]/40"
                      : "bg-[#2563eb]/40"
                }`}
              />
            </div>
            <span className="font-['Lexend',sans-serif] font-bold text-[12px] text-[#0f172a]">
              Ticket Open
            </span>
            <span
              className={`font-['Inter',sans-serif] font-semibold text-[10px] capitalize px-1.5 py-0.5 rounded-[4px] ml-auto ${
                ticket.priority === "urgent"
                  ? "bg-[#fef2f2] text-[#ef4444]"
                  : ticket.priority === "high"
                    ? "bg-[#fff7ed] text-[#ea580c]"
                    : "bg-[#eff6ff] text-[#2563eb]"
              }`}
            >
              {ticket.priority}
            </span>
          </div>

          {/* Ticket info */}
          <p className="font-['Inter',sans-serif] text-[11px] text-[#64748b] truncate w-full">
            {ticket.ticketId} &bull; {ticket.category}
          </p>

          {/* Chat pill */}
          <div className="w-full bg-[#1975D2] rounded-[10px] py-2 flex items-center justify-center gap-1.5 shadow-[0px_2px_8px_rgba(25,117,210,0.25)] group-hover:bg-[#1565C0] transition-colors">
            <MessageCircle size={13} className="text-white" />
            <span className="font-['Inter',sans-serif] font-semibold text-[12px] text-white">
              Open Chat
            </span>
          </div>
        </button>
      </motion.div>
    </>
  );
}