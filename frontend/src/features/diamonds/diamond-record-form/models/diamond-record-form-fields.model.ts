import { Nullable } from "@shared/types/nullable.type.ts";
import { DiamondQuality } from "@entities/diamond/constants/diamond-quality.enum.ts";

export interface DiamondRecordFormFields {
  diamondShapeId: Nullable<number>;
  parcelName: string;
  supplierId: Nullable<number>;
  sizeFrom: number;
  sizeTo: number;
  qualityType: DiamondQuality;
  quantity?: number;
  stoneCarat: number;
  stonePrice: number;
}
