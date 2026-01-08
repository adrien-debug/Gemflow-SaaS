import SegmentApi from "@entities/segment/api/segment.api.ts";
import { useQuery } from "@tanstack/react-query";
import { BaseItem } from "@shared/types/base-item.type.ts";
import { SEGMENTS_KEY } from "@entities/segment/hooks/query-keys.ts";

const useSegments = () => {
  return useQuery<BaseItem[]>({
    queryKey: [SEGMENTS_KEY],
    queryFn: SegmentApi.get,
    staleTime: 60000,
  });
};

export default useSegments;
