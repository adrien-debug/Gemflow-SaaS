import { PageRequestModel } from "@shared/types/page-request.model.ts";
import { OrderStatus } from "@entities/order/constants/order-status.enum.ts";

export interface SearchOrderDto extends PageRequestModel {
  searchCriteria: {
    statuses?: OrderStatus[];
    searchInput?: string;
  };
}
