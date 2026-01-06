import CylindersService from "@entities/cylinder/api/cylinders.service.ts";
import { Cylinder } from "@entities/cylinder/model/cylinder.model.ts";
import { useQuery } from "@tanstack/react-query";
import { CYLINDERS_QUERY_KEY } from "@entities/cylinder/constants/query-keys.ts";

const useCylinders = () =>
  useQuery<Cylinder[]>({
    queryKey: [CYLINDERS_QUERY_KEY],
    queryFn: CylindersService.get,
    staleTime: 60000,
  });

export default useCylinders;
