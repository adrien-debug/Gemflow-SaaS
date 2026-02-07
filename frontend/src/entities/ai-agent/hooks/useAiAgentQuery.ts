import { useMutation } from "@tanstack/react-query";
import AiAgentApi from "../api/ai-agent.api";
import type { AiAgentQuery } from "../models/ai-agent.model";

export const useAiAgentQuery = () => {
  return useMutation({
    mutationFn: (query: AiAgentQuery) => AiAgentApi.processQuery(query),
  });
};
