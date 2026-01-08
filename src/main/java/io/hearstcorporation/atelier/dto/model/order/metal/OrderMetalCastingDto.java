package io.hearstcorporation.atelier.dto.model.order.metal;

import io.hearstcorporation.atelier.dto.model.casting.CastingMetalDto;
import io.hearstcorporation.atelier.dto.model.order.task.OrderTaskCastingDto;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Builder
public class OrderMetalCastingDto {

    private Long id;
    private BigDecimal cost;
    private Instant createdAt;
    private CastingMetalDto casting;
    private OrderTaskCastingDto orderTask;
}
