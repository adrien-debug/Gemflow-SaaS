package io.hearstcorporation.atelier.service.aiagent;

import io.hearstcorporation.atelier.dto.request.AiAgentQueryDto;
import io.hearstcorporation.atelier.dto.request.ExternalOrderImportDto;
import io.hearstcorporation.atelier.dto.response.AiAgentResponseDto;

public interface AiAgentService {
    /**
     * Process a user query and return an AI-generated response
     */
    AiAgentResponseDto processQuery(AiAgentQueryDto queryDto);

    /**
     * Import an external order
     */
    AiAgentResponseDto importExternalOrder(ExternalOrderImportDto importDto);

    /**
     * Analyze platform data and provide insights
     */
    AiAgentResponseDto analyzePlatform();

    /**
     * Get price recommendations based on external market data
     */
    AiAgentResponseDto getPriceRecommendations();
}
