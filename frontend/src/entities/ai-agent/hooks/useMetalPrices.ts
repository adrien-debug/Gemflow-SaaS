import { useQuery } from "@tanstack/react-query";
import AiAgentApi from "../api/ai-agent.api";
import { AI_AGENT_PRICES_KEY } from "../constants/query-keys";
import { isDevMode } from "@shared/config/dev-mode.config";
import type { ExternalPrice } from "../models/ai-agent.model";

const mockMetalPrices: ExternalPrice[] = [
  {
    metal: "GOLD",
    unit: "oz",
    price: 2847.35,
    currency: "USD",
    timestamp: new Date().toISOString(),
    source: "mock",
    change24h: 1.24,
  },
  {
    metal: "SILVER",
    unit: "oz",
    price: 31.82,
    currency: "USD",
    timestamp: new Date().toISOString(),
    source: "mock",
    change24h: -0.58,
  },
  {
    metal: "PLATINUM",
    unit: "oz",
    price: 1023.40,
    currency: "USD",
    timestamp: new Date().toISOString(),
    source: "mock",
    change24h: 0.87,
  },
  {
    metal: "PALLADIUM",
    unit: "oz",
    price: 978.15,
    currency: "USD",
    timestamp: new Date().toISOString(),
    source: "mock",
    change24h: -1.12,
  },
];

export const useMetalPrices = () => {
  return useQuery({
    queryKey: [AI_AGENT_PRICES_KEY],
    queryFn: isDevMode
      ? () => Promise.resolve(mockMetalPrices)
      : AiAgentApi.getMetalPrices,
    staleTime: isDevMode ? Infinity : 3600000,
    refetchInterval: isDevMode ? false : 3600000,
  });
};
