import { Converter } from "@shared/types/converter.type.ts";
import { CastingFormSchema } from "@features/casting/casting-form/models/casting-form.model.ts";
import { CastingMetadata } from "@entities/casting/models/casting.model.ts";

class CastingMetadataToFormConverter implements Converter<CastingMetadata, CastingFormSchema> {
  convert(from: CastingMetadata): CastingFormSchema {
    return {
      alloyedMetalId: from.alloyedMetal?.id as number,
      alloyedMetalWeight: from.alloyedMetalWeight,
      alloyId: from.alloy?.id as number,
      alloyWeight: from.alloyWeight,
      cylinderId: from.cylinder?.id as number,
      purityId: from.metalPurity.id,
      supportWeight: from.supportWeight,
      pureMetalWeight: from.pureMetalWeight,
      waxTreeWeight: from.supportWithWaxTreeWeight,
      pureMetalId: from.priceMetalName?.id as number,
      materialId: from.metal?.id as number,
      reuseWeight: from.reuseWeight,
    };
  }
}

export default new CastingMetadataToFormConverter();
