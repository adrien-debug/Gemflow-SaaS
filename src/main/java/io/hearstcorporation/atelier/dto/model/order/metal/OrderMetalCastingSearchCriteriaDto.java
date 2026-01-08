package io.hearstcorporation.atelier.dto.model.order.metal;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderMetalCastingSearchCriteriaDto {

    private List<Long> orderIds;
}
