import { Client } from "@entities/client/model/client.model.ts";
import { OrderPriority } from "@entities/order/constants/order-priority.enum.ts";
import { OrderStatus } from "@entities/order/constants/order-status.enum.ts";
import { BaseItem } from "@shared/types/base-item.type.ts";
import { ImageMetadata } from "@shared/types/image-metadata.ts";

export interface OrderListItem {
  id: number;
  name: string;
  collection: BaseItem;
  priority: OrderPriority;
  dueDate: string;
  status: OrderStatus;
  createdAt: string;
  client: Client;
  segment: BaseItem;
  itemCategory: BaseItem;
  productImages: ImageMetadata[];
}
