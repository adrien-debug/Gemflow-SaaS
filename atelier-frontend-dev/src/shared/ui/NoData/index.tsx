import Empty, { EmptyProps } from "antd/es/empty";
import Flex from "antd/es/flex";
import "./styles.scss";
import { FC } from "react";

interface Props extends EmptyProps {}
const NoData: FC<Props> = ({ description = "No data found", ...rest }) => {
  return (
    <Flex className="empty-container" align="center" justify="center">
      <Empty description={description} {...rest} />
    </Flex>
  );
};

export default NoData;
