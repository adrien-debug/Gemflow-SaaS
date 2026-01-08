import { MetalPurityApi } from "@entities/metal-purity/api/metal-purity.api.ts";
import { METAL_PURITIES_LIST_QUERY_KEY } from "@entities/metal-purity/constants/query-keys.ts";
import { GetMetalPuritiesDto } from "@entities/metal-purity/dto/get-metal-purities.dto.ts";
import { MetalPurity } from "@entities/metal-purity/models/metal-purity.model.ts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useMetalPurities = (getMetalPuritiesDto: GetMetalPuritiesDto) => {
  return useQuery({
    queryKey: [METAL_PURITIES_LIST_QUERY_KEY, getMetalPuritiesDto],
    queryFn: (): Promise<MetalPurity[]> => {
      if (getMetalPuritiesDto.metalId) return MetalPurityApi.getAll(getMetalPuritiesDto);
      return Promise.resolve([]);
    },
    placeholderData: keepPreviousData,
    staleTime: 60000,
  });
};

export default useMetalPurities;
