import { OrderPriority } from "@entities/order/constants/order-priority.enum.ts";
import { RingSizeType } from "@entities/order/constants/ring-size.enum.ts";
import { OrderMaterialDto } from "@entities/order/dto/order-material.dto.ts";
import { SettingType } from "@entities/setting-type/constants/setting-type.enum.ts";
import { BatchUpdateDto } from "@shared/types/batch-update.dto.ts";
import { ImageMetadata } from "@shared/types/image-metadata.ts";
import { Nullable } from "@shared/types/nullable.type.ts";

export interface UpdateOrderDto {
  name: string;
  priority: OrderPriority;
  dueDate?: string;
  acceptanceDate?: string;
  length?: number;
  sizeSystem?: RingSizeType;
  fingerSize?: number;
  description?: string;
  clientId: number;
  itemCategoryId: Nullable<number>;
  collectionId?: Nullable<number>;
  segmentId: Nullable<number>;
  stoneInPacket?: boolean;
  settingType?: SettingType;
  gemstoneIds?: number[];
  productImages?: ImageMetadata[];
  materials?: BatchUpdateDto<OrderMaterialDto>;
}
