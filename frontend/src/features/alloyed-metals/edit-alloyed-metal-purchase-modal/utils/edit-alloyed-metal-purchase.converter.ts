import { UpdateAlloyedMetalPurchaseDto } from "@entities/alloyed-metal/dto/update-alloyed-metal-purchase.dto.ts";
import { AlloyedMetalPurchaseFormSchema } from "@features/alloyed-metals/alloyed-metal-purchase-form/models/alloyed-metal-purchase-form.schema.ts";
import { Converter } from "@shared/types/converter.type.ts";
import { DateFormat } from "@shared/constants/date-format.ts";

class EditAlloyedMetalPurchaseConverter
  implements Converter<AlloyedMetalPurchaseFormSchema, UpdateAlloyedMetalPurchaseDto>
{
  convert(from: AlloyedMetalPurchaseFormSchema): UpdateAlloyedMetalPurchaseDto {
    return {
      balanceDate: from.balanceDate.format(DateFormat.YearMonthDay),
      batchWeight: from.batchWeight,
      priceGram: from.priceGram,
    };
  }
}

export default new EditAlloyedMetalPurchaseConverter();
