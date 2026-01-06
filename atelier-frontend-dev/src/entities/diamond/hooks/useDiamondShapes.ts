import { useQuery } from "@tanstack/react-query";
import DiamondShapesApi from "@entities/diamond/api/diamond-shapes.api.ts";
import { DIAMOND_SHAPES_QUERY_KEY } from "@entities/diamond/constants/diamond-query-keys.ts";

const useDiamondShapes = () => {
  return useQuery({
    queryFn: DiamondShapesApi.getDiamondShapes,
    queryKey: [DIAMOND_SHAPES_QUERY_KEY],
  });
};

export default useDiamondShapes;
