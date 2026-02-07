import Flex from "antd/es/flex";
import OrderSummaryStatistics from "@features/orders/order-summary/ui/OrderSummaryStatistics";
import Typography from "antd/es/typography";
import OrderSummaryDetails from "@features/orders/order-summary/ui/OrderSummaryDetails";
import { FC, useState } from "react";
import { useOrderProfit } from "@entities/order/hooks/useOrderProfit.ts";
import { UsageSummary } from "@features/orders/order-summary/models/usage-summary.model.ts";

interface Props {
  orderId: number;
}

const OrderSummary: FC<Props> = ({ orderId }) => {
  const { data, isPending } = useOrderProfit(orderId);

  const [statisticValues, setStatisticValues] = useState<UsageSummary>();

  return (
    <Flex vertical gap={24}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        Summary
      </Typography.Title>

      <OrderSummaryStatistics statisticValues={statisticValues} loading={isPending} />

      <OrderSummaryDetails data={data} orderId={orderId} setStatisticValues={setStatisticValues} />
    </Flex>
  );
};

export default OrderSummary;
