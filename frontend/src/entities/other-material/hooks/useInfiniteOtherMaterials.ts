import { OTHER_MATERIALS_QUERY_KEY } from "@entities/other-material/constants/query-keys.ts";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import OtherMaterialsApi from "@entities/other-material/api/other-materials.api.ts";

const PAGE_SIZE = 100;

const useInfiniteOtherMaterials = () =>
  useInfiniteQuery({
    queryKey: [OTHER_MATERIALS_QUERY_KEY],
    queryFn: async ({ pageParam = 1 }) =>
      OtherMaterialsApi.search({
        page: pageParam,
        size: PAGE_SIZE,
        searchCriteria: {},
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined),
    placeholderData: keepPreviousData,
  });

export default useInfiniteOtherMaterials;
