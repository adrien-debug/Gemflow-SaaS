import { User } from "@entities/user/models/user.model.ts";
import { Cylinder } from "@entities/cylinder/model/cylinder.model.ts";
import { BaseItem } from "@shared/types/base-item.type.ts";
import { MetalPurity } from "@entities/metal-purity/models/metal-purity.model.ts";
import { CastingStatus } from "@entities/casting/constants/casting-status.enum.ts";

export interface CastingListItem {
  id: number;
  alloyedMetalWeight: number;
  pureMetalWeight: number;
  alloyWeight: number;
  status: CastingStatus;
  createdAt: string;
  createdBy: User;
  cylinder: Cylinder;
  metal: BaseItem;
  metalPurity: MetalPurity;
  alloyedMetal: BaseItem;
  priceMetalName: BaseItem;
  alloy: BaseItem;
  orderIds: number[];
}
