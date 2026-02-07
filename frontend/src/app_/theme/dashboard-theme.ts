import { brandingTokens } from "@shared/constants/branding.ts";
import { ThemeConfig } from "antd/es/config-provider/context";

export const dashboardTheme: ThemeConfig = {
  token: {},
  components: {
    Layout: {
      headerBg: brandingTokens.colorBgContainer,
      bodyBg: brandingTokens.colorBgContainer,
      footerBg: brandingTokens.colorBgContainer,
    },
  },
} as const;
