import { useMutation, useQueryClient } from "@tanstack/react-query";
import QuickBooksApi from "../api/quickbooks.api";
import { QUICKBOOKS_QUERY_KEYS } from "../constants/query-keys";

export const useQuickBooksConnect = () => {
  return useMutation({
    mutationFn: async () => {
      const authUrl = await QuickBooksApi.getAuthUrl();
      // Store state in localStorage for verification after redirect
      localStorage.setItem('quickbooks_oauth_state', authUrl.state);
      // Redirect to QuickBooks authorization page
      window.location.href = authUrl.authorizationUrl;
    },
  });
};

export const useQuickBooksCallback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: QuickBooksApi.handleCallback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUICKBOOKS_QUERY_KEYS.status });
      localStorage.removeItem('quickbooks_oauth_state');
    },
  });
};

export const useQuickBooksDisconnect = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: QuickBooksApi.disconnect,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUICKBOOKS_QUERY_KEYS.status });
      queryClient.removeQueries({ queryKey: QUICKBOOKS_QUERY_KEYS.companyInfo });
      queryClient.removeQueries({ queryKey: QUICKBOOKS_QUERY_KEYS.summary });
      queryClient.removeQueries({ queryKey: QUICKBOOKS_QUERY_KEYS.customers });
      queryClient.removeQueries({ queryKey: QUICKBOOKS_QUERY_KEYS.invoices });
      queryClient.removeQueries({ queryKey: QUICKBOOKS_QUERY_KEYS.items });
    },
  });
};

