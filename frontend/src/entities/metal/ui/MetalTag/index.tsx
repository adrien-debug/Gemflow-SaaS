import Tag from "antd/es/tag";
import "./styles.scss";
import { FC, PropsWithChildren } from "react";

const MetalTag: FC<PropsWithChildren> = ({ children }) => {
  return <Tag className="metal-tag">{children}</Tag>;
};

export default MetalTag;
