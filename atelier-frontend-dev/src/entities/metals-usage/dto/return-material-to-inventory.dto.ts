import { MaterialType } from "@entities/material/constants/material-type.enum.ts";

export interface ReturnMaterialToInventoryDto {
  metalId: number;
  metalPurityId: number;
  materialType: MaterialType;
  materialId: number;
  alloyId?: number;
  weight: number;
  employeeId: number;
}
