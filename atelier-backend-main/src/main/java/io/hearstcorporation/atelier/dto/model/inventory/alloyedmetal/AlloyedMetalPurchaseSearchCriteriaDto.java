package io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class AlloyedMetalPurchaseSearchCriteriaDto {

    private String searchInput;
    private LocalDate balanceDate;
    private List<Long> alloyIds;
    private List<Long> alloyedMetalIds;
}
