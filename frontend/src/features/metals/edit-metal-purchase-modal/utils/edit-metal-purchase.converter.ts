import { Converter } from "@shared/types/converter.type.ts";
import { MetalPurchaseSchema } from "@features/metals/pure-metal-purchase-form/models/metal-purchase.schema.ts";
import { PureMetalPurchaseDto } from "@entities/metal/dto/pure-metal-purchase.dto.ts";
import { DateFormat } from "@shared/constants/date-format.ts";

class EditMetalPurchaseConverter implements Converter<MetalPurchaseSchema, PureMetalPurchaseDto> {
  convert(from: MetalPurchaseSchema): PureMetalPurchaseDto {
    let invoiceId;

    if (from.createInvoiceFileIds?.[0]) {
      invoiceId = from.createInvoiceFileIds[0];
    } else if (from.deletedInvoiceFileIds?.length) {
      invoiceId = null;
    } else {
      invoiceId = from.invoiceFiles?.[0]?.id;
    }

    return {
      balanceDate: from.balanceDate.format(DateFormat.YearMonthDay),
      priceGram: from.pricePerGram,
      coc: from.coc,
      barNumber: from.barNumber,
      batchWeight: from.weight,
      invoiceId,
      priceMetalNameId: from.metalId,
      supplierId: from.supplierId,
    };
  }
}

export default new EditMetalPurchaseConverter();
