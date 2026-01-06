import { UserRoleEnum } from "@entities/user-roles/constants/user-role.enum.ts";

export const RolesMap = {
  "/administration": [UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN],
  "/settings": [UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN],
  "dashboard-menu-inventory": [UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN],
  "/stock": [UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN],
};
