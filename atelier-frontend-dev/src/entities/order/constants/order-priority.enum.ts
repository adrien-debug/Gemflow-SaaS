export enum OrderPriority {
  Top = "TOP",
  High = "HIGH",
  Normal = "NORM",
  Low = "LOW",
}

export const orderPriorityNameMap: Record<OrderPriority, string> = {
  [OrderPriority.Top]: "Top",
  [OrderPriority.High]: "High",
  [OrderPriority.Normal]: "Normal",
  [OrderPriority.Low]: "Low",
};
