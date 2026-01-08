import { useMutation } from "@tanstack/react-query";
import OrdersApi from "@entities/order/api/orders.api.ts";

const useCadDetailsMetadata = () =>
  useMutation({
    mutationFn: (orderId: number) => OrdersApi.getCadDetailsMetadata(orderId),
  });

export default useCadDetailsMetadata;
