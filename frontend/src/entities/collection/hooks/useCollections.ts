import CollectionApi from "@entities/collection/api/collection.api.ts";
import { useQuery } from "@tanstack/react-query";
import { BaseItem } from "@shared/types/base-item.type.ts";
import { COLLECTIONS_QUERY_KEY } from "@entities/collection/api/constants/query-keys.ts";

const useSegments = () => {
  return useQuery<BaseItem[]>({
    queryKey: [COLLECTIONS_QUERY_KEY],
    queryFn: CollectionApi.get,
    staleTime: 60000,
  });
};

export default useSegments;
