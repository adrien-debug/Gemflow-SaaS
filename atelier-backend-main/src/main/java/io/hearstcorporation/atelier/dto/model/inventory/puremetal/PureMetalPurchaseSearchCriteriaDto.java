package io.hearstcorporation.atelier.dto.model.inventory.puremetal;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class PureMetalPurchaseSearchCriteriaDto {

    private String searchInput;
    private List<Long> supplierIds;
    private List<Long> metalPriceNameIds;
    private LocalDate balanceDate;
}
