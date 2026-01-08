import HallmarkLogoApi from "@entities/hallmark-logo/api/hallmark-logo.api.ts";
import { useQuery } from "@tanstack/react-query";
import { BaseItem } from "@shared/types/base-item.type.ts";

const HALLMARK_LOGO_QUERY_KEY = "HALLMARK_LOGO_QUERY_KEY";

const useHallmarkLogos = () => {
  return useQuery<BaseItem[]>({
    queryKey: [HALLMARK_LOGO_QUERY_KEY],
    queryFn: () => HallmarkLogoApi.get(),
    staleTime: 60000,
  });
};

export default useHallmarkLogos;
