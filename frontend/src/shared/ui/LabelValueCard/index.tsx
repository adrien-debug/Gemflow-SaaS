import "./styles.scss";
import { FC, PropsWithChildren, ReactNode } from "react";
import Flex from "antd/es/flex";
import Typography from "antd/es/typography";
import Spin from "antd/es/spin";

interface Props extends PropsWithChildren {
  label: string;
  description?: string;
  loading?: boolean;
  badge?: ReactNode;
}

const LabelValueCard: FC<Props> = ({ label, description, children, loading, badge }) => {
  return (
    <Flex vertical justify="space-between" className="label-value-card" gap={10} flex={1}>
      <Flex justify="space-between" align="start">
        <div>
          <Typography.Title level={5} className="label">
            {label}
          </Typography.Title>
          {description && <Typography.Text className="description">{description}</Typography.Text>}
        </div>

        {badge}
      </Flex>

      <div className="container-value">{loading ? <Spin size="small" /> : children}</div>
    </Flex>
  );
};

export default LabelValueCard;
