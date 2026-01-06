export enum StockItemStatus {
  AVAILABLE = "AVAILABLE",
  SOLD = "SOLD",
  MEMO_OUT = "MEMO_OUT",
}

export const stockItemStatusNameMap: Record<StockItemStatus, string> = {
  [StockItemStatus.AVAILABLE]: "Available",
  [StockItemStatus.SOLD]: "Sold",
  [StockItemStatus.MEMO_OUT]: "Memo out",
};
