import { BaseItem } from "@shared/types/base-item.type.ts";

export interface OrderMaterial {
  id: number;
  materialMetal: BaseItem;
  clawMetal: BaseItem;
  hallmarkLogo?: BaseItem;
}
