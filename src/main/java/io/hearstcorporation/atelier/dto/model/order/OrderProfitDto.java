package io.hearstcorporation.atelier.dto.model.order;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderProfitDto {

    private Long id;
    private Short diamondProfitPercentage;
    private Short gemstoneProfitPercentage;
    private Short labourProfitPercentage;
    private Short metalProfitPercentage;
    private Long orderId;
}
