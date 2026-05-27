import { brandingColorPalette, brandingFonts, brandingRadii, brandingTokens } from "@shared/constants/branding.ts";
import { ThemeConfig } from "antd/es/config-provider/context";

export const globalTheme: ThemeConfig = {
  token: {
    colorPrimaryBg: brandingColorPalette.brand1,
    colorPrimaryBgHover: brandingColorPalette.brand2,
    colorPrimaryBorder: brandingColorPalette.brand3,
    colorPrimaryBorderHover: brandingColorPalette.brand4,
    colorPrimaryHover: brandingColorPalette.brand5,
    colorPrimary: brandingColorPalette.brand6,
    colorPrimaryActive: brandingColorPalette.brand7,
    colorPrimaryTextHover: brandingColorPalette.brand8,
    colorPrimaryText: brandingColorPalette.brand9,
    colorPrimaryTextActive: brandingColorPalette.brand10,

    colorBgContainer: brandingTokens.colorBgContainer,
    colorBgContainerDisabled: brandingTokens.colorBgContainerDisabled,
    colorBgLayout: brandingTokens.colorBgLayout,
    colorBgElevated: brandingTokens.colorBgElevated,
    controlItemBgHover: brandingTokens.controlItemBgHover,
    controlItemBgActive: brandingTokens.controlItemBgActive,
    controlItemBgActiveHover: brandingTokens.controlItemBgActiveHover,

    colorTextBase: brandingTokens.textDefaultColor,
    colorText: brandingTokens.textDefaultColor,
    colorTextSecondary: brandingTokens.textSecondaryColor,
    colorTextTertiary: brandingTokens.textColorGray,
    colorTextDisabled: brandingTokens.textDisabledColor,

    colorLink: brandingColorPalette.brand6,
    colorLinkHover: brandingColorPalette.brand8,
    colorLinkActive: brandingColorPalette.brand7,

    fontFamily: brandingFonts.fontFamily,
    fontFamilyCode: brandingFonts.fontFamilyCode,

    borderRadius: brandingRadii.md,
    borderRadiusXS: brandingRadii.xs,
    borderRadiusSM: brandingRadii.sm,
    borderRadiusLG: brandingRadii.lg,
  },
  cssVar: true,
  hashed: false,
  components: {
    Avatar: {
      lineHeight: 0,
    },
    InputNumber: {
      handleWidth: 0,
    },
    Menu: {
      darkItemColor: "rgba(255, 255, 255, 0.65)",
      darkItemHoverColor: "rgba(255, 255, 255, 0.9)",
      darkItemSelectedBg: "rgba(195, 154, 113, 0.12)",
      darkItemSelectedColor: "#FFF",
      darkItemBg: "transparent",
      darkSubMenuItemBg: "transparent",
    },
    Tag: {
      defaultColor: brandingColorPalette.brand6,
      defaultBg: brandingColorPalette.brand1,
      colorBorder: brandingColorPalette.brand3,
    },
    Layout: {
      siderBg: brandingTokens.siderBackgroundColor,
    },
    Button: {
      borderRadius: brandingTokens.borderRadiusDefault,
      borderRadiusLG: brandingRadii.lg,
      borderRadiusSM: brandingRadii.sm,
    },
    Table: {
      headerBg: brandingColorPalette.brand1,
    },
    Modal: {
      borderRadiusLG: brandingRadii.lg,
      borderRadiusSM: brandingRadii.sm,
    },
    Breadcrumb: {
      linkColor: brandingTokens.textDefaultColor,
      itemColor: brandingTokens.textDefaultColor,
      lastItemColor: brandingTokens.textDisabledColor,
    },
    Radio: {
      buttonSolidCheckedColor: brandingColorPalette.brand6,
      buttonCheckedBg: brandingColorPalette.brand1,
      buttonSolidCheckedBg: brandingColorPalette.brand1,
      buttonSolidCheckedActiveBg: brandingColorPalette.brand1,
      buttonSolidCheckedHoverBg: brandingColorPalette.brand1,
    },
    Segmented: {
      fontSize: 14,
      fontSizeLG: 14,
      controlPaddingHorizontal: 17,
    },
  },
} as const;
