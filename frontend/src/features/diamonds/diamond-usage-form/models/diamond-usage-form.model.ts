import { Dayjs } from "dayjs";

export interface DiamondUsageFormSchema {
  supplierId: number;
  shapeId: number;
  diamondRecordId: number;
  quantity: number;
  employeeId: number;
  date: Dayjs;
  stoneCarat: number;
  stonePrice: number;
  totalWeight: number;
  totalPrice: number;
}
