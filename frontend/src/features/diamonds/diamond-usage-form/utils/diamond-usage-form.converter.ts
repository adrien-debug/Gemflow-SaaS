import { DiamondUsageFormSchema } from "@features/diamonds/diamond-usage-form/models/diamond-usage-form.model.ts";
import { DiamondUsageDto } from "@entities/diamond/dto/diamond-usage.dto.ts";
import { Converter } from "@shared/types/converter.type.ts";
import { DateFormat } from "@shared/constants/date-format.ts";

class DiamondUsageFormConverter implements Converter<DiamondUsageFormSchema, Omit<DiamondUsageDto, "orderId">> {
  convert(from: DiamondUsageFormSchema): Omit<DiamondUsageDto, "orderId"> {
    return {
      diamondId: from.diamondRecordId,
      date: from?.date?.format(DateFormat.YearMonthDay),
      employeeId: from?.employeeId,
      quantity: from.quantity,
    };
  }
}

export default new DiamondUsageFormConverter();
