import { CreatePasswordPageType } from "@entities/authorization/constants/create-password-page-type.enum.ts";

export const getPasswordCreatedLink = (type: CreatePasswordPageType) => {
  switch (type) {
    case CreatePasswordPageType.CREATE:
      return "/login/password-created";
    case CreatePasswordPageType.RESTORE:
      return "/login/new-password-created";
    default:
      return "/login";
  }
};

export const getTitle = (type: CreatePasswordPageType) => {
  switch (type) {
    case CreatePasswordPageType.RESTORE:
      return "Create new password";
    case CreatePasswordPageType.CREATE:
    default:
      return "Create password";
  }
};
