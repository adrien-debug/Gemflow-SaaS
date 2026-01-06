import { FC } from "react";
import Image from "antd/es/image";
import IconLogo from "@assets/logo.svg";

interface Props {
  width?: number;
  height?: number;
  className?: string;
}

const Logo: FC<Props> = ({ width, height, className }) => {
  return <Image className={className} draggable={false} width={width} height={height} src={IconLogo} preview={false} />;
};

export default Logo;
