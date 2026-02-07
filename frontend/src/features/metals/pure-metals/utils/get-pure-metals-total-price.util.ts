import { PureMetalSummary } from "@entities/metal/models/pure-metals-summary.model.ts";

export const getPureMetalsCurrentTotalCost = (items: PureMetalSummary[] = []) => {
  return items.reduce((accumulator, current) => accumulator + current.currentTotalCost, 0);
};

export const getPureMetalsTotalCost = (items: PureMetalSummary[] = []) => {
  return items.reduce((accumulator, current) => accumulator + current.totalCost, 0);
};

export const getPureMetalsTotalGrowth = (items: PureMetalSummary[] = []) => {
  const totalCost = getPureMetalsTotalCost(items);
  if (totalCost === 0) {
    return 0;
  }
  const currentTotalCost = getPureMetalsCurrentTotalCost(items);
  const result = ((currentTotalCost - totalCost) / totalCost) * 100;
  return parseFloat(result.toFixed(2));
};
