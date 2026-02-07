package io.hearstcorporation.atelier.controller.aiagent;

import io.hearstcorporation.atelier.dto.request.AiAgentQueryDto;
import io.hearstcorporation.atelier.dto.request.ExternalOrderImportDto;
import io.hearstcorporation.atelier.dto.response.AiAgentResponseDto;
import io.hearstcorporation.atelier.dto.response.ExternalPriceDto;
import io.hearstcorporation.atelier.service.aiagent.AiAgentService;
import io.hearstcorporation.atelier.service.aiagent.ExternalPriceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static io.hearstcorporation.atelier.controller.aiagent.AiAgentController.BASE_URL;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class AiAgentController {

    public static final String BASE_URL = "/api/v1/ai-agent";

    private final AiAgentService aiAgentService;
    private final ExternalPriceService externalPriceService;

    /**
     * Process a user query
     */
    @PostMapping("/query")
    public AiAgentResponseDto processQuery(@RequestBody @Valid AiAgentQueryDto queryDto) {
        log.info("AI Agent query received: {}", queryDto.getQuery());
        return aiAgentService.processQuery(queryDto);
    }

    /**
     * Get platform analysis
     */
    @GetMapping("/analyze")
    public AiAgentResponseDto analyzePlatform() {
        log.info("AI Agent analyzing platform");
        return aiAgentService.analyzePlatform();
    }

    /**
     * Get price recommendations
     */
    @GetMapping("/prices/recommendations")
    public AiAgentResponseDto getPriceRecommendations() {
        log.info("AI Agent getting price recommendations");
        return aiAgentService.getPriceRecommendations();
    }

    /**
     * Get current metal prices
     */
    @GetMapping("/prices/metals")
    public List<ExternalPriceDto> getMetalPrices() {
        log.info("AI Agent fetching metal prices");
        return externalPriceService.fetchAllMetalPrices();
    }

    /**
     * Get price for specific metal
     */
    @GetMapping("/prices/metals/{metal}")
    public ExternalPriceDto getMetalPrice(@PathVariable String metal) {
        log.info("AI Agent fetching price for metal: {}", metal);
        return externalPriceService.fetchMetalPrice(metal);
    }

    /**
     * Import external order
     */
    @PostMapping("/import/order")
    public AiAgentResponseDto importExternalOrder(@RequestBody @Valid ExternalOrderImportDto importDto) {
        log.info("AI Agent importing external order from: {}", importDto.getSource());
        return aiAgentService.importExternalOrder(importDto);
    }
}
