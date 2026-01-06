import { BaseItem } from "@shared/types/base-item.type.ts";
import { DiamondQuality } from "@entities/diamond/constants/diamond-quality.enum.ts";

export interface DiamondRecord {
  stoneCarat: number;
  caratLeft: number;
  id: number;
  parcelName: string;
  stonePrice: number;
  totalPrice: number;
  qualityType: DiamondQuality;
  quantity?: number;
  diamondShape: BaseItem;
  sizeFrom: number;
  sizeTo: number;
  sizeName: string;
  supplier: BaseItem;
}
