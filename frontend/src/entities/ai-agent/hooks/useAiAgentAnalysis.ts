import { useQuery } from "@tanstack/react-query";
import AiAgentApi from "../api/ai-agent.api";
import { AI_AGENT_ANALYSIS_KEY } from "../constants/query-keys";

export const useAiAgentAnalysis = () => {
  return useQuery({
    queryKey: [AI_AGENT_ANALYSIS_KEY],
    queryFn: AiAgentApi.analyzePlatform,
    staleTime: 60000, // 1 minute
  });
};
