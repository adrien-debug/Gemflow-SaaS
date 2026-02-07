package io.hearstcorporation.atelier.dto.model.inventory.diamond;

import io.hearstcorporation.atelier.model.inventory.diamond.DiamondQualityType;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DiamondSearchCriteriaDto {

    private String searchInput;
    private List<DiamondQualityType> qualityTypes;
    private List<Long> diamondShapeIds;
    private List<Long> supplierIds;
}
