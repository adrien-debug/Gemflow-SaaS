import { Converter } from "@shared/types/converter.type.ts";
import { PureMetalPurchase } from "@entities/metal/models/pure-metal-purchase.model.ts";
import { MetalPurchaseSchema } from "@features/metals/pure-metal-purchase-form/models/metal-purchase.schema.ts";
import dayjs from "dayjs";

class PureMetalPurchaseFormConverter implements Converter<PureMetalPurchase, MetalPurchaseSchema> {
  convert(from: PureMetalPurchase): MetalPurchaseSchema {
    return {
      balanceDate: dayjs(from.balanceDate),
      barNumber: from.barNumber,
      coc: from.coc,
      createInvoiceFileIds: [],
      deletedInvoiceFileIds: [],
      invoiceFiles: from.invoice ? [from.invoice] : [],
      metalId: from.priceMetalName?.id as number,
      pricePerGram: from.priceGram,
      supplierId: from.supplier?.id as number,
      weight: from.batchWeight,
    };
  }
}

export default new PureMetalPurchaseFormConverter();
