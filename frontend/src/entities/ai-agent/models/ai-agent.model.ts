export interface AiAgentQuery {
  query: string;
  context?: string;
}

export interface AgentChatRequest {
  message: string;
  conversationId?: string;
  agent?: string;
  model?: string;
}

export interface AiAgentResponse {
  response: string;
  type: "info" | "suggestion" | "alert" | "data";
  data?: Record<string, unknown>;
  suggestions?: string[];
}

export interface ExternalPrice {
  metal: string;
  unit: string;
  price: number;
  currency: string;
  timestamp: string;
  source: string;
  change24h?: number;
}

export interface ExternalOrderImport {
  externalOrderId: string;
  source: string;
  name: string;
  description?: string;
  clientId: number;
  categoryId?: number;
  collectionId?: number;
  estimatedCost?: number;
  dueDate?: string;
  metadata?: Record<string, unknown>;
}
