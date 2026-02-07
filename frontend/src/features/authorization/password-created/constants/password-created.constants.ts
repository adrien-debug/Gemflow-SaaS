import { CreatePasswordPageType } from "@entities/authorization/constants/create-password-page-type.enum.ts";

export const createPasswordTypeToTitle = {
  [CreatePasswordPageType.CREATE]: "Password created",
  [CreatePasswordPageType.RESTORE]: "New password created",
} as const;

export const createPasswordTypeToDescription = {
  [CreatePasswordPageType.CREATE]: "Your password has been created and you can now sign in to the platform",
  [CreatePasswordPageType.RESTORE]: "Your new password has been created and you can now sign in to the platform",
} as const;
