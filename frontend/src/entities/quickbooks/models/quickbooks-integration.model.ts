export type AccountingProvider = 'QUICKBOOKS' | 'XERO';
export type IntegrationStatus = 'DISCONNECTED' | 'CONNECTED' | 'TOKEN_EXPIRED' | 'ERROR';

export interface QuickBooksIntegration {
  id: number;
  provider: AccountingProvider;
  realmId: string;
  status: IntegrationStatus;
  connectedAt: string;
  lastSyncAt: string | null;
  tokenExpiresAt: string;
  tokenExpired: boolean;
}

export interface QuickBooksAuthUrl {
  authorizationUrl: string;
  state: string;
}

export interface QuickBooksCompanyInfo {
  companyName: string;
  legalName: string;
  country: string;
  email: string;
  companyAddr: string;
  fiscalYearStartMonth: string;
}

export interface QuickBooksCustomer {
  id: string;
  displayName: string;
  companyName: string | null;
  givenName: string | null;
  familyName: string | null;
  primaryEmailAddr: string | null;
  primaryPhone: string | null;
  balance: string;
  active: boolean;
}

export interface QuickBooksInvoiceLineItem {
  id: string;
  description: string | null;
  amount: number;
  qty: number | null;
  unitPrice: number | null;
  itemRef: string | null;
}

export interface QuickBooksInvoice {
  id: string;
  docNumber: string;
  txnDate: string;
  dueDate: string;
  customerRef: string;
  customerName: string;
  totalAmt: number;
  balance: number;
  currencyRef: string | null;
  status: string | null;
  lines: QuickBooksInvoiceLineItem[];
}

export interface QuickBooksItem {
  id: string;
  name: string;
  description: string | null;
  type: string;
  unitPrice: number | null;
  qtyOnHand: number | null;
  active: boolean;
  incomeAccountRef: string | null;
  expenseAccountRef: string | null;
}

export interface QuickBooksDataSummary {
  companyInfo: QuickBooksCompanyInfo | null;
  customerCount: number;
  invoiceCount: number;
  itemCount: number;
  vendorCount: number;
  accountCount: number;
}

export interface QuickBooksSyncLog {
  id: number;
  entityType: string;
  entityId: number | null;
  externalId: string | null;
  action: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  errorMessage: string | null;
  syncedAt: string;
}

