import { useMutation, useQueryClient } from "@tanstack/react-query";
import OrdersApi from "@entities/order/api/orders.api.ts";
import { ORDER_TECHNICAL_SHEET_QUERY_KEY } from "@entities/order/constants/query-keys.ts";
import { TechnicalSheetDto } from "@entities/order/dto/update-technical-sheet.dto.ts";

const useUpdateTechnicalSheet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      orderTechnicalSheetId,
      dto,
    }: {
      orderTechnicalSheetId: number;
      orderId: number;
      dto: TechnicalSheetDto;
    }) => OrdersApi.updateTechnicalSheet(orderTechnicalSheetId, dto),

    onSuccess: (_, { orderId }) => {
      void queryClient.invalidateQueries({ queryKey: [ORDER_TECHNICAL_SHEET_QUERY_KEY, orderId] });
    },
  });
};

export default useUpdateTechnicalSheet;
