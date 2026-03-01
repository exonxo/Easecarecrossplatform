// ─── EaseCare Design System Tokens ───
// Single source of truth for all design values.
// Import and use these constants instead of hardcoding values.

export const colors = {
  // Primary
  primary: {
    50: "#ECFDFF",
    100: "#EBF3FC",
    500: "#1975D2",
    600: "#1565C0",
    700: "#095FB5",
    900: "#002E5C",
  },

  // Gray / Neutral
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#667085",
    600: "#64748b",
    700: "#344054",
    800: "#1E293B",
    900: "#101828",
  },

  // Semantic
  error: {
    50: "#FEE2E2",
    500: "#F04438",
    600: "#E53935",
  },
  warning: {
    50: "#FFFBEB",
    100: "#FEF3C7",
    500: "#F79009",
    600: "#D97706",
  },
  success: {
    50: "#F0FDF4",
    100: "#DCFCE7",
    500: "#12B76A",
    600: "#22C55E",
    700: "#15803D",
  },

  // Page surfaces
  pageBg: "#f6f8fc",
  pageBgDesktop: "#F0F7FA",
  cardBg: "#FFFFFF",
  lightBlueTint: "#EBF3FC",
  darkBg: "#111827",

  // Text
  heading: "#0f172a",
  body: "#334155",
  subtext: "#64748b",
  muted: "#94a3b8",

  // Borders
  border: "#E5E7EB",
  borderLight: "#f1f5f9",
} as const;

export const radius = {
  card: "20px",
  cardLg: "24px",
  cardInner: "12px",
  cardInnerLg: "14px",
  button: "10px",
  buttonLg: "14px",
  buttonXl: "16px",
  pill: "9999px",
  input: "10px",
} as const;

export const shadows = {
  card: "0 20px 60px rgba(0,0,0,0.15)",
  cardInner: "0 2px 12px rgba(0,0,0,0.08)",
  cardHover: "0 4px 20px -4px rgba(0,0,0,0.08)",
  button: "0px 4px 14px -2px rgba(25,117,210,0.35)",
  buttonHover: "0px 6px 20px -2px rgba(25,117,210,0.45)",
  soft: "0 2px 8px rgba(0,0,0,0.06)",
  bottomNav: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
} as const;

export const transitions = {
  cardFlip: "350ms cubic-bezier(0.4, 0, 0.2, 1)",
  bgCrossfade: "400ms ease",
  sheetSlide: "300ms ease-in-out",
  hoverMicro: "150ms ease",
  spring: { type: "spring" as const, damping: 28, stiffness: 300 },
} as const;

export const fonts = {
  heading: "'Lexend', sans-serif",
  body: "'Inter', sans-serif",
} as const;
