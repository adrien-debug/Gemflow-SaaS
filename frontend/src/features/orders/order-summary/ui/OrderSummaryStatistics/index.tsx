import LabelValueCard from "@shared/ui/LabelValueCard";
import Flex from "antd/es/flex";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import "./styles.scss";
import { FC, useEffect, useState } from "react";
import { UsageSummary } from "@features/orders/order-summary/models/usage-summary.model.ts";
import { getPercentageProfit } from "@features/orders/order-summary/utils/get-summary-calculates.ts";
import TagPercentageGrowth from "@shared/ui/TagPercentageGrowth";

interface Props {
  statisticValues?: UsageSummary;
  loading?: boolean;
}

const OrderSummaryStatistics: FC<Props> = ({ statisticValues, loading }) => {
  const [percentage, setPercentage] = useState<number>(0);

  useEffect(() => {
    if (statisticValues?.salePrice && statisticValues?.totalCost) {
      const res = getPercentageProfit(statisticValues?.salePrice, statisticValues?.totalCost);
      setPercentage(res);
    }
  }, [statisticValues]);

  return (
    <>
      <Flex gap={8} className="label-value-card-wrapper">
        <LabelValueCard label="Total cost" loading={loading}>
          ${moneyFormatter(statisticValues?.totalCost, 2)}
        </LabelValueCard>

        <div className="label-value-card-separator" />

        <LabelValueCard label="Sale price" loading={loading}>
          ${moneyFormatter(statisticValues?.salePrice, 2)}
        </LabelValueCard>

        <div className="label-value-card-separator" />

        <LabelValueCard label="Profit" loading={loading} badge={<TagPercentageGrowth percentage={percentage} />}>
          ${moneyFormatter(statisticValues?.profit, 2)}
        </LabelValueCard>
      </Flex>
    </>
  );
};

export default OrderSummaryStatistics;
