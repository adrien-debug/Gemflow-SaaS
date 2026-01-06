package io.hearstcorporation.atelier.service.inventory.gemstone;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.gemstone.GemstoneDto;
import io.hearstcorporation.atelier.dto.model.inventory.gemstone.GemstonePaymentStatusDto;
import io.hearstcorporation.atelier.dto.model.inventory.gemstone.GemstoneRequestDto;
import io.hearstcorporation.atelier.dto.model.inventory.gemstone.GemstoneSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.inventory.gemstone.GemstoneStatusDto;
import io.hearstcorporation.atelier.dto.model.inventory.InventoryTotalDto;
import io.hearstcorporation.atelier.model.inventory.gemstone.Gemstone;
import io.hearstcorporation.atelier.model.order.Order;

import java.util.List;

public interface GemstoneService {

    // Business logic methods

    Long createGemstone(GemstoneRequestDto gemstoneRequestDto);

    void updateGemstone(Long gemstoneId, GemstoneRequestDto gemstoneRequestDto);

    void deleteGemstone(Long gemstoneId);

    void changeGemstoneStatus(Long gemstoneId, GemstoneStatusDto gemstoneStatusDto);

    void changeGemstonePaymentStatus(Long gemstoneId, GemstonePaymentStatusDto gemstonePaymentStatusDto);

    void updateOrderGemstones(Order order, List<Long> requestGemstoneIds);

    void resetOrderGemstones(Long orderId);

    void assignGemstone(Order order, Long gemstoneId);

    void unassignGemstone(Long orderId, Long gemstoneId);

    // Get Dto methods

    SearchDto<GemstoneDto> searchGemstones(SearchRequestDto<GemstoneSearchCriteriaDto> gemstoneSearchQueryDto);

    InventoryTotalDto getGemstoneTotalDto(GemstoneSearchCriteriaDto searchQueryDto);

    GemstoneDto getGemstoneDto(Long gemstoneId);

    // Get Entity methods

    Gemstone getGemstone(Long gemstoneId);

    Gemstone getFullGemstone(Long gemstoneId);

    List<Gemstone> getGemstones(List<Long> gemstoneIds);
}
