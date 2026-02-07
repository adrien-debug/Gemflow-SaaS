import { Client } from "@entities/client/model/client.model.ts";
import { OrderPriority } from "@entities/order/constants/order-priority.enum.ts";
import { OrderStatus } from "@entities/order/constants/order-status.enum.ts";
import { RingSizeType } from "@entities/order/constants/ring-size.enum.ts";
import { OrderMaterial } from "@entities/order/models/order-material.model.ts";
import { SettingType } from "@entities/setting-type/constants/setting-type.enum.ts";
import { BaseItem } from "@shared/types/base-item.type.ts";
import { ImageMetadata } from "@shared/types/image-metadata.ts";
import { UserNameMetadata } from "@entities/user/models/user-name.model.ts";

export interface Order {
  id: number;
  name: string;
  priority: OrderPriority;
  dueDate: string;
  acceptanceDate: string;
  status: OrderStatus;
  length: number;
  sizeSystem: RingSizeType;
  fingerSize: number;
  description: string;
  createdAt: string;
  createdBy: UserNameMetadata;
  client: Client;
  itemCategory: BaseItem;
  collection: BaseItem;
  segment: BaseItem;
  stoneInPacket: boolean;
  settingType: SettingType;
  gemstones: (BaseItem & { certificate: string })[];
  productImages: ImageMetadata[];
  materials: OrderMaterial[];
  labourHourlyRate: number;
}
