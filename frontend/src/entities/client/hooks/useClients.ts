import { PageRequestModel } from "@shared/types/page-request.model.ts";
import usePageableRequest from "@shared/hooks/usePageableRequest.ts";
import { CLIENTS_LIST_QUERY_KEY } from "@entities/client/hooks/constants.ts";
import ClientApi from "@entities/client/api/client.api.ts";

const useClients = (searchConfig: PageRequestModel) => {
  return usePageableRequest({
    fetcher: ClientApi.search,
    key: CLIENTS_LIST_QUERY_KEY,
    requestBody: searchConfig,
  });
};

export default useClients;
