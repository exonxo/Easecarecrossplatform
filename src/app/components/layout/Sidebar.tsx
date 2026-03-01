import { useLocation, useNavigate } from "react-router";
import { Home, CalendarCheck, User } from "lucide-react";
import { LogoFull } from "../shared/LogoFull";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: CalendarCheck, label: "Bookings", path: "/bookings" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="hidden md:flex w-[260px] h-screen bg-white border-r border-[#f1f5f9] flex-col fixed left-0 top-0 z-30 shadow-[2px_0_8px_rgba(0,0,0,0.03)]">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-[#f1f5f9]">
        <LogoFull size="small" />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 pt-6 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-[12px] transition-all cursor-pointer ${
                isActive
                  ? "bg-[#EBF3FC] text-[#1975D2]"
                  : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#334155]"
              }`}
            >
              <item.icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
              <span className={`font-['Lexend',sans-serif] text-[14px] ${isActive ? "font-bold" : "font-medium"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="px-4 pb-6 pt-4 border-t border-[#f1f5f9]">
        
      </div>
    </aside>
  );
}
