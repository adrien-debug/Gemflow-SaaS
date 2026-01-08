import { DiamondRecord } from "@entities/diamond/models/diamond-record.model.ts";
import { DiamondRecordFormFields } from "@features/diamonds/diamond-record-form/models/diamond-record-form-fields.model.ts";
import { DiamondRecordDto } from "@entities/diamond/dto/diamond-record.dto.ts";

export const convertDiamondRecordToFormModel = (record: DiamondRecord): DiamondRecordFormFields => {
  return {
    diamondShapeId: record.diamondShape?.id,
    qualityType: record.qualityType,
    supplierId: record.supplier?.id,
    sizeFrom: record.sizeFrom,
    sizeTo: record.sizeTo,
    stoneCarat: record.stoneCarat,
    parcelName: record.parcelName,
    stonePrice: record.stonePrice,
    quantity: record.quantity,
  };
};

export const convertDiamondRecordToDto = (formValue: DiamondRecordFormFields): DiamondRecordDto => {
  return {
    ...formValue,
  };
};
