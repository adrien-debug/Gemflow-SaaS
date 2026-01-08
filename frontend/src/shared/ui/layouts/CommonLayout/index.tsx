import { FC, PropsWithChildren } from "react";
import "./styles.scss";
import Layout from "antd/es/layout";

const CommonLayout: FC<PropsWithChildren> = ({ children }) => {
  return <Layout className="common-layout">{children}</Layout>;
};

export default CommonLayout;
