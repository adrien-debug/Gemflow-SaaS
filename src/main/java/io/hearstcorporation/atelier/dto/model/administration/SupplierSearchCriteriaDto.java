package io.hearstcorporation.atelier.dto.model.administration;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SupplierSearchCriteriaDto {

    private String searchInput;
    private List<Long> supplyTypeIds;
}
