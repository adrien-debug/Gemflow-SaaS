import SummaryCardLabel from "@features/orders/order-summary/ui/SummaryCardLabel";
import MetalIcon from "@shared/ui/icons/MetalIcon";
import SummaryCardTables from "@features/orders/order-summary/ui/SummaryCardTables";
import SummaryCard from "@features/orders/order-summary/ui/SummaryCard";
import { getSummaryMetalsCostTableColumns } from "@features/orders/order-summary/utils/get-summary-metals-cost-table-columns.tsx";
import { getSummaryMetalsProfitTableColumns } from "@features/orders/order-summary/utils/get-summary-metals-profit-table-columns.tsx";
import { FC, useEffect, useState } from "react";
import { calculateProfit, getPercentageProfit } from "@features/orders/order-summary/utils/get-summary-calculates.ts";
import { UsageSummary } from "@features/orders/order-summary/models/usage-summary.model.ts";
import useOrderMetalTotals from "@entities/order/hooks/useOrderMetalTotals.ts";
import { OrderMetalTotal } from "@entities/order/models/order-metal-total.model.ts";

interface Props {
  orderId: number;
  setMetalsTotal?: (value: UsageSummary) => void;
  margin?: number;
}

const MetalsSummaryCard: FC<Props> = ({ orderId, setMetalsTotal, margin }) => {
  const { data: metalsData, isPending } = useOrderMetalTotals(orderId);

  const [currentProfit, setCurrentProfit] = useState<number>(0);

  const [metalsSaleTotal, setMetalsSaleTotal] = useState<number>(0);

  const [percentage, setPercentage] = useState<number>(0);

  const [totalCost, setTotalCost] = useState<number>(0);

  const handleSaveProfit = (value: number) => {
    setCurrentProfit(calculateProfit(totalCost, value));
  };

  const costMetalsColumns = getSummaryMetalsCostTableColumns();

  const profitMetalsColumns = getSummaryMetalsProfitTableColumns({
    currentMargin: margin as number,
    currentProfit,
    handleSaveProfit,
    orderId,
  });

  useEffect(() => {
    if (metalsData) {
      const calculateTotalCost = (data: OrderMetalTotal[]) => {
        return data?.reduce((sum, item) => sum + (item?.totalCost || 0), 0);
      };

      const sum = calculateTotalCost(metalsData);
      setTotalCost(sum);
    }
  }, [metalsData]);

  useEffect(() => {
    if (metalsData && totalCost) {
      const profit = calculateProfit(totalCost, margin as number);
      const salePrice = totalCost + profit;

      setMetalsSaleTotal(salePrice);
      setCurrentProfit(profit);

      setMetalsTotal?.({
        salePrice,
        totalCost,
        profit,
      });
    }
  }, [metalsData, totalCost, margin]);

  useEffect(() => {
    if (metalsSaleTotal && totalCost) {
      const res = getPercentageProfit(metalsSaleTotal, totalCost);
      setPercentage(res);
    }
  }, [totalCost, metalsSaleTotal]);

  return (
    <>
      <SummaryCard
        card={{
          key: "metals-summary",
          label: (
            <SummaryCardLabel
              icon={<MetalIcon />}
              title="Metals"
              saleTotal={metalsSaleTotal}
              loading={isPending}
              percentage={percentage}
            />
          ),
          children: (
            <SummaryCardTables
              costColumns={costMetalsColumns}
              profitColumns={profitMetalsColumns}
              data={metalsData}
              totalCost={totalCost}
              saleTotal={metalsSaleTotal}
              profitData={[
                {
                  profit: currentProfit,
                  margin: margin || 0,
                },
              ]}
              isMaterial
            />
          ),
        }}
      />
    </>
  );
};

export default MetalsSummaryCard;
