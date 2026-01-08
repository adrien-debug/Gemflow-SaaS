import { PageRequestModel } from "@shared/types/page-request.model.ts";
import usePageableRequest from "@shared/hooks/usePageableRequest.ts";
import SuppliersApi from "@entities/supplier/api/supplier.api";
import { SUPPLIERS_LIST_QUERY_KEY } from "@entities/supplier/hooks/constants";

const useSuppliers = (searchConfig: PageRequestModel) => {
  return usePageableRequest({
    fetcher: SuppliersApi.search,
    key: SUPPLIERS_LIST_QUERY_KEY,
    requestBody: searchConfig,
  });
};

export default useSuppliers;
