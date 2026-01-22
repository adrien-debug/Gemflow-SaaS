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
