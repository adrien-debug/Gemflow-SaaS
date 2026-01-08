import { useQuery } from "@tanstack/react-query";
import QuickBooksApi from "../api/quickbooks.api";
import { QUICKBOOKS_QUERY_KEYS } from "../constants/query-keys";

export const useQuickBooksStatus = () => {
  return useQuery({
    queryKey: QUICKBOOKS_QUERY_KEYS.status,
    queryFn: QuickBooksApi.getStatus,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

