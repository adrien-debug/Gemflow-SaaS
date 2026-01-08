import api from "@shared/api";
import {
  QuickBooksIntegration,
  QuickBooksAuthUrl,
  QuickBooksCompanyInfo,
  QuickBooksCustomer,
  QuickBooksInvoice,
  QuickBooksItem,
  QuickBooksDataSummary,
  QuickBooksSyncLog,
} from "../models/quickbooks-integration.model";
import { QuickBooksCallbackDto } from "../dto/quickbooks-callback.dto";
import { Pageable } from "@shared/types/pageable.model";

const BASE_URL = "/api/v1/integrations/quickbooks";

const QuickBooksApi = {
  // Authentication
  getAuthUrl: async (): Promise<QuickBooksAuthUrl> => {
    return api.get(`${BASE_URL}/connect`);
  },

  handleCallback: async (callback: QuickBooksCallbackDto): Promise<QuickBooksIntegration> => {
    return api.post(`${BASE_URL}/callback`, callback);
  },

  getStatus: async (): Promise<QuickBooksIntegration | null> => {
    try {
      return await api.get(`${BASE_URL}/status`);
    } catch {
      return null;
    }
  },

  disconnect: async (): Promise<void> => {
    return api.delete(BASE_URL);
  },

  testConnection: async (): Promise<boolean> => {
    return api.get(`${BASE_URL}/test`);
  },

  // Data retrieval
  getCompanyInfo: async (): Promise<QuickBooksCompanyInfo> => {
    return api.get(`${BASE_URL}/company`);
  },

  getDataSummary: async (): Promise<QuickBooksDataSummary> => {
    return api.get(`${BASE_URL}/summary`);
  },

  getCustomers: async (startPosition?: number, maxResults?: number): Promise<QuickBooksCustomer[]> => {
    const params = new URLSearchParams();
    if (startPosition !== undefined) params.append('startPosition', startPosition.toString());
    if (maxResults !== undefined) params.append('maxResults', maxResults.toString());
    const query = params.toString() ? `?${params.toString()}` : '';
    return api.get(`${BASE_URL}/customers${query}`);
  },

  getInvoices: async (startPosition?: number, maxResults?: number): Promise<QuickBooksInvoice[]> => {
    const params = new URLSearchParams();
    if (startPosition !== undefined) params.append('startPosition', startPosition.toString());
    if (maxResults !== undefined) params.append('maxResults', maxResults.toString());
    const query = params.toString() ? `?${params.toString()}` : '';
    return api.get(`${BASE_URL}/invoices${query}`);
  },

  getItems: async (startPosition?: number, maxResults?: number): Promise<QuickBooksItem[]> => {
    const params = new URLSearchParams();
    if (startPosition !== undefined) params.append('startPosition', startPosition.toString());
    if (maxResults !== undefined) params.append('maxResults', maxResults.toString());
    const query = params.toString() ? `?${params.toString()}` : '';
    return api.get(`${BASE_URL}/items${query}`);
  },

  // Sync logs
  getSyncLogs: async (integrationId: number, page: number, size: number): Promise<Pageable<QuickBooksSyncLog>> => {
    return api.get(`${BASE_URL}/sync-logs?integrationId=${integrationId}&page=${page}&size=${size}`);
  },
};

export default QuickBooksApi;

