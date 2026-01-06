import { Order } from "@entities/order/models/order.model.ts";
import { EditOrderSchema } from "@features/orders/edit-order/models/edit-order.schema.ts";
import { Converter } from "@shared/types/converter.type.ts";
import dayjs from "dayjs";

class OrderConverter implements Converter<Order, EditOrderSchema> {
  convert(from: Order): EditOrderSchema {
    return {
      name: from.name,
      priority: from.priority,
      length: from.length,
      dueDate: from.dueDate ? dayjs(from.dueDate) : undefined,
      acceptanceDate: from.acceptanceDate ? dayjs(from.acceptanceDate) : undefined,
      sizeSystem: from.sizeSystem,
      fingerSize: from.fingerSize,
      description: from.description,
      clientId: from.client.id,
      itemCategoryId: from?.itemCategory?.id,
      collectionId: from?.collection?.id,
      segmentId: from?.segment?.id,
      stoneInPacket: from.stoneInPacket,
      settingType: from.settingType,
      gemstoneIds: from.gemstones.map(({ id }) => id!),
      materials: {
        requestDtoList: from.materials.map((material) => ({
          id: material.id,
          materialMetalId: material.materialMetal?.id,
          clawMetalId: material.clawMetal?.id,
          hallmarkLogoId: material?.hallmarkLogo?.id,
        })),
      },
      productImages: from.productImages,
    };
  }
}
export default new OrderConverter();
