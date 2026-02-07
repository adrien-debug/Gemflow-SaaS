import { AlloyPurchaseDto } from "@entities/alloy/dto/alloy-purchase.dto.ts";
import { AlloyPurchaseFormSchema } from "@features/alloys/alloy-purchase-form/models/alloy-purchase-form.schema.ts";
import { Converter } from "@shared/types/converter.type.ts";
import { DateFormat } from "@shared/constants/date-format.ts";

class AddAlloyPurchaseConverter implements Converter<AlloyPurchaseFormSchema, AlloyPurchaseDto> {
  convert(from: AlloyPurchaseFormSchema): AlloyPurchaseDto {
    return {
      balanceDate: from.balanceDate.format(DateFormat.YearMonthDay),
      batchWeight: from.batchWeight,
      priceGram: from.priceGram,
      supplierId: from.supplierId,
      invoiceId: from.createInvoiceIds?.[0],
      alloyId: from.alloyId,
    };
  }
}

export default new AddAlloyPurchaseConverter();
