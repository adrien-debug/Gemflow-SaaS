import { Converter } from "@shared/types/converter.type.ts";
import { CastingFormSchema } from "@features/casting/casting-form/models/casting-form.model.ts";
import { CastingDto } from "@entities/casting/dto/casting.dto.ts";

class CastingFormToDtoConverter implements Converter<CastingFormSchema, CastingDto> {
  convert(from: CastingFormSchema): CastingDto {
    return {
      alloyedMetalId: from.alloyedMetalId,
      alloyedMetalWeight: from.alloyedMetalWeight,
      alloyId: from.alloyId,
      alloyWeight: from.alloyWeight,
      cylinderId: from.cylinderId,
      metalId: from.materialId,
      metalPurityId: from.purityId,
      pureMetalWeight: from.pureMetalWeight,
      supportWeight: from.supportWeight,
      supportWithWaxTreeWeight: from.waxTreeWeight,
      reuseWeight: from.reuseWeight,
    };
  }
}

export default new CastingFormToDtoConverter();
