import { keepPreviousData, useQuery } from "@tanstack/react-query";
import UserRolesApi from "@entities/user-roles/api/user-roles.api";
import { USER_ROLES_QUERY_KEY } from "@entities/user-roles/hooks/constants";

const useUserRoles = () => {
  return useQuery({
    queryKey: [USER_ROLES_QUERY_KEY],
    queryFn: UserRolesApi.getRoles,
    placeholderData: keepPreviousData,
    staleTime: 120000,
  });
};

export default useUserRoles;
