import { CreateAlloyedMetalPurchaseDto } from "@entities/alloyed-metal/dto/create-alloyed-metal-purchase.dto.ts";
import { AlloyedMetalPurchaseFormSchema } from "@features/alloyed-metals/alloyed-metal-purchase-form/models/alloyed-metal-purchase-form.schema.ts";
import { Converter } from "@shared/types/converter.type.ts";
import { DateFormat } from "@shared/constants/date-format.ts";

class AddAlloyedMetalPurchaseConverter
  implements Converter<AlloyedMetalPurchaseFormSchema, CreateAlloyedMetalPurchaseDto>
{
  convert(from: AlloyedMetalPurchaseFormSchema): CreateAlloyedMetalPurchaseDto {
    return {
      balanceDate: from.balanceDate.format(DateFormat.YearMonthDay),
      batchWeight: from.batchWeight,
      priceGram: from.priceGram,
      alloyId: from.alloyId,
      alloyedMetalId: from.alloyedMetalId,
    };
  }
}

export default new AddAlloyedMetalPurchaseConverter();
