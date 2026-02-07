import { FC } from "react";
import Flex from "antd/es/flex";
import LabelValueCard from "@shared/ui/LabelValueCard";
import useGemstoneUsageStatistics from "@entities/gemstone/hooks/useGemstoneUsageStatistics.ts";
import { moneyFormatter } from "@shared/utils/formatter.ts";

interface Props {
  orderId: number;
}

const GemstoneUsageStatistics: FC<Props> = ({ orderId }) => {
  const { data, isFetching } = useGemstoneUsageStatistics({ orderIds: [orderId] });

  return (
    <Flex gap={8}>
      <LabelValueCard label="Total weight, ct" loading={isFetching}>
        {data?.totalWeight}
      </LabelValueCard>
      <LabelValueCard label="Total weight, g" loading={isFetching}>
        {data?.totalWeightGrams}
      </LabelValueCard>
      <LabelValueCard label="Total cost" loading={isFetching}>
        ${moneyFormatter(data?.totalCost, 2)}
      </LabelValueCard>
    </Flex>
  );
};

export default GemstoneUsageStatistics;
