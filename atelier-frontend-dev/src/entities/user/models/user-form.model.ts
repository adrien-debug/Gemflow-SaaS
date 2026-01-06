import { ImageMetadata } from "@shared/types/image-metadata.ts";

export interface UserFormModel {
  firstName: string;
  lastName: string;
  email: string;
  photos: ImageMetadata[];
}
