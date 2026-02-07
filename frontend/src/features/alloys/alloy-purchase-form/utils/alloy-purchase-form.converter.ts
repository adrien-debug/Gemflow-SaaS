import { AlloyPurchase } from "@entities/alloy/models/alloy-purchase.model.ts";
import { AlloyPurchaseFormSchema } from "@features/alloys/alloy-purchase-form/models/alloy-purchase-form.schema.ts";
import { Converter } from "@shared/types/converter.type.ts";
import dayjs from "dayjs";

class AlloyPurchaseFormConverter implements Converter<AlloyPurchase, AlloyPurchaseFormSchema> {
  convert(from: AlloyPurchase): AlloyPurchaseFormSchema {
    return {
      balanceDate: dayjs(from.balanceDate),
      batchWeight: from.batchWeight,
      priceGram: from.priceGram,
      supplierId: from.supplier.id!,
      invoiceFiles: from?.invoice ? [from.invoice] : [],
      alloyId: from.alloy.id,
    };
  }
}

export default new AlloyPurchaseFormConverter();
