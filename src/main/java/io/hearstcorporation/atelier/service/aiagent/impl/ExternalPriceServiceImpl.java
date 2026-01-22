package io.hearstcorporation.atelier.service.aiagent.impl;

import io.hearstcorporation.atelier.dto.response.ExternalPriceDto;
import io.hearstcorporation.atelier.service.aiagent.ExternalPriceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExternalPriceServiceImpl implements ExternalPriceService {

    private final RestTemplate restTemplate;

    // Using metals-api.com free tier (requires API key in production)
    // For now, using mock data for demo
    private static final String API_BASE_URL = "https://api.metals.live/v1/spot";

    @Override
    @Cacheable(value = "metalPrices", unless = "#result == null")
    public List<ExternalPriceDto> fetchAllMetalPrices() {
        log.info("Fetching all metal prices from external API");
        
        List<ExternalPriceDto> prices = new ArrayList<>();
        
        try {
            // Try to fetch from real API (metals.live is free, no key needed)
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                API_BASE_URL,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            
            if (response.getBody() != null) {
                prices.addAll(parseMetalsLiveResponse(response.getBody()));
            }
        } catch (Exception e) {
            log.warn("Failed to fetch real prices, using mock data: {}", e.getMessage());
            prices.addAll(getMockPrices());
        }
        
        return prices;
    }

    @Override
    public ExternalPriceDto fetchMetalPrice(String metal) {
        log.info("Fetching price for metal: {}", metal);
        
        List<ExternalPriceDto> allPrices = fetchAllMetalPrices();
        return allPrices.stream()
                .filter(p -> p.getMetal().equalsIgnoreCase(metal))
                .findFirst()
                .orElse(null);
    }

    @Override
    public List<ExternalPriceDto> getCachedPrices() {
        // This will return cached prices if available
        return fetchAllMetalPrices();
    }

    @SuppressWarnings("unchecked")
    private List<ExternalPriceDto> parseMetalsLiveResponse(Map<String, Object> response) {
        List<ExternalPriceDto> prices = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();
        
        try {
            // Parse gold
            if (response.containsKey("gold")) {
                BigDecimal goldPrice = new BigDecimal(response.get("gold").toString());
                prices.add(ExternalPriceDto.builder()
                        .metal("GOLD")
                        .unit("ounce")
                        .price(goldPrice)
                        .currency("USD")
                        .timestamp(now)
                        .source("metals.live")
                        .change24h(BigDecimal.ZERO)
                        .build());
            }
            
            // Parse silver
            if (response.containsKey("silver")) {
                BigDecimal silverPrice = new BigDecimal(response.get("silver").toString());
                prices.add(ExternalPriceDto.builder()
                        .metal("SILVER")
                        .unit("ounce")
                        .price(silverPrice)
                        .currency("USD")
                        .timestamp(now)
                        .source("metals.live")
                        .change24h(BigDecimal.ZERO)
                        .build());
            }
            
            // Parse platinum
            if (response.containsKey("platinum")) {
                BigDecimal platinumPrice = new BigDecimal(response.get("platinum").toString());
                prices.add(ExternalPriceDto.builder()
                        .metal("PLATINUM")
                        .unit("ounce")
                        .price(platinumPrice)
                        .currency("USD")
                        .timestamp(now)
                        .source("metals.live")
                        .change24h(BigDecimal.ZERO)
                        .build());
            }
            
            // Parse palladium
            if (response.containsKey("palladium")) {
                BigDecimal palladiumPrice = new BigDecimal(response.get("palladium").toString());
                prices.add(ExternalPriceDto.builder()
                        .metal("PALLADIUM")
                        .unit("ounce")
                        .price(palladiumPrice)
                        .currency("USD")
                        .timestamp(now)
                        .source("metals.live")
                        .change24h(BigDecimal.ZERO)
                        .build());
            }
        } catch (Exception e) {
            log.error("Error parsing metals.live response: {}", e.getMessage());
        }
        
        return prices.isEmpty() ? getMockPrices() : prices;
    }

    private List<ExternalPriceDto> getMockPrices() {
        LocalDateTime now = LocalDateTime.now();
        
        return List.of(
            ExternalPriceDto.builder()
                    .metal("GOLD")
                    .unit("ounce")
                    .price(new BigDecimal("2034.50"))
                    .currency("USD")
                    .timestamp(now)
                    .source("mock")
                    .change24h(new BigDecimal("1.2"))
                    .build(),
            ExternalPriceDto.builder()
                    .metal("SILVER")
                    .unit("ounce")
                    .price(new BigDecimal("23.45"))
                    .currency("USD")
                    .timestamp(now)
                    .source("mock")
                    .change24h(new BigDecimal("-0.5"))
                    .build(),
            ExternalPriceDto.builder()
                    .metal("PLATINUM")
                    .unit("ounce")
                    .price(new BigDecimal("945.30"))
                    .currency("USD")
                    .timestamp(now)
                    .source("mock")
                    .change24h(new BigDecimal("0.8"))
                    .build(),
            ExternalPriceDto.builder()
                    .metal("PALLADIUM")
                    .unit("ounce")
                    .price(new BigDecimal("1024.75"))
                    .currency("USD")
                    .timestamp(now)
                    .source("mock")
                    .change24h(new BigDecimal("-1.3"))
                    .build()
        );
    }
}
