import SummaryCard from "@features/orders/order-summary/ui/SummaryCard";
import SummaryCardLabel from "@features/orders/order-summary/ui/SummaryCardLabel";
import DiamondIcon from "@shared/ui/icons/DiamondIcon";
import SummaryCardTables from "@features/orders/order-summary/ui/SummaryCardTables";
import { getSummaryDiamondsCostTableColumns } from "@features/orders/order-summary/utils/get-summary-diamonds-cost-table-columns.tsx";
import { FC, useEffect, useState } from "react";
import useDiamondUsageStatistics from "@entities/diamond/hooks/useDiamondUsageStatistics.ts";
import { calculateProfit, getPercentageProfit } from "@features/orders/order-summary/utils/get-summary-calculates.ts";
import { UsageSummary } from "@features/orders/order-summary/models/usage-summary.model.ts";
import { getSummaryDiamondsProfitTableColumns } from "@features/orders/order-summary/utils/get-summary-diamond-profit-table-columns.tsx";
import { DiamondUsageStatus } from "@entities/diamond/constants/diamond-usage-status.enum.ts";

interface Props {
  orderId: number;
  setDiamondsTotal?: (value: UsageSummary) => void;
  margin?: number;
}

const DiamondsSummaryCard: FC<Props> = ({ orderId, setDiamondsTotal, margin }) => {
  const { data: diamondsData, isPending } = useDiamondUsageStatistics({
    orderIds: [orderId],
    statuses: [DiamondUsageStatus.GOOD_QUALITY],
  });

  const [currentProfit, setCurrentProfit] = useState(0);

  const [diamondsSaleTotal, setDiamondsSaleTotal] = useState<number>(0);

  const [percentage, setPercentage] = useState<number>(0);

  const handleSaveProfit = (value: number) => {
    setCurrentProfit(calculateProfit(diamondsData?.totalPrice as number, value));
  };

  const costDiamondsColumns = getSummaryDiamondsCostTableColumns();

  const profitDiamondsColumns = getSummaryDiamondsProfitTableColumns({
    currentMargin: margin as number,
    currentProfit,
    handleSaveProfit,
    orderId,
  });

  useEffect(() => {
    if (diamondsData) {
      const profit = calculateProfit(diamondsData.totalPrice, margin as number);
      const salePrice = (diamondsData.totalPrice as number) + profit;

      setDiamondsSaleTotal(salePrice);
      setCurrentProfit(profit);

      setDiamondsTotal?.({
        salePrice,
        totalCost: diamondsData?.totalPrice,
        profit,
      });
    }
  }, [diamondsData, margin]);

  useEffect(() => {
    if (diamondsSaleTotal && diamondsData?.totalPrice) {
      const res = getPercentageProfit(diamondsSaleTotal, diamondsData?.totalPrice);
      setPercentage(res);
    }
  }, [diamondsSaleTotal, diamondsData]);

  return (
    <>
      <SummaryCard
        card={{
          key: "Diamonds",
          label: (
            <SummaryCardLabel
              icon={<DiamondIcon />}
              title="Diamonds"
              saleTotal={diamondsSaleTotal}
              loading={isPending}
              percentage={percentage}
            />
          ),
          children: (
            <SummaryCardTables
              costColumns={costDiamondsColumns}
              profitColumns={profitDiamondsColumns}
              data={diamondsData ? [diamondsData] : []}
              saleTotal={diamondsSaleTotal}
            />
          ),
        }}
      />
    </>
  );
};

export default DiamondsSummaryCard;
