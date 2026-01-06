import { UsageSummary } from "@features/orders/order-summary/models/usage-summary.model.ts";

export const calculateProfit = (totalCost: number = 0, margin: number = 0) => {
  return totalCost * (margin / 100);
};

export const getPercentageProfit = (saleTotal: number = 0, totalCost: number = 0) => {
  const profit = saleTotal - totalCost;
  return (profit / saleTotal) * 100;
};

export const calculateTotalValues = <T extends UsageSummary>(metals: T, diamonds: T, labour: T, gems: T) => {
  return {
    profit: metals.profit + diamonds.profit + labour.profit + gems.profit,
    salePrice: metals.salePrice + diamonds.salePrice + labour.salePrice + gems.salePrice,
    totalCost: metals.totalCost + diamonds.totalCost + labour.totalCost + gems.totalCost,
  };
};
