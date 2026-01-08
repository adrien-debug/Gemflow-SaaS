import { CastingFormSchema } from "@features/casting/casting-form/models/casting-form.model.ts";
import { Optional } from "@shared/types/optional.type.ts";
import { AlloyParameters } from "@entities/metal/models/alloy-parameters.model.ts";
import { CastingMetadata } from "@entities/casting/models/casting.model.ts";

export const calculateTotalWeight = (values: CastingFormSchema): Optional<number> => {
  const { alloyWeight, pureMetalWeight, alloyedMetalWeight } = values;
  if (!isNaN(alloyedMetalWeight) && !isNaN(pureMetalWeight) && !isNaN(alloyWeight)) {
    return alloyedMetalWeight + alloyWeight + pureMetalWeight;
  }
  return undefined;
};

export const calculateReusedMaterialRatio = (values: CastingFormSchema): Optional<number> => {
  const { alloyWeight, alloyedMetalWeight } = values;
  const totalWeight = calculateTotalWeight(values);
  if (alloyWeight && alloyedMetalWeight && totalWeight) {
    return ((alloyedMetalWeight + alloyWeight) / totalWeight) * 100;
  }
  return undefined;
};

export const calculateMetalPurity = (values: CastingFormSchema): Optional<number> => {
  const { pureMetalWeight, alloyWeight } = values;
  if (!isNaN(pureMetalWeight) && !isNaN(alloyWeight)) {
    return (pureMetalWeight / (alloyWeight + pureMetalWeight)) * 100;
  }
  return undefined;
};

export const calculateWaxWeight = (values: CastingFormSchema): number => {
  const { supportWeight, waxTreeWeight } = values;
  if (waxTreeWeight && supportWeight) {
    const waxWeight = waxTreeWeight - supportWeight;
    if (waxWeight > 0) {
      return waxWeight;
    }
    return 0;
  }
  return 0;
};

export const calculatePreliminaryCastWeight = (values: CastingFormSchema, alloyParameters: AlloyParameters): number => {
  const waxWeight = calculateWaxWeight(values);
  if (waxWeight && alloyParameters) {
    return alloyParameters.waxCastingValue * waxWeight;
  }
  return 0;
};

export const calculatePartsWeight = (casting: CastingMetadata): number => {
  return parseFloat(
    casting?.orderTasks.reduce((accumulator, current) => accumulator + (current.weight || 0), 0).toFixed(2),
  );
};

export const calculateWeightLoss = (values: CastingFormSchema, casting: CastingMetadata): number => {
  const totalWeight = calculateTotalWeight(values) || 0;
  const partsWeight = calculatePartsWeight(casting);
  const loss = totalWeight - partsWeight - casting.reuseWeight;
  if (loss < 0) return 0;
  return loss;
};
