import { FC, PropsWithChildren } from "react";
import "./styles.scss";
import Layout from "antd/es/layout";

const BlankLayout: FC<PropsWithChildren> = ({ children }) => {
  return <Layout className="blank-layout">{children}</Layout>;
};

export default BlankLayout;
