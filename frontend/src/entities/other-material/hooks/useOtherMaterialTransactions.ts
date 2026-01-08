import { OTHER_MATERIAL_TRANSACTIONS_QUERY_KEY } from "@entities/other-material/constants/query-keys.ts";
import { SearchOtherMaterialTransactionsDto } from "@entities/other-material/dto/search-other-material-transactions.dto.ts";
import usePageableRequest from "@shared/hooks/usePageableRequest.ts";
import OtherMaterialTransactionsApi from "@entities/other-material/api/other-material-transactions.api.ts";

const useOtherMaterialTransactions = (searchParams: SearchOtherMaterialTransactionsDto) => {
  return usePageableRequest({
    fetcher: OtherMaterialTransactionsApi.search,
    key: OTHER_MATERIAL_TRANSACTIONS_QUERY_KEY,
    requestBody: searchParams,
  });
};

export default useOtherMaterialTransactions;
