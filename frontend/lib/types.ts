// ─── Generic search wrappers ──────────────────────────────────────────────────

export interface Sort {
  property: string;
  direction: "ASC" | "DESC";
}

export interface SearchRequest<C> {
  page: number;
  size: number;
  sorts?: Sort[];
  searchCriteria: C;
}

export interface SearchResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

// ─── Enums ────────────────────────────────────────────────────────────────────

export type Priority = "LOW" | "NORM" | "HIGH" | "TOP";

export type OrderStatus =
  | "IN_CAD"
  | "PROTOTYPING"
  | "AT_THE_CASTING"
  | "RECEIVED_FROM_CASTING"
  | "IN_MOUNTING"
  | "IN_MOUNTING_BOX"
  | "MOUNTING_COMPLETED"
  | "QC_MOUNTING"
  | "IN_SETTING_BOX"
  | "PREPPED_FOR_SETTING"
  | "IN_SETTING"
  | "SETTING_COMPLETED"
  | "POLISHED"
  | "QUALITY_CONTROL"
  | "QC_PASSED"
  | "READY_FOR_INVOICE"
  | "INVOICED"
  | "READY_FOR_ASSAY"
  | "OUT_FOR_ASSAY"
  | "ASSAY_COMPLETED"
  | "FINISHED"
  | "MASTER_PIECE_BOX"
  | "REJECTED"
  | "IN_POLISHING"
  | "SAND_BLASTING"
  | "READY_TO_CASTING"
  | "SENT_TO_ENAMEL"
  | "RECYCLED";

export type OrderStockStatus = "AVAILABLE" | "SOLD" | "MEMO_OUT";

export type ImageSizeType = "ORIGINAL" | "COMPRESSED" | "SMALL";

export type FileSource = "S3" | "LOCAL";

export type LabourTaskType = "CAD" | "MOUNTING" | "SETTING" | "POLISHING";

export type PermissionCategory = "CLIENTS" | "ORDERS" | "INVENTORY" | "SETTINGS" | "REPORTS" | "FILES";

// ─── Shared sub-entities ──────────────────────────────────────────────────────

export interface AtelierFile {
  id: number;
  fileName: string;
  contentType: string;
  source: FileSource;
}

export interface AtelierDownloadFile extends AtelierFile {
  downloadUrl: string;
  downloadUrlNoCache: string;
}

export interface Image {
  sizeType: ImageSizeType;
  file: AtelierDownloadFile;
}

export interface ClientShort {
  id: number;
  name: string;
  email?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  vatNumber?: string;
}

export interface Segment {
  id: number;
  name: string;
}

export interface ItemCategory {
  id: number;
  name: string;
  immutable?: boolean;
}

export interface Collection {
  id: number;
  name: string;
}

export interface Location {
  id: number;
  name: string;
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export interface OrderStock {
  id: number;
  status: OrderStockStatus;
  saleDate?: string;
  returnDate?: string;
  issueDate?: string;
  issueClient?: ClientShort;
  totalCost?: number;
  location?: Location;
  createdAt: string;
  labourTotalCost?: number;
  labourTotalMinutes?: number;
  gemstonesTotalCost?: number;
  gemstonesTotalWeight?: number;
  gemstonesTotalWeightGrams?: number;
  diamondsTotalQuantity?: number;
  diamondsTotalCost?: number;
  diamondsTotalMarkupCost?: number;
  diamondsTotalWeight?: number;
  diamondsTotalWeightGrams?: number;
  metalsTotalCost?: number;
  metalsTotalWeightIn?: number;
  metalsTotalWeightOut?: number;
}

export interface OrderListItem {
  id: number;
  name: string;
  priority: Priority;
  dueDate: string;
  status: OrderStatus;
  createdAt: string;
  client?: ClientShort;
  segment?: Segment;
  itemCategory?: ItemCategory;
  collection?: Collection;
  productImages: Image[];
  stock?: OrderStock;
}

export interface OrderSearchCriteria {
  searchInput?: string;
  statuses?: OrderStatus[];
}

// ─── Labour trackers ─────────────────────────────────────────────────────────

export interface LabourTracker {
  taskType: LabourTaskType;
  orderId: number;
  totalSeconds: number;
}

// ─── CRM ─────────────────────────────────────────────────────────────────────

export interface CrmContact {
  id: number;
  clientId: number;
  clientName?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  phone?: string;
  company?: string;
  notes?: string;
  tags?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CrmContactSearchCriteria {
  search?: string;
  clientId?: number;
}

// ─── Users / Roles / Permissions ────────────────────────────────────────────

export interface Permission {
  id: number;
  code: string;
  name: string;
  description?: string;
  category: PermissionCategory;
}

export interface Role {
  id: number;
  code: string;
  name: string;
}

export interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  role: Role;
  isActive: boolean;
  photos: Image[];
}

export interface UserSearchCriteria {
  searchInput?: string;
  isActive?: boolean;
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export interface StatusCount {
  status: string;
  statusLabel: string;
  count: number;
}

export interface PriorityCount {
  priority: string;
  count: number;
}

export interface OrderAlert {
  orderId: number;
  orderName: string;
  alertType: "OVERDUE" | "AT_RISK" | "HIGH_PRIORITY";
  message: string;
  daysOverdue: number;
}

export interface DashboardStats {
  totalOrders: number;
  ordersInProgress: number;
  ordersFinished: number;
  ordersInvoiced: number;
  ordersOverdue: number;
  averageDelayDays: number;
  ordersByStatus: StatusCount[];
  ordersByPriority: PriorityCount[];
  alerts: OrderAlert[];
}
