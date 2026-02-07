import "./styles.scss";
import { Header } from "antd/es/layout/layout";
import Logo from "@shared/ui/icons/Logo";
import { FC, PropsWithChildren } from "react";
import { brandingColorPalette } from "@shared/constants/branding.ts";

interface Props extends PropsWithChildren {}

const SimpleHeader: FC<Props> = ({ children }) => {
  return (
    <Header className="header-simple" style={{ borderColor: brandingColorPalette.brand3 }}>
      <Logo width={94} />

      {children}
    </Header>
  );
};

export default SimpleHeader;
