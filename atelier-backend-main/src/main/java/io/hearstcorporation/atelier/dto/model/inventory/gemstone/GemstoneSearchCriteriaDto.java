package io.hearstcorporation.atelier.dto.model.inventory.gemstone;

import io.hearstcorporation.atelier.model.inventory.gemstone.GemstoneStatus;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GemstoneSearchCriteriaDto {

    private String searchInput;
    private List<GemstoneStatus> statuses;
    private List<Long> paymentStatusIds;
    private List<Long> locationIds;
    private List<Long> orderIds;
    //todo: remove when we will support search criteria list
    private Boolean alwaysIncludeUsedInOrder;
}
