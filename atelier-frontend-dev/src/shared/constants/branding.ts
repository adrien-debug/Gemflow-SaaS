export const brandingColorPalette = Object.freeze({
  brand1: "#FCFAF8",
  brand2: "#F6F0EA",
  brand3: "#E7D7C6",
  brand4: "#DBC2AA",
  brand5: "#CFAE8D",
  brand6: "#C39A71",
  brand7: "#9C7B5A",
  brand8: "#755C44",
  brand9: "#4E3E2D",
  brand10: "#271F17",
} as const);

export const brandingTokens = Object.freeze({
  textDefaultColor: "rgba(0, 0, 0, 0.88)",
  textSecondaryColor: "#777777",
  textDisabledColor: "#00000040",
  colorBgContainer: "#FFF",
  colorBgContainerDisabled: "#0000000a",
  colorBgLayout: "#f5f5f5",
  colorBgElevated: "#FFF",
  colorBgGray: "#F3F3F3",
  controlItemBgHover: "#0000000a",
  controlItemBgActive: brandingColorPalette.brand1,
  controlItemBgActiveHover: brandingColorPalette.brand2,
  borderRadiusDefault: 20,
  siderBackgroundColor: "#131C30",
  textColorGray: "rgba(0, 0, 0, 0.50)",
} as const);
