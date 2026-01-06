import { TabKeys } from "@pages/orders/constants/tab-keys.ts";
import { UserRoleEnum } from "@entities/user-roles/constants/user-role.enum.ts";

export const RolesMap = {
  [TabKeys.SUMMARY]: [UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN],
  [TabKeys.LABOUR]: [UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN],
  [TabKeys.DIAMONDS]: [UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN],
  [TabKeys.GEMSTONES]: [UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN],
  [TabKeys.METALS]: [UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN],
};
