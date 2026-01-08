import { ThemeConfig } from "antd/es/config-provider/context";
import "./styles.scss";
import { FC, PropsWithChildren } from "react";
import ConfigProvider from "antd/es/config-provider";

const theme: ThemeConfig = {
  components: {
    Form: {
      itemMarginBottom: 16,
    },
  },
};

const NarrowFormSpaced: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ConfigProvider theme={theme}>
      <div className="narrow-form-spaced">{children}</div>
    </ConfigProvider>
  );
};

export default NarrowFormSpaced;
