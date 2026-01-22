import { useQuery } from "@tanstack/react-query";
import AiAgentApi from "../api/ai-agent.api";
import { AI_AGENT_PRICES_KEY } from "../constants/query-keys";

export const useMetalPrices = () => {
  return useQuery({
    queryKey: [AI_AGENT_PRICES_KEY],
    queryFn: AiAgentApi.getMetalPrices,
    staleTime: 3600000, // 1 hour
    refetchInterval: 3600000, // Refetch every hour
  });
};
