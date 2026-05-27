import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Search, MapPin, ChevronDown, User,
  CalendarCheck, Settings, MapPinned,
  HelpCircle, LogOut, AlertCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { LogoFull } from "../shared/LogoFull";
import { useAuth } from "../../context/AuthContext";
import { LoginModal } from "../auth/LoginModal";
import { SearchModal } from "./SearchModal";
import { LocationModal } from "./LocationModal";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";

export function TopNav() {
  const navigate = useNavigate();
  const { user, profile, logout } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  const isLoggedIn = !!(user && profile?.onboardingComplete);
  const initials = profile?.name
    ? profile.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : null;

  const handleLogout = () => setLogoutConfirmOpen(true);

  const handleConfirmLogout = () => {
    setLogoutConfirmOpen(false);
    logout();
    navigate("/", { replace: true });
  };

  return (
    <>
      <header className="sticky top-0 z-30 w-full bg-white border-b border-[#f1f5f9] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        <div className="h-[64px] flex items-center justify-between px-4 md:px-8">

          {/* Left — logo only */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity shrink-0"
          >
            <LogoFull size="small" />
          </button>

          {/* Right — location + search + profile/login */}
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <>
                {/* Location selector */}
                <button
                  onClick={() => setLocationOpen(true)}
                  className="flex items-center gap-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-[10px] px-3 py-2 hover:bg-[#f0f7fa] hover:border-[#c7d9f0] transition-all cursor-pointer group"
                >
                  <div className="size-6 rounded-full bg-[#EBF3FC] flex items-center justify-center shrink-0">
                    <MapPin size={13} className="text-[#1975D2]" strokeWidth={2.2} />
                  </div>
                  <div className="hidden md:flex flex-col items-start leading-none">
                    <span className="font-['Inter',sans-serif] text-[10px] text-[#94a3b8] font-medium uppercase tracking-wide">
                      Location
                    </span>
                    <span className="font-['Lexend',sans-serif] font-semibold text-[13px] text-[#1e293b] max-w-[120px] truncate">
                      Salt Lake, Kolkata
                    </span>
                  </div>
                  <ChevronDown size={13} className="text-[#94a3b8] group-hover:text-[#1975D2] transition-colors hidden md:block" />
                </button>

                {/* Search */}
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-[10px] px-3 py-2 text-[13px] text-[#94a3b8] font-['Lexend',sans-serif] hover:border-[#1975D2] hover:text-[#1975D2] transition-all cursor-pointer"
                >
                  <Search size={15} />
                  <span className="hidden md:inline">Search services...</span>
                </button>

                {/* Profile avatar + dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="size-9 rounded-full bg-[#1975D2] text-white flex items-center justify-center font-['Lexend',sans-serif] font-bold text-[13px] hover:bg-[#1565b8] transition-colors cursor-pointer shrink-0 outline-none shadow-[0_0_0_2px_white,0_0_0_4px_rgba(25,117,210,0.35)]">
                      {initials ?? <User size={16} strokeWidth={2} />}
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-56 mt-1">
                    {/* User info */}
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col gap-0.5 py-1">
                        <p className="font-['Lexend',sans-serif] font-semibold text-[14px] text-[#0f172a]">
                          {profile?.name ?? "My Account"}
                        </p>
                        {profile?.email && (
                          <p className="font-['Inter',sans-serif] text-[12px] text-[#94a3b8] truncate">
                            {profile.email}
                          </p>
                        )}
                      </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => navigate("/bookings")} className="cursor-pointer">
                      <CalendarCheck size={15} className="mr-2 text-[#64748b]" />
                      <span>My Bookings</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                      <Settings size={15} className="mr-2 text-[#64748b]" />
                      <span>My Profile</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => setLocationOpen(true)} className="cursor-pointer">
                      <MapPinned size={15} className="mr-2 text-[#64748b]" />
                      <span>Saved Addresses</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => navigate("/messages")} className="cursor-pointer">
                      <HelpCircle size={15} className="mr-2 text-[#64748b]" />
                      <span>Help & Support</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-[#ef4444] focus:text-[#ef4444] focus:bg-[#fef2f2]"
                    >
                      <LogOut size={15} className="mr-2" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="bg-[#1975D2] text-white font-['Lexend',sans-serif] font-semibold text-[14px] px-5 py-2 rounded-[10px] hover:bg-[#1565b8] active:scale-[0.98] transition-all cursor-pointer"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
      <LocationModal open={locationOpen} onOpenChange={setLocationOpen} />

      {/* Logout confirmation dialog */}
      <AnimatePresence>
        {logoutConfirmOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setLogoutConfirmOpen(false)}
            />
            <motion.div
              className="relative bg-white rounded-[20px] w-full max-w-[340px] p-6 flex flex-col gap-5 shadow-xl"
              initial={{ opacity: 0, scale: 0.95, transform: "translateY(8px)" }}
              animate={{ opacity: 1, scale: 1, transform: "translateY(0px)" }}
              exit={{ opacity: 0, scale: 0.95, transform: "translateY(8px)" }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            >
              {/* Icon */}
              <div className="size-12 rounded-full bg-[#FEF2F2] flex items-center justify-center">
                <AlertCircle size={22} className="text-[#EF4444]" strokeWidth={2} />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1.5">
                <h3 className="font-['Lexend',sans-serif] font-bold text-[17px] text-[#0f172a]">
                  Sign out of EaseCare?
                </h3>
                <p className="font-['Inter',sans-serif] text-[13px] text-[#64748b] leading-[19px]">
                  You'll need to log in again to book services or view your bookings.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setLogoutConfirmOpen(false)}
                  className="flex-1 py-2.5 rounded-[12px] border border-[#e2e8f0] font-['Lexend',sans-serif] font-semibold text-[14px] text-[#374151] hover:bg-[#f8fafc] active:scale-[0.98] transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmLogout}
                  className="flex-1 py-2.5 rounded-[12px] bg-[#EF4444] font-['Lexend',sans-serif] font-semibold text-[14px] text-white hover:bg-[#DC2626] active:scale-[0.98] transition-all cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
