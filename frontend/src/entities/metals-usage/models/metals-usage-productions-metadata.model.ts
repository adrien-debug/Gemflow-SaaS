import { BaseItem } from "@shared/types/base-item.type.ts";
import { MetalPurity } from "@entities/metal-purity/models/metal-purity.model.ts";
import { MetalsUsageProductionItem } from "@entities/metals-usage/models/metals-usage-production-item.model.ts";

export interface MetalsUsageProductionsMetadata {
  metal: BaseItem;
  metalPurity: MetalPurity;
  totalWeight: number;
  totalCost: number;
  otherMetalProductions: MetalsUsageProductionItem[];
}
