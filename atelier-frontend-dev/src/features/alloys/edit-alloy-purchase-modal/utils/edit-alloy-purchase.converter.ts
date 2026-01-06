import { AlloyPurchaseDto } from "@entities/alloy/dto/alloy-purchase.dto.ts";
import { AlloyPurchaseFormSchema } from "@features/alloys/alloy-purchase-form/models/alloy-purchase-form.schema.ts";
import { Converter } from "@shared/types/converter.type.ts";
import { DateFormat } from "@shared/constants/date-format.ts";

class EditAlloyPurchaseConverter implements Converter<AlloyPurchaseFormSchema, AlloyPurchaseDto> {
  convert(from: AlloyPurchaseFormSchema): AlloyPurchaseDto {
    let invoiceId;

    if (from.createInvoiceIds?.[0]) {
      invoiceId = from.createInvoiceIds[0];
    } else if (from.deleteInvoiceIds?.length) {
      invoiceId = null;
    } else {
      invoiceId = from.invoiceFiles?.[0]?.id;
    }

    return {
      balanceDate: from.balanceDate.format(DateFormat.YearMonthDay),
      batchWeight: from.batchWeight,
      priceGram: from.priceGram,
      supplierId: from.supplierId,
      invoiceId,
      alloyId: from.alloyId,
    };
  }
}

export default new EditAlloyPurchaseConverter();
