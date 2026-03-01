import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Bell,
  FileText,
  Headphones,
  Globe,
  ChevronRight,
  Pencil,
  LogOut,
  Camera,
  Shield,
  CreditCard,
  Clock,
  Star,
  MapPin,
  Phone,
  Mail,
  X,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { dataService } from "../../services/DataService";
import { isApiReachable } from "../../services/api";

const AVATAR_URL =
  "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc3MTk0MzA3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  relationship: string;
  location: string;
  avatar: string;
  memberSince: string;
}

const mockUser: UserProfile = {
  name: "John Arowoka",
  email: "johnarowoka1@mail.com",
  phone: "+91 98765 43210",
  relationship: "Son / Daughter",
  location: "Salt Lake, Kolkata",
  avatar: AVATAR_URL,
  memberSince: "Member since Jan 2025",
};

const stats = [
  { label: "Bookings", value: "12", icon: Clock },
  { label: "Reviews", value: "4.8", icon: Star },
  { label: "Saved", value: "3", icon: CreditCard },
];

interface MenuItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  subtitle?: string;
  rightText?: string;
  danger?: boolean;
  route?: string;
}

const menuSections: { title?: string; items: MenuItem[] }[] = [
  {
    title: "Account",
    items: [
      { icon: MapPin, label: "Manage Addresses", subtitle: "Add, edit & set default addresses", route: "/add-location" },
      { icon: Bell, label: "Notification Preferences", subtitle: "Manage alerts & reminders" },
      { icon: Shield, label: "Privacy Policy", subtitle: "Your data & privacy" },
      { icon: FileText, label: "Terms of Service", subtitle: "Usage terms & conditions" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: Headphones, label: "Help and Support", subtitle: "FAQs & contact us" },
      { icon: Globe, label: "Language", rightText: "English (US)" },
    ],
  },
  {
    items: [
      { icon: LogOut, label: "Sign Out", danger: true },
    ],
  },
];

