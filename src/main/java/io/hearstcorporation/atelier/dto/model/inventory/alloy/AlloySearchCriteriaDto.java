package io.hearstcorporation.atelier.dto.model.inventory.alloy;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AlloySearchCriteriaDto {

    private String searchInput;
    private List<Long> metalIds;
}
