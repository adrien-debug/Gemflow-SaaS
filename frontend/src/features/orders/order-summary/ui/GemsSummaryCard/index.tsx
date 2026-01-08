import SummaryCardLabel from "@features/orders/order-summary/ui/SummaryCardLabel";
import GemIcon from "@shared/ui/icons/GemIcon";
import SummaryCardTables from "@features/orders/order-summary/ui/SummaryCardTables";
import SummaryCard from "@features/orders/order-summary/ui/SummaryCard";
import { getSummaryGemsCostTableColumns } from "@features/orders/order-summary/utils/get-summary-gems-cost-table-columns.tsx";
import { FC, useEffect, useState } from "react";
import useGemstoneUsageStatistics from "@entities/gemstone/hooks/useGemstoneUsageStatistics.ts";
import { calculateProfit, getPercentageProfit } from "@features/orders/order-summary/utils/get-summary-calculates.ts";
import { UsageSummary } from "@features/orders/order-summary/models/usage-summary.model.ts";
import { getSummaryGemsProfitTableColumns } from "@features/orders/order-summary/utils/get-summary-gems-profit-table-columns.tsx";

interface Props {
  orderId: number;
  setGemsTotal?: (value: UsageSummary) => void;
  margin?: number;
}

const GemsSummaryCard: FC<Props> = ({ orderId, setGemsTotal, margin }) => {
  const { data: gemsData, isPending } = useGemstoneUsageStatistics({ orderIds: [orderId] });

  const [currentProfit, setCurrentProfit] = useState<number>(0);

  const [gemsSaleTotal, setGemsSaleTotal] = useState<number>(0);

  const [percentage, setPercentage] = useState<number>(0);

  const handleSaveProfit = (value: number) => {
    setCurrentProfit(calculateProfit(gemsData?.totalCost as number, value));
  };

  const costGemsColumns = getSummaryGemsCostTableColumns();

  const profitGemsColumns = getSummaryGemsProfitTableColumns({
    currentMargin: margin as number,
    currentProfit,
    handleSaveProfit,
    orderId,
  });

  useEffect(() => {
    if (gemsData) {
      const profit = calculateProfit(gemsData?.totalCost, margin as number);
      const salePrice = (gemsData?.totalCost as number) + profit;

      setGemsSaleTotal(salePrice);
      setCurrentProfit(profit);

      setGemsTotal?.({
        salePrice,
        totalCost: gemsData?.totalCost,
        profit,
      });
    }
  }, [gemsData, margin]);

  useEffect(() => {
    if (gemsSaleTotal && gemsData?.totalCost) {
      const res = getPercentageProfit(gemsSaleTotal, gemsData?.totalCost);
      setPercentage(res);
    }
  }, [gemsSaleTotal, gemsData]);

  return (
    <>
      <SummaryCard
        card={{
          key: "Gems",
          label: (
            <SummaryCardLabel
              icon={<GemIcon />}
              title="Gems"
              saleTotal={gemsSaleTotal}
              loading={isPending}
              percentage={percentage}
            />
          ),
          children: (
            <SummaryCardTables
              costColumns={costGemsColumns}
              profitColumns={profitGemsColumns}
              data={gemsData ? [gemsData] : []}
              saleTotal={gemsSaleTotal}
            />
          ),
        }}
      />
    </>
  );
};

export default GemsSummaryCard;
