import { OtherMaterial } from "@entities/other-material/model/other-material.model.ts";
import { BaseItem } from "@shared/types/base-item.type.ts";

export interface OtherMaterialTransaction {
  id: number;
  balanceDate: string;
  description: string;
  batchWeight: number;
  order: BaseItem;
  otherMaterial: OtherMaterial;
}
