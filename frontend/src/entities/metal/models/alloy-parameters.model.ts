import { MetalPurity } from "@entities/metal-purity/models/metal-purity.model";
import { BaseItem } from "@shared/types/base-item.type.ts";

export interface AlloyParameters {
  id: number;
  name: string;
  priceMetalName: BaseItem;
  waxCastingValue: number;
  metals: BaseItem[];
  metalPurities: MetalPurity[];
}
