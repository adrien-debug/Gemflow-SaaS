import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pageable } from "@shared/types/pageable.model.ts";
import SuppliersApi from "@entities/supplier/api/supplier.api";
import { SUPPLIERS_LIST_QUERY_KEY } from "@entities/supplier/hooks/constants";
import { Supplier } from "@entities/supplier/model/supplier.model";

const useDeleteSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (supplierId: number) => SuppliersApi.delete(supplierId),
    onMutate: async (supplierId: number) => {
      await queryClient.cancelQueries({ queryKey: [SUPPLIERS_LIST_QUERY_KEY] });

      const snapshots = queryClient.getQueriesData({ queryKey: [SUPPLIERS_LIST_QUERY_KEY] });

      snapshots.forEach(([queryKey, snapshot]) => {
        if (snapshot) {
          queryClient.setQueryData(queryKey, (old: Pageable<Supplier>) => ({
            ...old,
            content: old?.content?.filter((supplier: Supplier) => supplier.id !== supplierId),
          }));
        }
      });
      return { snapshots };
    },

    onError: (_, __, context) => {
      context?.snapshots.forEach(([queryKey, snapshot]) => {
        queryClient.setQueryData(queryKey, snapshot);
      });
    },

    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: [SUPPLIERS_LIST_QUERY_KEY] });
    },
  });
};

export default useDeleteSupplier;
