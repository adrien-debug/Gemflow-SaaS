import { useMutation } from "@tanstack/react-query";
import AiAgentApi from "../api/ai-agent.api";
import type { AgentChatRequest } from "../models/ai-agent.model";

export const useAgentChatV2 = () => {
  return useMutation({
    mutationFn: (request: AgentChatRequest) => AiAgentApi.chatV2(request),
  });
};
