import SummaryCardLabel from "@features/orders/order-summary/ui/SummaryCardLabel";
import LabourIcon from "@shared/ui/icons/LaborIcon";
import SummaryCardTables from "@features/orders/order-summary/ui/SummaryCardTables";
import SummaryCard from "@features/orders/order-summary/ui/SummaryCard";
import { getSummaryLabourCostTableColumns } from "@features/orders/order-summary/utils/get-summary-labor-cost-table-columns.tsx";
import { FC, useEffect, useState } from "react";
import { useLaboursSummary } from "@entities/order/hooks/useLaboursSummary.ts";
import { calculateProfit, getPercentageProfit } from "@features/orders/order-summary/utils/get-summary-calculates.ts";
import { UsageSummary } from "@features/orders/order-summary/models/usage-summary.model.ts";
import { getSummaryLabourProfitTableColumns } from "@features/orders/order-summary/utils/get-summary-labour-profit-table-columns.tsx";
import { useOrder } from "@entities/order/hooks/useOrder.ts";

interface Props {
  orderId: number;
  setLabourTotal?: (value: UsageSummary) => void;
  margin?: number;
}

const LabourSummaryCard: FC<Props> = ({ orderId, setLabourTotal, margin }) => {
  const { data: labourData, isPending } = useLaboursSummary(orderId);

  const { data: orderData } = useOrder(orderId);

  const [currentProfit, setCurrentProfit] = useState<number>(0);

  const [labourSaleTotal, setLabourSaleTotal] = useState<number>(0);

  const [percentage, setPercentage] = useState<number>(0);

  const handleSaveProfit = (value: number) => {
    setCurrentProfit(calculateProfit(labourData?.totalCost as number, value));
  };

  const costLaborColumns = getSummaryLabourCostTableColumns({ hourlyRate: orderData?.labourHourlyRate });

  const profitLabourColumns = getSummaryLabourProfitTableColumns({
    currentMargin: margin as number,
    currentProfit,
    handleSaveProfit,
    orderId,
  });

  useEffect(() => {
    if (labourData) {
      const profit = calculateProfit(labourData.totalCost, margin as number);
      const salePrice = (labourData?.totalCost as number) + profit;

      setLabourSaleTotal(salePrice);
      setCurrentProfit(profit);

      setLabourTotal?.({
        salePrice,
        totalCost: labourData?.totalCost,
        profit,
      });
    }
  }, [labourData, margin]);

  useEffect(() => {
    if (labourSaleTotal && labourData?.totalCost) {
      const res = getPercentageProfit(labourSaleTotal, labourData?.totalCost);
      setPercentage(res);
    }
  }, [labourSaleTotal, labourData]);

  return (
    <>
      <SummaryCard
        card={{
          key: "Labour",
          label: (
            <SummaryCardLabel
              icon={<LabourIcon />}
              title="Labour"
              saleTotal={labourSaleTotal}
              loading={isPending}
              percentage={percentage}
            />
          ),
          children: (
            <SummaryCardTables
              costColumns={costLaborColumns}
              profitColumns={profitLabourColumns}
              data={labourData ? [labourData] : []}
              saleTotal={labourSaleTotal}
            />
          ),
        }}
      />
    </>
  );
};

export default LabourSummaryCard;
