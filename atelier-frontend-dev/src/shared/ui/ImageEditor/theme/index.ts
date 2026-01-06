import { brandingColorPalette, brandingTokens } from "@shared/constants/branding";

export const ImageEditorTheme = {
  "common.bisize.width": "251px",
  "common.bisize.height": "21px",
  "common.backgroundColor": brandingTokens.colorBgContainer,

  // header
  "header.backgroundImage": "none",
  "header.backgroundColor": "transparent",
  "header.border": "0px",

  // load button
  "loadButton.backgroundColor": brandingTokens.colorBgLayout,
  "loadButton.border": "1px solid #ddd",
  "loadButton.color": brandingTokens.siderBackgroundColor,
  "loadButton.fontFamily":
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  "loadButton.fontSize": "12px",

  // download button
  "downloadButton.backgroundColor": brandingColorPalette.brand6,
  "downloadButton.border": "1px solid #fdba3b",
  "downloadButton.color": brandingTokens.colorBgLayout,
  "downloadButton.fontFamily":
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  "downloadButton.fontSize": "12px",

  // main icons
  "menu.iconSize.width": "24px",
  "menu.iconSize.height": "24px",

  // submenu icons
  "submenu.iconSize.width": "32px",
  "submenu.iconSize.height": "32px",

  // submenu primary color
  "submenu.backgroundColor": "transparent",
  "submenu.partition.color": brandingColorPalette.brand1,

  // submenu labels
  "submenu.normalLabel.color": brandingTokens.textDefaultColor,
  "submenu.normalLabel.fontWeight": "normal",
  "submenu.activeLabel.color": brandingColorPalette.brand6,
  "submenu.activeLabel.fontWeight": "normal",

  // checkbox style
  "checkbox.border": "1px solid #ccc",
  "checkbox.backgroundColor": brandingTokens.colorBgLayout,

  // range style
  "range.pointer.color": brandingColorPalette.brand6,
  "range.bar.color": brandingTokens.textSecondaryColor,
  "range.subbar.color": brandingColorPalette.brand6,

  "range.value.color": brandingTokens.textDefaultColor,
  "range.value.fontWeight": "normal",
  "range.value.fontSize": "11px",
  "range.value.border": "0",
  "range.value.backgroundColor": brandingTokens.colorBgLayout,
  "range.title.color": brandingTokens.textDefaultColor,
  "range.title.fontWeight": "lighter",

  // colorpicker style
  "colorpicker.button.border": "0px",
  "colorpicker.title.color": brandingTokens.textDefaultColor,
};
