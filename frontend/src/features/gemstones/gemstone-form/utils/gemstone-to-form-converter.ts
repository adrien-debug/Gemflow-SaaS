import { Gemstone } from "@entities/gemstone/models/gemstone.model";
import { GemstoneFormSchema } from "@features/gemstones/gemstone-form/model/gemstone-form.model";

export const convertGemstoneToForm = (gemstone: Gemstone): GemstoneFormSchema => {
  return {
    id: gemstone.id,
    name: gemstone.name,
    certificate: gemstone.certificate,
    description: gemstone.description,
    numberOfGems: gemstone.numberOfGems,
    totalWeight: gemstone.totalWeight,
    comment: gemstone.comment,
    stonePrice: gemstone.stonePrice,
    pricePerCarat: gemstone.pricePerCarat,
    customsDutyPriceActive: gemstone.customsDutyPriceActive,
    customsDutyPrice: gemstone.customsDutyPrice,
    vatPriceActive: gemstone.vatPriceActive,
    vatPrice: gemstone.vatPrice,
    tenPercentsPriceActive: gemstone.tenPercentsPriceActive,
    tenPercentsPrice: gemstone.tenPercentsPrice,
    certificateCost: gemstone.certificateCost,
    shipment: gemstone.shipment,
    methodType: gemstone.methodType,
    supplierId: gemstone.supplier?.id as number,
    locationId: gemstone.location?.id as number,
    gemstoneImages: gemstone.gemstoneImages,
    totalCost: gemstone.totalCost,
  };
};
