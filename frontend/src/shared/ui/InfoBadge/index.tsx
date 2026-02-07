import Flex from "antd/es/flex";
import "./styles.scss";
import { FC } from "react";

interface InfoBadgeProps {
  title: string | number;
}
const InfoBadge: FC<InfoBadgeProps> = ({ title }) => {
  return <Flex className="badge-container">{title}</Flex>;
};

export default InfoBadge;
