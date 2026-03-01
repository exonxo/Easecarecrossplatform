import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type User = { uid: string; phoneNumber: string } | null;

interface UserProfile {
  uid: string;
  phone: string;
  name?: string;
  email?: string;
  relationship?: string;
  location?: string;
  onboardingComplete: boolean;
}

interface AuthContextType {
  user: User;
  profile: UserProfile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: false,
  refreshProfile: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user] = useState<User>(null);
  const [profile] = useState<UserProfile | null>(null);
  const loading = false;

  const refreshProfile = async () => {};
  const logout = async () => {};

  return (
    <AuthContext.Provider value={{ user, profile, loading, refreshProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
