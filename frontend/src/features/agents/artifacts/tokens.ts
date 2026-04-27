export const maisonColors = {
  marine1000: "#0A1224",
  marine900: "#0E1626",
  marine800: "#131C30",
  marine700: "#1B2540",
  marine600: "#28324F",
  marine500: "#3C4866",

  gold700: "#8E6B43",
  gold600: "#A67D54",
  gold500: "#C39A71",
  gold400: "#D4B391",
  gold300: "#E2C7AB",
  gold100: "#F1E5D2",
  goldLine: "rgba(195, 154, 113, 0.35)",
  goldSoft: "rgba(195, 154, 113, 0.12)",
  goldGlow: "rgba(195, 154, 113, 0.55)",

  champ500: "#C9BFA8",
  champ300: "#DCD3BD",

  ivory: "#F7F3EB",
  paper: "#FFFCF5",
  paper2: "#FBF7EE",
  cream: "#F1ECE0",
  sand100: "#ECE5D5",
  sand150: "#E0D8C5",
  sand200: "#C9C0AC",

  ink1000: "#0F0F0E",
  ink900: "#1A1A1A",
  ink800: "#2A2926",
  ink700: "#3D3A33",
  ink500: "#6B655A",
  ink400: "#8E887C",
  ink300: "#B0AA9D",

  success: "#4F6A41",
  successSoft: "#E5EBDB",
  warning: "#A6741F",
  warningSoft: "#F4E9D2",
  danger: "#8E2E20",
  dangerSoft: "#F1DAD3",
  info: "#324863",
  infoSoft: "#DDE3EC",
} as const;

export const maisonRadius = {
  xs: "2px",
  sm: "3px",
  md: "6px",
  lg: "10px",
  xl: "14px",
} as const;

export const maisonSpacing = {
  s1: "4px",
  s2: "8px",
  s3: "12px",
  s4: "16px",
  s5: "20px",
  s6: "24px",
  s7: "28px",
  s8: "32px",
  s9: "40px",
  s10: "48px",
} as const;

export const maisonShadows = {
  sh1: "0 1px 0 rgba(14,22,38,.04)",
  sh2: "0 1px 2px rgba(14,22,38,.06), 0 8px 24px -10px rgba(14,22,38,.18)",
  sh3: "0 28px 56px -16px rgba(14,22,38,.4), 0 4px 12px rgba(14,22,38,.08)",
} as const;

export const maisonFonts = {
  display: '"Inter Tight", "Inter", -apple-system, sans-serif',
  serif: '"Instrument Serif", Georgia, serif',
  body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  mono: '"Geist Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
} as const;

export type MaisonColors = typeof maisonColors;
export type MaisonRadius = typeof maisonRadius;
export type MaisonSpacing = typeof maisonSpacing;
export type MaisonShadows = typeof maisonShadows;
export type MaisonFonts = typeof maisonFonts;
