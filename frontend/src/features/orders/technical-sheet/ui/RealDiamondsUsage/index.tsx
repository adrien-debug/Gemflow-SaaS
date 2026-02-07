import LabelValueCard from "@shared/ui/LabelValueCard";
import useDiamondUsageStatistics from "@entities/diamond/hooks/useDiamondUsageStatistics.ts";
import { DiamondUsageStatus } from "@entities/diamond/constants/diamond-usage-status.enum.ts";
import { FC } from "react";
import Flex from "antd/es/flex";
import RealDiamondUsageTable from "features/orders/technical-sheet/ui/RealDiamondUsageTable";

interface Props {
  orderId: number;
}

const RealDiamondsUsage: FC<Props> = ({ orderId }) => {
  const { data, isPending } = useDiamondUsageStatistics({
    orderIds: [orderId],
    statuses: [DiamondUsageStatus.GOOD_QUALITY],
  });

  return (
    <Flex vertical gap={23}>
      <Flex gap={8} className="label-value-card-wrapper">
        <LabelValueCard label="Total diamonds" loading={isPending}>
          {data?.totalQuantity}
        </LabelValueCard>

        <div className="label-value-card-separator" />

        <LabelValueCard label="Total weight, Ct" loading={isPending}>
          {data?.totalWeight}
        </LabelValueCard>
      </Flex>

      <RealDiamondUsageTable orderId={orderId} />
    </Flex>
  );
};

export default RealDiamondsUsage;
