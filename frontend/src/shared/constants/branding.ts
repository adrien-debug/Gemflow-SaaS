export const brandingColorPalette = Object.freeze({
  brand1: "#FFFCF5",
  brand2: "#FBF7EE",
  brand3: "#F1E5D2",
  brand4: "#E2C7AB",
  brand5: "#D4B391",
  brand6: "#C39A71",
  brand7: "#A67D54",
  brand8: "#8E6B43",
  brand9: "#5E4729",
  brand10: "#1A1A1A",
} as const);

export const brandingTokens = Object.freeze({
  textDefaultColor: "#1A1A1A",
  textSecondaryColor: "#6B655A",
  textDisabledColor: "#B0AA9D",
  colorBgContainer: "#FFFCF5",
  colorBgContainerDisabled: "#F1ECE0",
  colorBgLayout: "#F7F3EB",
  colorBgElevated: "#FDFDFB",
  colorBgGray: "#ECE5D5",
  controlItemBgHover: "rgba(195, 154, 113, 0.08)",
  controlItemBgActive: brandingColorPalette.brand1,
  controlItemBgActiveHover: brandingColorPalette.brand2,
  borderRadiusDefault: 6,
  siderBackgroundColor: "#05070A",
  textColorGray: "#8E887C",
} as const);

export const brandingFonts = Object.freeze({
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontFamilyDisplay: '"Inter Tight", "Inter", -apple-system, sans-serif',
  fontFamilyCode: '"Geist Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
  fontFamilySerif: '"Instrument Serif", Georgia, serif',
} as const);

export const brandingRadii = Object.freeze({
  xs: 2,
  sm: 3,
  md: 6,
  lg: 10,
  xl: 14,
} as const);
