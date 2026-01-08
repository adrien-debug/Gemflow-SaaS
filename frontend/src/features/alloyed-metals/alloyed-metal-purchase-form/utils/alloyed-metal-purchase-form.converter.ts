import { AlloyedMetalPurchase } from "@entities/alloyed-metal/models/alloyed-metal-purchase.model.ts";
import { AlloyedMetalPurchaseFormSchema } from "@features/alloyed-metals/alloyed-metal-purchase-form/models/alloyed-metal-purchase-form.schema.ts";
import { Converter } from "@shared/types/converter.type.ts";
import dayjs from "dayjs";

class AlloyedMetalPurchaseFormConverter implements Converter<AlloyedMetalPurchase, AlloyedMetalPurchaseFormSchema> {
  convert(from: AlloyedMetalPurchase): AlloyedMetalPurchaseFormSchema {
    return {
      balanceDate: dayjs(from.balanceDate),
      batchWeight: from.batchWeight,
      priceGram: from.priceGram,
      alloyId: from.alloy.id!,
      alloyedMetalId: from.alloyedMetal.id!,
    };
  }
}

export default new AlloyedMetalPurchaseFormConverter();
