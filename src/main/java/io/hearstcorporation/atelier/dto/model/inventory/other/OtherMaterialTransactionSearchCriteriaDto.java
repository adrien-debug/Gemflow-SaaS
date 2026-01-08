package io.hearstcorporation.atelier.dto.model.inventory.other;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class OtherMaterialTransactionSearchCriteriaDto {

    private String searchInput;
    private LocalDate balanceDate;
    private List<Long> orderIds;
    private List<Long> otherMaterialIds;
}
