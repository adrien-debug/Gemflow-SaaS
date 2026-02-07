import { FlexProps } from "antd";
import Flex from "antd/es/flex";
import "./styles.scss";
import Skeleton from "antd/es/skeleton";
import { FC, PropsWithChildren, ReactNode } from "react";
import Typography from "antd/es/typography";

interface Props extends PropsWithChildren<Partial<FlexProps>> {
  title?: string;
  description?: string;
  badge?: ReactNode;
  type?: "default" | "primary";
  isAsyncDescription?: boolean;
}

const ActionBar: FC<Props> = ({
  title,
  children,
  badge,
  className,
  description,
  isAsyncDescription,
  type = "primary",
  ...rest
}) => {
  const getDescription = () => {
    if (description && isAsyncDescription) {
      return <Typography.Text className="description">{description}</Typography.Text>;
    }
    if (!description && isAsyncDescription) {
      return <Skeleton.Input active style={{ height: 18, width: 200, marginTop: 4 }} />;
    }
    if (description) {
      return <Typography.Text className="description">{description}</Typography.Text>;
    }
    return null;
  };

  return (
    <Flex
      className={`dashboard-action-bar ${className} ${type}`}
      gap={16}
      justify="space-between"
      align="center"
      {...rest}>
      <Flex gap={20} align="center">
        <Flex vertical>
          {title ? (
            <Typography.Title level={2} className="title">
              {title}
            </Typography.Title>
          ) : (
            <Skeleton.Input active style={{ height: 38, width: 300 }} />
          )}
          {getDescription()}
        </Flex>
        {badge}
      </Flex>

      <Flex gap="middle" align="center">
        {children}
      </Flex>
    </Flex>
  );
};

export default ActionBar;
