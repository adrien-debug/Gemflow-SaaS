package io.hearstcorporation.atelier.dto.model.casting;

import io.hearstcorporation.atelier.dto.model.ModelNameDto;
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
public class CastingListDto {

    private Long id;
    private BigDecimal alloyedMetalWeight;
    private BigDecimal pureMetalWeight;
    private BigDecimal alloyWeight;
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
    private List<Long> orderIds;
}
