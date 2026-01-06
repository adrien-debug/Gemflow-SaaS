import { MetalPurity } from "@entities/metal-purity/models/metal-purity.model";
import { BaseItem } from "@shared/types/base-item.type.ts";

export interface OrderMetalTotal {
  id: number;
  orderId: number;
  totalCost: number;
  priceGram: number;
  weightIn: number;
  weightOut: number;
  metal: BaseItem;
  metalPurity: MetalPurity;
}
