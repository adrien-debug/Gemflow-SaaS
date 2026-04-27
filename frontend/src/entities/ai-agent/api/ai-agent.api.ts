import api from "@shared/api";
import type { AgentChatResponse } from "@features/agents/artifacts";
import type {
  AgentChatRequest,
  AiAgentQuery,
  AiAgentResponse,
  ExternalOrderImport,
  ExternalPrice,
} from "../models/ai-agent.model";

const AiAgentApi = {
  processQuery: async (query: AiAgentQuery): Promise<AiAgentResponse> => {
    return api.post<AiAgentResponse>("/api/v1/ai-agent/query", query);
  },

  chatV2: async (request: AgentChatRequest): Promise<AgentChatResponse> => {
    return api.post<AgentChatResponse>("/api/v2/agents/chat", request);
  },

  analyzePlatform: async (): Promise<AiAgentResponse> => {
    return api.get<AiAgentResponse>("/api/v1/ai-agent/analyze");
  },

  getPriceRecommendations: async (): Promise<AiAgentResponse> => {
    return api.get<AiAgentResponse>("/api/v1/ai-agent/prices/recommendations");
  },

  getMetalPrices: async (): Promise<ExternalPrice[]> => {
    return api.get<ExternalPrice[]>("/api/v1/ai-agent/prices/metals");
  },

  getMetalPrice: async (metal: string): Promise<ExternalPrice> => {
    return api.get<ExternalPrice>(`/api/v1/ai-agent/prices/metals/${metal}`);
  },

  importExternalOrder: async (importData: ExternalOrderImport): Promise<AiAgentResponse> => {
    return api.post<AiAgentResponse>("/api/v1/ai-agent/import/order", importData);
  },
};

export default AiAgentApi;
