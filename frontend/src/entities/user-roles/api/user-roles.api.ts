import api from "@shared/api";
import { UserRole } from "@entities/user-roles/models/user-role.model";

const UserRolesApi = {
  getRoles: async (): Promise<UserRole[]> => {
    return api.get("/api/v1/roles");
  },
};

export default UserRolesApi;
