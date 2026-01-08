import { useMutation, useQueryClient } from "@tanstack/react-query";
import SuppliersApi from "@entities/supplier/api/supplier.api";
import { SUPPLIERS_LIST_QUERY_KEY } from "@entities/supplier/hooks/constants";
import { SupplierDto } from "@entities/supplier/dto/supplier.dto";

const useUpdatSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: SupplierDto }) => SuppliersApi.update(id, dto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [SUPPLIERS_LIST_QUERY_KEY] });
    },
  });
};

export default useUpdatSupplier;
