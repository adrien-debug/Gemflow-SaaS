package io.hearstcorporation.atelier.dto.model.casting;

import io.hearstcorporation.atelier.dto.model.ModelNameDto;
import io.hearstcorporation.atelier.dto.model.order.task.OrderTaskCastingDto;
import io.hearstcorporation.atelier.dto.model.setting.CylinderDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalPurityDto;
import io.hearstcorporation.atelier.dto.model.user.UserShortDto;
import io.hearstcorporation.atelier.model.casting.CastingStatus;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Getter
@Builder
public class CastingDto {

    private Long id;
    private BigDecimal supportWithWaxTreeWeight;
    private BigDecimal supportWeight;
    private BigDecimal waxWeight;
    private BigDecimal preliminaryCastWeight;
    private BigDecimal alloyedMetalWeight;
    private BigDecimal alloyedMetalCost;
    private BigDecimal pureMetalWeight;
    private BigDecimal pureMetalCost;
    private BigDecimal alloyWeight;
    private BigDecimal alloyCost;
    private BigDecimal reuseWeight;
    private BigDecimal totalWeight;
    private BigDecimal totalCost;
    private CastingStatus status;
    private Instant completedAt;
    private UserShortDto completedBy;
    private Instant createdAt;
    private UserShortDto createdBy;
    private CylinderDto cylinder;
    private MetalDto metal;
    private MetalPurityDto metalPurity;
    private ModelNameDto alloyedMetal;
    private ModelNameDto priceMetalName;
    private ModelNameDto alloy;
    private List<OrderTaskCastingDto> orderTasks;
}
