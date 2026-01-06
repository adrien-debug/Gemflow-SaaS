import { brandingTokens } from "@shared/constants/branding.ts";
import ConfigProvider from "antd/es/config-provider";
import { ThemeConfig } from "antd/es/config-provider/context";
import { FC, PropsWithChildren } from "react";

const theme: ThemeConfig = {
  components: {
    Card: {
      bodyPadding: 16,
    },
    Tag: {
      defaultColor: brandingTokens.textSecondaryColor,
      defaultBg: brandingTokens.colorBgGray,
      colorBorder: brandingTokens.colorBgGray,
    },
  },
};

const TaskCardTheme: FC<PropsWithChildren> = ({ children }) => {
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
};

export default TaskCardTheme;
