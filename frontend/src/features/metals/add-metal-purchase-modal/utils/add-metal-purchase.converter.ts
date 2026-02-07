import { Converter } from "@shared/types/converter.type.ts";
import { MetalPurchaseSchema } from "@features/metals/pure-metal-purchase-form/models/metal-purchase.schema.ts";
import { PureMetalPurchaseDto } from "@entities/metal/dto/pure-metal-purchase.dto.ts";
import { DateFormat } from "@shared/constants/date-format.ts";

class AddMetalPurchaseConverter implements Converter<MetalPurchaseSchema, PureMetalPurchaseDto> {
  convert(from: MetalPurchaseSchema): PureMetalPurchaseDto {
    return {
      balanceDate: from.balanceDate.format(DateFormat.YearMonthDay),
      priceGram: from.pricePerGram,
      coc: from.coc,
      barNumber: from.barNumber,
      batchWeight: from.weight,
      invoiceId: from.createInvoiceFileIds?.[0],
      priceMetalNameId: from.metalId,
      supplierId: from.supplierId,
    };
  }
}

export default new AddMetalPurchaseConverter();
