import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SupplierDto } from "@entities/supplier/dto/supplier.dto";
import SuppliersApi from "@entities/supplier/api/supplier.api";
import { SUPPLIERS_LIST_QUERY_KEY } from "@entities/supplier/hooks/constants";

const useCreateSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: SupplierDto) => SuppliersApi.create(dto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [SUPPLIERS_LIST_QUERY_KEY] });
    },
  });
};

export default useCreateSupplier;
