import { useQuery } from "@tanstack/react-query";
import AiAgentApi from "../api/ai-agent.api";
import { AI_AGENT_PRICE_RECOMMENDATIONS_KEY } from "../constants/query-keys";

export const usePriceRecommendations = () => {
  return useQuery({
    queryKey: [AI_AGENT_PRICE_RECOMMENDATIONS_KEY],
    queryFn: AiAgentApi.getPriceRecommendations,
    staleTime: 3600000, // 1 hour
  });
};
