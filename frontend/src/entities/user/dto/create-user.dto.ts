import { ImageMetadata } from "@shared/types/image-metadata.ts";

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  roleId: number;
  email?: string;
  photos?: ImageMetadata[];
}
