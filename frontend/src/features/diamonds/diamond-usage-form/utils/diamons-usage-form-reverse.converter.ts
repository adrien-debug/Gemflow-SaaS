import { DiamondUsageFormSchema } from "@features/diamonds/diamond-usage-form/models/diamond-usage-form.model.ts";
import { Converter } from "@shared/types/converter.type.ts";
import dayjs from "dayjs";
import { DiamondUsageMetadata } from "@entities/diamond/models/diamond-usage-metadata.model.ts";

class DiamondUsageFormReverse implements Converter<DiamondUsageMetadata, DiamondUsageFormSchema> {
  convert(from: DiamondUsageMetadata): DiamondUsageFormSchema {
    return {
      supplierId: from.diamond?.supplier?.id as number,
      shapeId: from.diamond?.diamondShape?.id as number,
      diamondRecordId: from.diamond?.id,
      quantity: from.quantity,
      employeeId: from.employee?.id,
      date: dayjs(from.date),
      stoneCarat: from.diamond?.stoneCarat,
      stonePrice: from.diamond?.stonePrice,
      totalWeight: from.totalWeight,
      totalPrice: from.totalPrice,
    };
  }
}

export default new DiamondUsageFormReverse();
