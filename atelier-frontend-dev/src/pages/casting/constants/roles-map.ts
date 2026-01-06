import { TabKeys } from "@pages/casting/constants/tab-keys.ts";
import { UserRoleEnum } from "@entities/user-roles/constants/user-role.enum.ts";

export const RolesMap = {
  [TabKeys.COSTS]: [UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN],
};
