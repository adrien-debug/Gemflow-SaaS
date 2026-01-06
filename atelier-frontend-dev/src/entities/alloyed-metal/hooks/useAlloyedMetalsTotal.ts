import { ALLOYED_METALS_TOTAL_QUERY_KEY } from "@entities/alloyed-metal/constants/query-keys.ts";
import { SearchAlloyedMetalsDto } from "@entities/alloyed-metal/dto/search-alloyed-metals.dto.ts";
import { AlloyedMetalsApi } from "@entities/alloyed-metal/api/alloyed-metals.api.ts";
import { useQuery } from "@tanstack/react-query";

const useAlloyedMetalTotal = (searchParams: SearchAlloyedMetalsDto) => {
  return useQuery({
    queryFn: () => AlloyedMetalsApi.total(searchParams),
    queryKey: [ALLOYED_METALS_TOTAL_QUERY_KEY],
  });
};

export default useAlloyedMetalTotal;
