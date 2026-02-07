import { ImageMetadata } from "@shared/types/image-metadata.ts";
import { UserRole } from "@entities/user-roles/models/user-role.model";

export interface User {
  isActive: boolean;
  id: number;
  fullName: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  email: string;
  photos: ImageMetadata[];
}
