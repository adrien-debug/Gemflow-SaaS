import Flex from "antd/es/flex";
import "./styles.scss";
import { FC } from "react";
import Typography from "antd/es/typography";

interface Props {
  title: string;
  description: string;
}

const EmptyState: FC<Props> = ({ title, description }) => {
  return (
    <Flex vertical align="center" className="empty-state" gap={8}>
      <Typography.Title className="title" level={5}>
        No {title} added yet
      </Typography.Title>

      <Typography.Text className="subtitle">{description}</Typography.Text>
    </Flex>
  );
};

export default EmptyState;
