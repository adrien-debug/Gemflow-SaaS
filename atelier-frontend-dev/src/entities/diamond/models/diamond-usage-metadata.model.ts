import { DiamondUsageStatus } from "@entities/diamond/constants/diamond-usage-status.enum.ts";
import { DiamondRecord } from "@entities/diamond/models/diamond-record.model.ts";
import { User } from "@entities/user/models/user.model.ts";
import { BaseItem } from "@shared/types/base-item.type.ts";

export interface DiamondUsageMetadata {
  id: number;
  status: DiamondUsageStatus;
  diamond: DiamondRecord;
  quantity: number;
  totalWeight: number;
  totalPrice: number;
  totalMarkupPrice: number;
  employee: Omit<User, "isActive" | "email" | "role">;
  date: string;
  order: BaseItem;
}