function EditProfileModal({
  user,
  onClose,
  onSave,
}: {
  user: UserProfile;
  onClose: () => void;
  onSave: (data: Partial<UserProfile>) => void;
}) {
  const navigate = useNavigate();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone] = useState(user.phone);
  const [relationship, setRelationship] = useState(user.relationship);
  const [location, setLocation] = useState(user.location);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-[20px] w-full max-w-[480px] max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="font-['Inter',sans-serif] font-semibold text-[18px] text-[#111827]">
            Edit Profile
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Avatar */}
        <div className="flex justify-center pt-6 pb-4">
          <div className="relative">
            <div className="size-[96px] rounded-full overflow-hidden border-4 border-[#f9fafb] shadow-md">
              <ImageWithFallback
                src={user.avatar}
                alt={user.name}
                className="size-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-[#247BD3] text-white p-1.5 rounded-full shadow-md cursor-pointer hover:bg-[#1a5fa0] transition-colors">
              <Camera size={14} />
            </button>
          </div>
        </div>

        {/* Fields */}
        <div className="px-5 pb-6 space-y-4">
          <div>
            <label className="block font-['Inter',sans-serif] text-[13px] text-[#6b7280] mb-1.5">
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-[12px] border border-gray-200 bg-[#f9fafb] text-[#111827] font-['Inter',sans-serif] text-[15px] outline-none focus:border-[#247BD3] focus:ring-2 focus:ring-[#247BD3]/10 transition-all"
            />
          </div>
          <div>
            <label className="block font-['Inter',sans-serif] text-[13px] text-[#6b7280] mb-1.5">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full px-4 py-3 rounded-[12px] border border-gray-200 bg-[#f9fafb] text-[#111827] font-['Inter',sans-serif] text-[15px] outline-none focus:border-[#247BD3] focus:ring-2 focus:ring-[#247BD3]/10 transition-all"
            />
          </div>
          <div>
            <label className="block font-['Inter',sans-serif] text-[13px] text-[#6b7280] mb-1.5">
              Phone
            </label>
            <input
              value={phone}
              disabled
              className="w-full px-4 py-3 rounded-[12px] border border-gray-200 bg-gray-100 text-[#9ca3af] font-['Inter',sans-serif] text-[15px] cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block font-['Inter',sans-serif] text-[13px] text-[#6b7280] mb-1.5">
              Relationship
            </label>
            <select
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="w-full px-4 py-3 rounded-[12px] border border-gray-200 bg-[#f9fafb] text-[#111827] font-['Inter',sans-serif] text-[15px] outline-none focus:border-[#247BD3] focus:ring-2 focus:ring-[#247BD3]/10 transition-all cursor-pointer"
            >
              {["Son / Daughter", "Spouse", "Parent", "Sibling", "Friend", "Professional Caregiver", "Other"].map(
                (r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                )
              )}
            </select>
          </div>
          <div>
            <label className="block font-['Inter',sans-serif] text-[13px] text-[#6b7280] mb-1.5">
              Location
            </label>
            <button
              onClick={() => {
                onClose();
                navigate("/add-location");
              }}
              className="w-full px-4 py-3 rounded-[12px] border border-gray-200 bg-[#f9fafb] text-left font-['Inter',sans-serif] text-[15px] outline-none hover:border-[#247BD3] hover:bg-[#f0f7fa] transition-all cursor-pointer flex items-center justify-between"
            >
              <span className="flex items-center gap-2 text-[#111827]">
                <MapPin size={16} className="text-[#247BD3]" />
                {location}
              </span>
              <ChevronRight size={16} className="text-[#9ca3af]" />
            </button>
          </div>

          <button
            onClick={() => {
              onSave({ name, email, relationship, location });
              onClose();
            }}
            className="w-full mt-2 bg-[#247BD3] text-white font-['Inter',sans-serif] font-semibold text-[15px] py-3.5 rounded-[14px] hover:bg-[#1a5fa0] active:scale-[0.98] transition-all cursor-pointer shadow-[0_4px_12px_rgba(36,123,211,0.25)]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProfilePage() {
  const [user, setUser] = useState(mockUser);
  const [showEdit, setShowEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Load profile from Supabase on mount
  useEffect(() => {
    if (!isApiReachable()) {
      setIsLoading(false);
      return;
    }
    dataService
      .getProfile()
      .then((profile) => {
        if (profile && typeof profile === "object") {
          setUser((prev) => ({
            ...prev,
            name: (profile.name as string) || prev.name,
            email: (profile.email as string) || prev.email,
            phone: (profile.phone as string) || prev.phone,
            relationship: (profile.relationship as string) || prev.relationship,
            location: (profile.location as string) || prev.location,
            memberSince: (profile.memberSince as string) || prev.memberSince,
          }));
        }
      })
      .catch(() => { /* offline — use default profile */ })
      .finally(() => setIsLoading(false));
  }, []);

  const handleSave = (data: Partial<UserProfile>) => {
    const updated = { ...user, ...data };
    setUser(updated);

    // Persist to Supabase
    dataService
      .saveProfile({
        name: updated.name,
        email: updated.email,
        phone: updated.phone,
        relationship: updated.relationship,
        location: updated.location,
        memberSince: updated.memberSince,
      })
      .then(() => console.log("[ProfilePage] Profile saved to Supabase"))
      .catch((err) => console.warn("[ProfilePage] Failed to save profile:", err));
  };

  return (
    <>
      <main className="flex-1 pb-[100px] md:pb-8">
        <div className="max-w-[1180px] mx-auto px-4 md:px-8 pt-6 md:pt-8 pb-4">
          {/* Page Title — mobile only */}
          <div className="md:hidden flex items-center justify-between mb-6">
            <h1 className="font-['Inter',sans-serif] font-bold text-[30px] text-[#111827]">
              My Profile
            </h1>
            
          </div>

          {/* Desktop two-column / Mobile single-column */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* ─── Left Column: Profile Card ─── */}
            <div className="w-full lg:w-[380px] lg:shrink-0 flex flex-col gap-6">
              {/* Profile Card */}
              <div className="bg-white rounded-[16px] border border-[#f3f4f6] shadow-[0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden">
                {/* Cover gradient */}
                <div className="h-[80px] md:h-[100px] bg-gradient-to-r from-[#1975D2] to-[#095FB5] relative hidden" />

                {/* Avatar overlapping cover */}
                <div className="flex flex-col items-center md:-mt-[60px] pb-6 px-6 mx-[0px] mt-[24px] mb-[0px]">
                  <div className="relative mb-4">
                    <div className="size-[112px] md:size-[120px] rounded-full overflow-hidden border-4 border-[#f9fafb] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
                      <ImageWithFallback
                        src={user.avatar}
                        alt={user.name}
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-[6px] right-[6px] bg-[#10b981] rounded-full size-[22px] border-4 border-white" />
                  </div>

                  <h2 className="font-['Inter',sans-serif] font-bold text-[22px] md:text-[24px] text-[#111827] text-center">
                    {user.name}
                  </h2>
                  <p className="font-['Inter',sans-serif] text-[14px] text-[#6b7280] text-center mt-1">
                    {user.email}
                  </p>
                  <p className="font-['Inter',sans-serif] text-[12px] text-[#9ca3af] text-center mt-0.5">
                    {user.memberSince}
                  </p>

                  {/* Edit Profile Button */}
                  <button
                    onClick={() => setShowEdit(true)}
                    className="mt-5 w-full flex items-center justify-center gap-2 py-3 px-6 rounded-[10px] bg-[#f9fafb] border border-[#e5e7eb] hover:bg-[#f0f4f8] hover:border-[#d1d5db] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <Pencil size={14} className="text-[#111827]" />
                    <span className="font-['Inter',sans-serif] font-medium text-[14px] text-[#111827]">
                      Edit Profile
                    </span>
                  </button>
                </div>
              </div>

              {/* Stats — desktop only */}
              <div className="hidden lg:grid grid-cols-3 gap-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white rounded-[14px] border border-[#f3f4f6] shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-4 flex flex-col items-center gap-1.5"
                  >
                    <stat.icon size={18} className="text-[#247BD3]" />
                    <span className="font-['Inter',sans-serif] font-bold text-[20px] text-[#111827]">
                      {stat.value}
                    </span>
                    <span className="font-['Inter',sans-serif] text-[12px] text-[#6b7280]">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Contact Info — desktop only */}
              <div className="hidden lg:block bg-white rounded-[16px] border border-[#f3f4f6] shadow-[0_1px_2px_rgba(0,0,0,0.05)] p-5">
                <h3 className="font-['Inter',sans-serif] font-semibold text-[14px] text-[#9ca3af] uppercase tracking-wider mb-4">
                  Contact Info
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="size-[36px] rounded-[10px] bg-[#f0f7fa] flex items-center justify-center">
                      <Phone size={16} className="text-[#247BD3]" />
                    </div>
                    <div>
                      <p className="font-['Inter',sans-serif] text-[12px] text-[#9ca3af]">Phone</p>
                      <p className="font-['Inter',sans-serif] text-[14px] text-[#111827]">
                        {user.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="size-[36px] rounded-[10px] bg-[#f0f7fa] flex items-center justify-center">
                      <Mail size={16} className="text-[#247BD3]" />
                    </div>
                    <div>
                      <p className="font-['Inter',sans-serif] text-[12px] text-[#9ca3af]">Email</p>
                      <p className="font-['Inter',sans-serif] text-[14px] text-[#111827]">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div
                    onClick={() => navigate("/add-location")}
                    className="flex items-center gap-3 cursor-pointer hover:bg-[#f8fafc] rounded-[10px] p-1 -m-1 transition-colors group/loc"
                  >
                    <div className="size-[36px] rounded-[10px] bg-[#f0f7fa] flex items-center justify-center">
                      <MapPin size={16} className="text-[#247BD3]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-['Inter',sans-serif] text-[12px] text-[#9ca3af]">
                        Location
                      </p>
                      <p className="font-['Inter',sans-serif] text-[14px] text-[#111827]">
                        {user.location}
                      </p>
                    </div>
                    <ChevronRight size={14} className="text-[#9ca3af] group-hover/loc:text-[#6b7280] transition-colors" />
                  </div>
                </div>
              </div>
            </div>

            {/* ─── Right Column: Settings Menu ─── */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Stats — mobile only */}
              <div className="lg:hidden grid grid-cols-3 gap-3">
                {stats.map((stat) => (
                  null
                ))}
              </div>

              {/* Menu Sections */}
              {menuSections.map((section, si) => (
                <div key={si}>
                  {section.title && (
                    <h3 className="font-['Inter',sans-serif] font-semibold text-[13px] text-[#9ca3af] uppercase tracking-wider mb-3 px-1 hidden md:block">
                      {section.title}
                    </h3>
                  )}
                  <div className="bg-white rounded-[16px] border border-[#f3f4f6] shadow-[0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden">
                    {section.items.map((item, ii) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          if (item.danger) {
                            navigate("/onboarding");
                          } else if (item.route) {
                            navigate(item.route);
                          }
                        }}
                        className={`w-full flex items-center justify-between px-5 py-4 md:py-[18px] hover:bg-[#f9fafb] active:bg-[#f3f4f6] transition-colors cursor-pointer group ${
                          ii > 0 ? "border-t border-[#f3f4f6]" : ""
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`size-[40px] rounded-[12px] flex items-center justify-center shrink-0 ${
                              item.danger
                                ? "bg-[#fef2f2]"
                                : "bg-[#f9fafb] group-hover:bg-[#f0f7fa]"
                            } transition-colors`}
                          >
                            <item.icon
                              size={18}
                              className={item.danger ? "text-[#EF4444]" : "text-[#247BD3]"}
                            />
                          </div>
                          <div className="text-left">
                            <p
                              className={`font-['Inter',sans-serif] font-medium text-[15px] md:text-[16px] ${
                                item.danger ? "text-[#EF4444]" : "text-[#111827]"
                              }`}
                            >
                              {item.label}
                            </p>
                            {item.subtitle && (
                              <p className="font-['Inter',sans-serif] text-[12px] text-[#9ca3af] mt-0.5 hidden md:block">
                                {item.subtitle}
                              </p>
                            )}
                          </div>
                        </div>
                        {!item.danger && (
                          <div className="flex items-center gap-2">
                            {item.rightText && (
                              <span className="font-['Inter',sans-serif] text-[14px] text-[#6b7280]">
                                {item.rightText}
                              </span>
                            )}
                            <ChevronRight
                              size={16}
                              className="text-[#9ca3af] group-hover:text-[#6b7280] transition-colors"
                            />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Version — mobile */}
              <div className="flex flex-col items-center pt-2 pb-4 md:pb-0">
                <p className="font-['Inter',sans-serif] text-[14px] text-[#6b7280]">
                  Easecare v4.0.2
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Edit Profile Modal */}
      {showEdit && (
        <EditProfileModal user={user} onClose={() => setShowEdit(false)} onSave={handleSave} />
      )}
    </>
  );
}