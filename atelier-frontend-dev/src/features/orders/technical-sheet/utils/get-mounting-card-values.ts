import { ImageMetadata } from "@shared/types/image-metadata.ts";
import { TechnicalSheetMetadata } from "@entities/order/models/technical-sheet.model.ts";

export const getFieldValue = (baseNumber: number, technicalSheet?: TechnicalSheetMetadata) => {
  const key = `mountingNote${baseNumber}` as keyof TechnicalSheetMetadata;
  return technicalSheet?.[key] as string;
};

export const getImageSrc = (baseNumber: number, technicalSheet?: TechnicalSheetMetadata) => {
  const key = `mounting${baseNumber}Images` as keyof TechnicalSheetMetadata;
  return technicalSheet?.[key] as ImageMetadata[];
};
