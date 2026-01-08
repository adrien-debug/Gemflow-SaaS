import { OrderPriority } from "@entities/order/constants/order-priority.enum.ts";
import { OrderStatus } from "@entities/order/constants/order-status.enum.ts";
import { CreateOrderDto } from "@entities/order/dto/create-order.dto.ts";
import { SearchOrderDto } from "@entities/order/dto/search-order.dto.ts";
import { SetOrderMetalWeightOutDto } from "@entities/order/dto/set-order-metal-weight-out.dto.ts";
import { UpdateOrderDto } from "@entities/order/dto/update-order.dto.ts";
import { OrderListItem } from "@entities/order/models/order-list-item.model.ts";
import { OrderMetalTotal } from "@entities/order/models/order-metal-total.model.ts";
import { Order } from "@entities/order/models/order.model.ts";
import api from "@shared/api";
import { Pageable } from "@shared/types/pageable.model.ts";
import { CadDetails } from "@entities/order/models/cad-details.model.ts";
import { UpdateCadDetailsDto } from "@entities/order/dto/update-cad-details.dto.ts";
import { LabourListItem } from "@entities/order/models/labour-list-item.model.ts";
import { CreateOrderLabourDto } from "@entities/order/dto/create-order-labour.dto.ts";
import { SearchOrderLabourDto } from "@entities/order/dto/search-order-labour.dto.ts";
import { LabourSummaryItem } from "@entities/order/models/labour-summary-item.model.ts";
import { UpdateOrderLabourDto } from "@entities/order/dto/update-order-labour.dto.ts";
import { CadDetailsMetadata } from "@entities/order/models/cad-details-metadata.model.ts";
import { OrderTaskStatistic } from "@entities/order/models/order-task-statistic.model.ts";
import { StockItem } from "@entities/stock/models/stock-item.model.ts";
import { OrderProfit } from "@entities/order/models/order-profit.model.ts";
import { MetalCastingMetadata } from "@entities/order/models/metal-casting-metadata.model.ts";
import { TechnicalSheetMetadata } from "@entities/order/models/technical-sheet.model.ts";
import { TechnicalSheetDto } from "@entities/order/dto/update-technical-sheet.dto.ts";

const OrdersApi = {
  copyCadDetails: async (toOrderId: number, fromOrderId: number): Promise<CadDetails> => {
    return api.put(`/api/v1/orders/${toOrderId}/cad/${fromOrderId}/copy`);
  },

  create: async (payload: CreateOrderDto): Promise<OrderListItem> => {
    return api.post<OrderListItem>("/api/v1/orders", payload);
  },

  createLabour: async (payload: CreateOrderLabourDto): Promise<LabourListItem> => {
    return api.post<LabourListItem>("/api/v1/order-labours", payload);
  },

  delete: async (orderId: number): Promise<void> => {
    return api.delete(`/api/v1/orders/${orderId}`);
  },

  deleteLabour: async (labourId: number): Promise<void> => {
    return api.delete(`/api/v1/order-labours/${labourId}`);
  },

  finish: async (orderId: number, locationId: number): Promise<StockItem> => {
    return api.post(`/api/v1/orders/${orderId}/finish`, { locationId });
  },

  getById: async (orderId: number): Promise<Order> => {
    return api.get(`/api/v1/orders/${orderId}`);
  },

  getCadDetails: async (orderId: number): Promise<CadDetails> => {
    return api.get(`/api/v1/orders/${orderId}/cad`);
  },

  getCadDetailsMetadata: async (orderId: number): Promise<CadDetailsMetadata> => {
    return api.get(`/api/v1/orders/${orderId}/cad/details`);
  },

  getLabourSummary: async (orderId: number): Promise<LabourSummaryItem> => {
    return api.get<LabourSummaryItem>(`/api/v1/orders/${orderId}/labours/summary`);
  },

  getOrderTaskStatistic: async (orderId: number): Promise<OrderTaskStatistic> => {
    return api.get(`/api/v1/orders/${orderId}/tasks/summary`);
  },

  search: async (request: SearchOrderDto): Promise<Pageable<OrderListItem>> => {
    return api.post("/api/v1/orders/search", request);
  },

  searchLabours: async (request: SearchOrderLabourDto): Promise<Pageable<LabourListItem>> => {
    return api.post<Pageable<LabourListItem>>("/api/v1/order-labours/search", request);
  },

  update: async (orderId: number, updateOrderDto: UpdateOrderDto): Promise<Order> => {
    return api.put(`/api/v1/orders/${orderId}`, updateOrderDto);
  },

  updateCadDetails: async (orderId: number, dto: UpdateCadDetailsDto): Promise<CadDetails> => {
    return api.put(`/api/v1/orders/${orderId}/cad`, dto);
  },

  updateLabour: async (labourId: number, dto: UpdateOrderLabourDto): Promise<LabourListItem> => {
    return api.put<LabourListItem>(`/api/v1/order-labours/${labourId}`, dto);
  },

  updatePriority: async (orderId: number, priority: OrderPriority): Promise<OrderPriority> => {
    return api.patch(`/api/v1/orders/${orderId}/priority`, { priority }).then(() => priority);
  },

  updateStatus: async (orderId: number, status: OrderStatus): Promise<OrderStatus> => {
    return api.patch(`/api/v1/orders/${orderId}/status`, { status }).then(() => status);
  },

  getOrderProfit: async (orderId: number): Promise<OrderProfit> => {
    return api.get(`/api/v1/order-profits/${orderId}`);
  },

  updateOrderMetalsProfit: async (orderId: number, profitPercentage: number): Promise<void> => {
    return api.patch(`/api/v1/order-profits/${orderId}/metal`, { profitPercentage });
  },

  updateOrderLabourProfit: async (orderId: number, profitPercentage: number): Promise<void> => {
    return api.patch(`/api/v1/order-profits/${orderId}/labour`, { profitPercentage });
  },

  updateOrderDiamondsProfit: async (orderId: number, profitPercentage: number): Promise<void> => {
    return api.patch(`/api/v1/order-profits/${orderId}/diamond`, { profitPercentage });
  },

  updateOrderGemsProfit: async (orderId: number, profitPercentage: number): Promise<void> => {
    return api.patch(`/api/v1/order-profits/${orderId}/gemstone`, { profitPercentage });
  },

  getMetalCastings: async (orderId: number): Promise<MetalCastingMetadata[]> => {
    return api.get(`/api/v1/orders/${orderId}/metal-castings`);
  },

  setOrderMetalWeightOut: async (orderMetalTotalId: number, dto: SetOrderMetalWeightOutDto): Promise<void[]> => {
    return api.patch(`/api/v1/order-metal-totals/${orderMetalTotalId}/weight-out`, dto);
  },

  getOrderMetalTotals: async (orderMetalTotalId: number): Promise<OrderMetalTotal[]> => {
    return api.get<OrderMetalTotal[]>(`/api/v1/orders/${orderMetalTotalId}/metal-totals`);
  },

  getTechnicalSheet: async (orderId: number): Promise<TechnicalSheetMetadata> => {
    return api.get(`/api/v1/order-technical-sheets/${orderId}`);
  },

  updateTechnicalSheet: async (
    orderTechnicalSheetId: number,
    dto: TechnicalSheetDto,
  ): Promise<TechnicalSheetMetadata> => {
    return api.put(`/api/v1/order-technical-sheets/${orderTechnicalSheetId}`, dto);
  },
};

export default OrdersApi;
