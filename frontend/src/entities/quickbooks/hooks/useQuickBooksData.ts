import { useQuery } from "@tanstack/react-query";
import QuickBooksApi from "../api/quickbooks.api";
import { QUICKBOOKS_QUERY_KEYS } from "../constants/query-keys";

export const useQuickBooksCompanyInfo = (enabled: boolean = true) => {
  return useQuery({
    queryKey: QUICKBOOKS_QUERY_KEYS.companyInfo,
    queryFn: QuickBooksApi.getCompanyInfo,
    enabled,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useQuickBooksDataSummary = (enabled: boolean = true) => {
  return useQuery({
    queryKey: QUICKBOOKS_QUERY_KEYS.summary,
    queryFn: QuickBooksApi.getDataSummary,
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useQuickBooksCustomers = (
  startPosition?: number,
  maxResults?: number,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: [...QUICKBOOKS_QUERY_KEYS.customers, startPosition, maxResults],
    queryFn: () => QuickBooksApi.getCustomers(startPosition, maxResults),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
};

export const useQuickBooksInvoices = (
  startPosition?: number,
  maxResults?: number,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: [...QUICKBOOKS_QUERY_KEYS.invoices, startPosition, maxResults],
    queryFn: () => QuickBooksApi.getInvoices(startPosition, maxResults),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
};

export const useQuickBooksItems = (
  startPosition?: number,
  maxResults?: number,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: [...QUICKBOOKS_QUERY_KEYS.items, startPosition, maxResults],
    queryFn: () => QuickBooksApi.getItems(startPosition, maxResults),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
};

