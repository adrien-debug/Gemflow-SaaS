import "./styles.scss";
import Flex from "antd/es/flex";
import Typography from "antd/es/typography";
import { FC } from "react";
import Skeleton from "antd/es/skeleton";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import { useOrder } from "@entities/order/hooks/useOrder.ts";

interface Props {
  orderId: number;
}

const LabourDetailsControl: FC<Props> = ({ orderId }) => {
  const { data, isPending } = useOrder(orderId);

  return (
    <Flex align="center" gap={20} className="labour-details-control">
      <Typography.Text type="secondary">Labour hourly rate</Typography.Text>
      {isPending ? (
        <Flex className="skeleton-wrap">
          <Skeleton active paragraph={{ rows: 1 }} title={false} />
        </Flex>
      ) : (
        <Typography.Title className="labour-title" level={4}>
          {`$${moneyFormatter(data?.labourHourlyRate)}`}
        </Typography.Title>
      )}
    </Flex>
  );
};

export default LabourDetailsControl;
