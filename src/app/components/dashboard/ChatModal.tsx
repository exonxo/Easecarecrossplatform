import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useAnimation } from "motion/react";
import { useModalOverlay } from "../../context/ModalContext";

interface Message {
  id: number;
  text: string;
  sender: "user" | "support";
  time: string;
  isNew?: boolean;
}

const mockMessages: Message[] = [
  { id: 1, text: "Hi! I need help finding a caregiver for my mother.", sender: "user", time: "10:30 AM" },
  { id: 2, text: "Hello! We'd be happy to help. Could you tell us what type of care your mother needs?", sender: "support", time: "10:31 AM" },
  { id: 3, text: "She needs daily assistance with mobility and medication reminders.", sender: "user", time: "10:33 AM" },
  { id: 4, text: "Got it! We have several verified caregivers in your area who specialize in elderly care with mobility support. Would you like me to share some profiles?", sender: "support", time: "10:34 AM" },
  { id: 5, text: "Yes, that would be great!", sender: "user", time: "10:35 AM" },
];

const quickReplies = [
  "Show me profiles",
  "What's the pricing?",
  "I need urgent care",
  "Schedule a call",
];

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -5, scale: 0.9 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className="flex justify-start"
    >
      <div className="bg-[#f1f5f9] rounded-[18px] rounded-bl-[6px] px-5 py-4 flex items-center gap-[5px]">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="size-[7px] rounded-full bg-[#94a3b8]"
            animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function MessageBubble({ msg, index, isInitial }: { msg: Message; index: number; isInitial: boolean }) {
  const isUser = msg.sender === "user";

  return (
    <motion.div
      layout
      initial={
        isInitial
          ? { opacity: 0, y: 15, x: isUser ? 20 : -20 }
          : { opacity: 0, scale: 0.85, y: 20, x: isUser ? 30 : -30 }
      }
      animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      transition={
        isInitial
          ? { type: "spring", damping: 22, stiffness: 260, delay: index * 0.08 }
          : { type: "spring", damping: 18, stiffness: 280 }
      }
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 300, delay: isInitial ? index * 0.08 : 0 }}
          className="size-[28px] rounded-full bg-gradient-to-br from-[#1975D2] to-[#10b981] flex items-center justify-center mr-2 mt-auto mb-1 shrink-0"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      )}
      <motion.div
        whileTap={{ scale: 0.97 }}
        className={`max-w-[75%] px-4 py-3 shadow-sm ${
          isUser
            ? "bg-gradient-to-br from-[#1975D2] to-[#1565C0] rounded-[18px] rounded-br-[6px] shadow-[0_2px_8px_rgba(25,117,210,0.2)]"
            : "bg-[#f1f5f9] rounded-[18px] rounded-bl-[6px]"
        }`}
      >
        <p
          className={`font-['Inter',sans-serif] text-[14px] leading-[21px] ${
            isUser ? "text-white" : "text-[#334155]"
          }`}
        >
          {msg.text}
        </p>
        <div className={`flex items-center gap-1 mt-1.5 ${isUser ? "justify-end" : "justify-start"}`}>
          <p
            className={`font-['Inter',sans-serif] text-[10px] ${
              isUser ? "text-white/50" : "text-[#94a3b8]"
            }`}
          >
            {msg.time}
          </p>
          {isUser && (
            <svg width="12" height="8" viewBox="0 0 16 10" fill="none">
              <path d="M1 5.5l3.5 3.5L11 2" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 5.5l3.5 3.5L15 2" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  useModalOverlay(isOpen);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sheetControls = useAnimation();

  // Drag-to-dismiss
  const dragY = useMotionValue(0);

  useEffect(() => {
    if (isOpen) {
      setInitialRender(true);
      document.body.style.overflow = "hidden";
      // Start the sheet slide-up animation
      sheetControls.start({ y: 0 });
      const timer = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        setInitialRender(false);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, sheetControls]);

  useEffect(() => {
    if (!initialRender) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages, initialRender]);

  const handleSend = useCallback((text?: string) => {
    const msgText = text || input.trim();
    if (!msgText) return;

    const newMsg: Message = {
      id: Date.now(),
      text: msgText,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isNew: true,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Show typing indicator then reply
    setTimeout(() => setIsTyping(true), 400);
    setTimeout(() => {
      setIsTyping(false);
      const replies = [
        "Thanks for your message! A care coordinator will get back to you shortly.",
        "I understand. Let me check our available caregivers for you.",
        "Great question! Our pricing starts from ₹500/day for basic care services.",
        "I'll connect you with a specialist who can help with this specific need.",
      ];
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: replies[Math.floor(Math.random() * replies.length)],
          sender: "support",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isNew: true,
        },
      ]);
    }, 1800 + Math.random() * 800);
  }, [input]);

  const handleDragEnd = (_: any, info: { offset: { y: number }; velocity: { y: number } }) => {
    if (info.offset.y > 120 || info.velocity.y > 500) {
      sheetControls.start({ y: "100%" }).then(onClose);
    } else {
      sheetControls.start({ y: 0 });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end md:items-center md:justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0 bg-black/45 backdrop-blur-[3px] touch-none"
            onClick={onClose}
          />

          {/* Modal Sheet */}
          <motion.div
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            style={{ y: dragY, height: "92dvh", maxHeight: "92dvh" }}
            initial={{ y: "100%" }}
            animate={sheetControls}
            exit={{ y: "100%", transition: { type: "spring", damping: 30, stiffness: 350 } }}
            transition={{ type: "spring", damping: 32, stiffness: 380 }}
            className="relative bg-[#f8fafc] rounded-t-[28px] md:rounded-[28px] md:w-full md:max-w-[520px] md:max-h-[85vh] flex flex-col will-change-transform"
          >
            {/* Handle */}
            <motion.div
              className="flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-[40px] h-[5px] rounded-full bg-[#cbd5e1]" />
            </motion.div>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300, delay: 0.1 }}
              className="flex items-center justify-between px-5 py-3 bg-white border-b border-[#f1f5f9]"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                    className="size-[44px] rounded-full bg-gradient-to-br from-[#1975D2] to-[#10b981] flex items-center justify-center shadow-[0_2px_8px_rgba(25,117,210,0.25)]"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                  {/* Online pulse */}
                  <div className="absolute -bottom-[1px] -right-[1px]">
                    <div className="size-[12px] rounded-full bg-white flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="size-[8px] rounded-full bg-[#10b981]"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-['Lexend',sans-serif] font-semibold text-[16px] text-[#0f172a]">
                    EaseCare Support
                  </h3>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                    className="flex items-center gap-1.5"
                  >
                    <span className="font-['Inter',sans-serif] text-[12px] text-[#10b981]">
                      Online · Typically replies instantly
                    </span>
                  </motion.div>
                </div>
              </div>
              <motion.button
                initial={{ scale: 0, rotate: 90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 250, delay: 0.15 }}
                whileTap={{ scale: 0.85, rotate: -10 }}
                onClick={onClose}
                className="size-[36px] rounded-full bg-[#f1f5f9] flex items-center justify-center cursor-pointer"
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </motion.button>
            </motion.div>

            {/* Messages Area */}
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2.5"
              style={{ overscrollBehavior: "contain" }}
            >
              {/* Date chip */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: "spring", damping: 20 }}
                className="flex justify-center mb-3"
              >
                <span className="font-['Inter',sans-serif] text-[11px] text-[#94a3b8] bg-white px-4 py-1.5 rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#f1f5f9]">
                  Today
                </span>
              </motion.div>

              {messages.map((msg, index) => (
                <MessageBubble
                  key={msg.id}
                  msg={msg}
                  index={index}
                  isInitial={initialRender && !msg.isNew}
                />
              ))}

              <AnimatePresence>
                {isTyping && <TypingIndicator />}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <AnimatePresence>
              {!isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ type: "spring", damping: 22, stiffness: 280 }}
                  className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar"
                >
                  {quickReplies.map((reply, i) => (
                    <motion.button
                      key={reply}
                      initial={{ opacity: 0, scale: 0.9, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: i * 0.05 + 0.1, type: "spring", damping: 20 }}
                      whileTap={{ scale: 0.93 }}
                      onClick={() => handleSend(reply)}
                      className="shrink-0 px-4 py-2 rounded-full border border-[#e2e8f0] bg-white font-['Inter',sans-serif] text-[12px] text-[#475569] cursor-pointer hover:border-[#1975D2] hover:text-[#1975D2] hover:bg-[#eff6ff] transition-colors active:bg-[#dbeafe]"
                    >
                      {reply}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300, delay: 0.25 }}
              className="px-4 pb-8 pt-3 bg-white border-t border-[#f1f5f9]"
            >
              <div className="flex items-center gap-2.5">
                {/* Attachment button */}
                <motion.button
                  whileTap={{ scale: 0.85, rotate: -15 }}
                  className="size-[44px] rounded-full bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center cursor-pointer shrink-0"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </motion.button>

                <div className="flex-1 bg-[#f8fafc] rounded-[20px] border border-[#e2e8f0] flex items-center px-4 py-3 focus-within:border-[#1975D2] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(25,117,210,0.08)] transition-all">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent outline-none font-['Inter',sans-serif] text-[14px] text-[#0f172a] placeholder:text-[#94a3b8]"
                  />
                </div>

                {/* Send button */}
                <motion.button
                  onClick={() => handleSend()}
                  whileTap={{ scale: 0.8 }}
                  animate={
                    input.trim()
                      ? { scale: [1, 1.08, 1], backgroundColor: "#1975D2" }
                      : { scale: 1, backgroundColor: "#e2e8f0" }
                  }
                  transition={{ type: "spring", damping: 15, stiffness: 300 }}
                  className="size-[44px] rounded-full flex items-center justify-center cursor-pointer shrink-0 shadow-sm"
                  style={{
                    boxShadow: input.trim() ? "0 4px 14px rgba(25,117,210,0.3)" : "none",
                  }}
                >
                  <motion.svg
                    animate={{ rotate: input.trim() ? -45 : 0 }}
                    transition={{ type: "spring", damping: 15 }}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}