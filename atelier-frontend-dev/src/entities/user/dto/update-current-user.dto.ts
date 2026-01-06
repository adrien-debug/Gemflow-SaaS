import { ImageMetadata } from "@shared/types/image-metadata.ts";

// Used by the user itself in a profile
export interface UpdateCurrentUserDto {
  firstName: string;
  lastName: string;
  photos?: ImageMetadata[];
}
