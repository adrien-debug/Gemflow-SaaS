package io.hearstcorporation.atelier.dto.model.order.diamond;

import io.hearstcorporation.atelier.model.order.diamon.OrderDiamondStatus;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderDiamondSearchCriteriaDto {

    private String searchInput;
    private List<OrderDiamondStatus> statuses;
    private List<Long> orderIds;
}
