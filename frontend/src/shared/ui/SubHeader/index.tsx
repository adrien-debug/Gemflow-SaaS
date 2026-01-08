import "./styles.scss";
import Flex from "antd/es/flex";
import Typography from "antd/es/typography";
import { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title?: string;
  description?: string;
}

const SubHeader: FC<Props> = ({ title, description, children }) => {
  return (
    <Flex className="administration-sub-header" justify="space-between" align="center">
      <div>
        <Typography.Title level={4}>{title}</Typography.Title>
        <Typography.Text type="secondary">{description}</Typography.Text>
      </div>
      <Flex gap="middle" align="center">
        {children}
      </Flex>
    </Flex>
  );
};

export default SubHeader;
