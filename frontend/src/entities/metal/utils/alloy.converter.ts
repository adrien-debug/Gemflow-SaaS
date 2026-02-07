import { AlloyParameters } from "@entities/metal/models/alloy-parameters.model.ts";
import { UpdateAlloysDto } from "@entities/metal/dto/update-alloys.dto.ts";

export const convertAlloyParametersToUpdateDto = (parameters: AlloyParameters): UpdateAlloysDto => {
  return {
    id: parameters.id,
    name: parameters.name,
    waxCastingValue: parameters.waxCastingValue,
    priceMetalNameId: parameters.priceMetalName?.id as number,
    metalIds: (parameters?.metals?.map?.((metal) => metal.id) as number[]) || [],
    metalPurities: {
      requestDtoList: parameters.metalPurities || [],
      deletedIds: [],
    },
  };
};

export const generateEmptyAlloyParametersItem = (): Partial<UpdateAlloysDto> => ({
  id: null,
  name: undefined,
  waxCastingValue: undefined,
  priceMetalNameId: undefined,
  metalIds: [],
  metalPurities: undefined,
});
