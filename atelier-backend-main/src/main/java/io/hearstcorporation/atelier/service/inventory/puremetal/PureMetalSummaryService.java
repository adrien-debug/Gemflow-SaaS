package io.hearstcorporation.atelier.service.inventory.puremetal;

import io.hearstcorporation.atelier.dto.model.inventory.puremetal.PureMetalSummaryDto;

import java.util.List;

public interface PureMetalSummaryService {

    List<PureMetalSummaryDto> getPureMetalSummaries();

    void recalculateCurrentCost();

    PureMetalSummaryDto getPureMetalSummary(Long priceMetalNameId);
}
