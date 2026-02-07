package io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AlloyedMetalSearchCriteriaDto {

    private String searchInput;
    private List<Long> metalIds;
    private List<Long> metalPurityIds;
}
