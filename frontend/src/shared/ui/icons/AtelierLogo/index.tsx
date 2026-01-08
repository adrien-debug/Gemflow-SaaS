import { FC } from "react";
import Image from "antd/es/image";
import IconLogo from "@assets/atelier-logo.svg";

interface Props {
  width?: number;
  height?: number;
  className?: string;
}

const AtelierLogo: FC<Props> = ({ width, height, className }) => {
  return <Image className={className} draggable={false} width={width} height={height} src={IconLogo} preview={false} />;
};

export default AtelierLogo;
