import { FlexProps } from "antd";
import Flex from "antd/es/flex";
import Spin from "antd/es/spin";
import "./styles.scss";
import { FC } from "react";

interface Props extends Omit<FlexProps, "children"> {}

const Loading: FC<Props> = ({ className, ...rest }) => {
  return (
    <Flex {...rest} className={`${className ? className : ""} loading-container`} align="center" justify="center">
      <Spin />
    </Flex>
  );
};

export default Loading;
