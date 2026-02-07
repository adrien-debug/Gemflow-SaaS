import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BatchUpdateDto } from "@shared/types/batch-update.dto.ts";
import { Cylinder } from "@entities/cylinder/model/cylinder.model.ts";
import CylindersService from "@entities/cylinder/api/cylinders.service.ts";
import { CYLINDERS_QUERY_KEY } from "@entities/cylinder/constants/query-keys.ts";

const useUpdateCylinders = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cylinders: BatchUpdateDto<Cylinder>) => CylindersService.updateCylinders(cylinders),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [CYLINDERS_QUERY_KEY] });
    },
  });
};

export default useUpdateCylinders;
