import { Nullable } from "@shared/types/nullable.type.ts";
import { DiamondQuality } from "@entities/diamond/constants/diamond-quality.enum.ts";

export interface DiamondRecordDto {
  diamondShapeId: Nullable<number>;
  parcelName: string;
  qualityType: DiamondQuality;
  quantity?: number;
  sizeFrom: number;
  sizeTo: number;
  stoneCarat: number;
  stonePrice: number;
  supplierId: Nullable<number>;
}
