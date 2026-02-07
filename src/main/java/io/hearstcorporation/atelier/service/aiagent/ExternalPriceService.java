package io.hearstcorporation.atelier.service.aiagent;

import io.hearstcorporation.atelier.dto.response.ExternalPriceDto;

import java.util.List;

public interface ExternalPriceService {
    /**
     * Fetch current prices for all supported metals
     */
    List<ExternalPriceDto> fetchAllMetalPrices();

    /**
     * Fetch price for a specific metal
     */
    ExternalPriceDto fetchMetalPrice(String metal);

    /**
     * Get cached prices (if available)
     */
    List<ExternalPriceDto> getCachedPrices();
}
