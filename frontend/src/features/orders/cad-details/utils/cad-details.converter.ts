import { CadDetailsFormFields } from "@features/orders/cad-details/models/cad-details-form.model.ts";
import { UpdateCadDetailsDto } from "@entities/order/dto/update-cad-details.dto.ts";

export const convertCadDetailsFormFieldsToCadDto = (formValues: CadDetailsFormFields): UpdateCadDetailsDto => {
  return {
    stlCount: formValues.stlCount,
    createStlFileIds: formValues.createStlFileIds,
    createCadFileIds: formValues.createCadFileIds,
    deletedStlFileIds: formValues.deletedStlFileIds,
    deletedCadFileIds: formValues.deletedCadFileIds,
    cadImages: formValues.cadImages,
    castingPartsImages: formValues.castingPartsImages,
    diamondMapImages: formValues.diamondMapImages,
  };
};
