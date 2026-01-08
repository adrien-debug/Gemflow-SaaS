export interface MarkStockItemToSoldDto {
  clientId: number;
  saleDate: string;
}

export interface MarkStockItemMemoOutDto {
  issueClientId: number;
  issueDate: string;
}

export interface MarkStockItemReturnDto {
  returnDate: string;
}
