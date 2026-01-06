import { FC } from "react";
import Flex from "antd/es/flex";
import LabelValueCard from "@shared/ui/LabelValueCard";
import useDiamondUsageStatistics from "@entities/diamond/hooks/useDiamondUsageStatistics.ts";
import { DiamondUsageStatus } from "@entities/diamond/constants/diamond-usage-status.enum.ts";
import { moneyFormatter } from "@shared/utils/formatter.ts";

interface Props {
  orderId: number;
}

const DiamondUsageStatistics: FC<Props> = ({ orderId }) => {
  const { data, isPending } = useDiamondUsageStatistics({
    orderIds: [orderId],
    statuses: [DiamondUsageStatus.GOOD_QUALITY],
  });

  return (
    <Flex gap={8}>
      <LabelValueCard label="Quantity" loading={isPending}>
        {data?.totalQuantity}
      </LabelValueCard>

      <LabelValueCard label="Total weight, ct" loading={isPending}>
        {data?.totalWeight}
      </LabelValueCard>

      <LabelValueCard label="Total weight, g" loading={isPending}>
        {data?.totalWeightGrams}
      </LabelValueCard>

      <LabelValueCard label="Total cost" loading={isPending}>
        ${moneyFormatter(data?.totalPrice, 2)}
      </LabelValueCard>

      <LabelValueCard label="Cost with markup" loading={isPending}>
        ${moneyFormatter(data?.totalMarkupPrice, 2)}
      </LabelValueCard>
    </Flex>
  );
};

export default DiamondUsageStatistics;
