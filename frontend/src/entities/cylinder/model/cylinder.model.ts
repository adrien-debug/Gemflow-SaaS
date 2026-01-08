import { BaseItem } from "@shared/types/base-item.type.ts";

export interface Cylinder extends BaseItem {
  metal: BaseItem;
  open: boolean;
}
