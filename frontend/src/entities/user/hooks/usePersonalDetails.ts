import { PERSONAL_DETAILS_QUERY_KEY } from "@entities/user/constants/user-query-keys.ts";
import { useQuery } from "@tanstack/react-query";
import UserApi from "@entities/user/api/user.api.ts";

const usePersonalDetails = () => {
  return useQuery({
    queryKey: [PERSONAL_DETAILS_QUERY_KEY],
    queryFn: UserApi.getCurrent,
    staleTime: 6000,
  });
};

export default usePersonalDetails;
