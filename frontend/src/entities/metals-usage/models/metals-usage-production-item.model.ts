import { BaseItem } from "@shared/types/base-item.type.ts";
import { MetalPurity } from "@entities/metal-purity/models/metal-purity.model.ts";
import { User } from "@entities/user/models/user.model.ts";
import { MaterialType } from "@entities/material/constants/material-type.enum.ts";
import { OperationType } from "@entities/material/constants/operation-type.enum.ts";

export interface MetalsUsageProductionItem {
  id: number;
  orderId: number;
  createdAt: string;
  operation: OperationType;
  materialType: MaterialType;
  weight: number;
  cost: number;
  material: BaseItem;
  metal: BaseItem;
  metalPurity: MetalPurity;
  employee: Omit<User, "isActive" | "email" | "role">;
}
