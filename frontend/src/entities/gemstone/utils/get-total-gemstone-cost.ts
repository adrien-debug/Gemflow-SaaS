import { GemstoneMethodType } from "@entities/gemstone/constants/gemstone-method-type.enum.ts";
import { GemstoneFormSchema } from "@features/gemstones/gemstone-form/model/gemstone-form.model";

export const getTotalGemstoneCost = (values: GemstoneFormSchema): number => {
  let stonePrice = values?.stonePrice || 0;
  if (values?.methodType === GemstoneMethodType.WEIGHT && values?.pricePerCarat && values?.totalWeight) {
    stonePrice = values?.pricePerCarat * values?.totalWeight;
  }
  let total = stonePrice;
  if (values?.customsDutyPriceActive) {
    total += stonePrice * 0.05;
  }
  if (values?.vatPriceActive) {
    total += stonePrice * 0.05;
  }
  if (values?.tenPercentsPriceActive) {
    total += stonePrice * 0.1;
  }

  total += values?.certificateCost || 0;
  total += values?.shipment || 0;

  return parseFloat(total.toFixed(3));
};
