import { useMutation } from "@tanstack/react-query";
import AiAgentApi from "../api/ai-agent.api";
import type { ExternalOrderImport } from "../models/ai-agent.model";

export const useImportExternalOrder = () => {
  return useMutation({
    mutationFn: (importData: ExternalOrderImport) => AiAgentApi.importExternalOrder(importData),
  });
};
