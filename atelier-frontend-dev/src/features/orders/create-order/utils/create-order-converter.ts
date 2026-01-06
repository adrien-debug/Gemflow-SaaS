import { CreateOrderDto } from "@entities/order/dto/create-order.dto.ts";
import { CreateOrderSchema } from "@features/orders/create-order/models/create-order.schema.ts";
import { DateFormat } from "@shared/constants/date-format.ts";
import { Converter } from "@shared/types/converter.type.ts";
import dayjs from "dayjs";

class CreateOrderConverter implements Converter<CreateOrderSchema, CreateOrderDto> {
  convert(from: CreateOrderSchema): CreateOrderDto {
    const dueDate = dayjs(from.dueDate).format(DateFormat.YearMonthDay);

    return {
      name: from.name,
      priority: from.priority,
      length: from.length,
      sizeSystem: from.sizeSystem,
      fingerSize: from.fingerSize,
      description: from.description,
      clientId: from.clientId,
      itemCategoryId: from.itemCategoryId,
      collectionId: from.collectionId,
      segmentId: from.segmentId,
      stoneInPacket: from.stoneInPacket,
      settingType: from.settingType,
      gemstoneIds: from.gemstoneIds,
      materials: from.materials,
      productImages: from.productImages,
      dueDate,
    };
  }
}
export default new CreateOrderConverter();
