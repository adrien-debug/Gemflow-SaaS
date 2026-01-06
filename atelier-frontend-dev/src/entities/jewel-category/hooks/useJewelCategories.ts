import JewelCategoryApi from "@entities/jewel-category/api/jewel-category.api.ts";
import { useQuery } from "@tanstack/react-query";
import { BaseItem } from "@shared/types/base-item.type.ts";
import { JEWEL_CATEGORY_QUERY_KEY } from "@entities/jewel-category/constants/query-keys.ts";

const useJewelCategories = () => {
  return useQuery<BaseItem[]>({
    queryKey: [JEWEL_CATEGORY_QUERY_KEY],
    queryFn: () => JewelCategoryApi.get(),
    staleTime: 60000,
  });
};

export default useJewelCategories;
