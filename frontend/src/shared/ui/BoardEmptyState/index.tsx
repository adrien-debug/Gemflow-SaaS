import "./styles.scss";
import { FC } from "react";
import { Link } from "react-router";
import Flex from "antd/es/flex";
import Button from "antd/es/button";
import Typography from "antd/es/typography";

interface Props {
  title: string;
  description: string;
  link?: string;
  buttonText: string;
  onActionClick?: () => void;
}

const BoardEmptyState: FC<Props> = ({ title, description, link, buttonText, onActionClick }) => {
  return (
    <Flex vertical align="center" className="board-empty-state" gap={24}>
      <Flex vertical align="center" gap={8}>
        <Typography.Title className="title" level={4}>
          {title}
        </Typography.Title>
        <Typography.Text className="subtitle">{description}</Typography.Text>
      </Flex>

      {link ? (
        <Link to={link}>
          <Button size="large" type="primary">
            {buttonText}
          </Button>
        </Link>
      ) : (
        <Button size="large" type="primary" onClick={() => onActionClick?.()}>
          {buttonText}
        </Button>
      )}
    </Flex>
  );
};

export default BoardEmptyState;
