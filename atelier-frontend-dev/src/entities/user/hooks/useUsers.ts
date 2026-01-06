import { PageRequestModel } from "@shared/types/page-request.model.ts";
import usePageableRequest from "@shared/hooks/usePageableRequest.ts";
import UserApi from "@entities/user/api/user.api.ts";
import { USER_LIST_QUERY_KEY } from "@entities/user/constants/user-query-keys.ts";

const useUsers = (searchConfig: PageRequestModel) => {
  return usePageableRequest({
    fetcher: UserApi.search,
    key: USER_LIST_QUERY_KEY,
    requestBody: searchConfig,
  });
};

export default useUsers;
