import { UpdateOrderDto } from "@entities/order/dto/update-order.dto.ts";
import { EditOrderSchema } from "@features/orders/edit-order/models/edit-order.schema.ts";
import { DateFormat } from "@shared/constants/date-format.ts";
import { Converter } from "@shared/types/converter.type.ts";
import dayjs from "dayjs";

class EditOrderConverter implements Converter<EditOrderSchema, UpdateOrderDto> {
  convert(from: EditOrderSchema): UpdateOrderDto {
    const dueDate = dayjs(from.dueDate).format(DateFormat.YearMonthDay);
    const acceptanceDate = dayjs(from.acceptanceDate).format(DateFormat.YearMonthDay);

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
      ...(from.dueDate !== undefined ? { dueDate } : {}),
      ...(from.acceptanceDate !== undefined ? { acceptanceDate } : {}),
    };
  }
}
export default new EditOrderConverter();
