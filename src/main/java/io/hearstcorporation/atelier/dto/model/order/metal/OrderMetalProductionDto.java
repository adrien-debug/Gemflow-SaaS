package io.hearstcorporation.atelier.dto.model.order.metal;

import io.hearstcorporation.atelier.dto.model.ModelNameDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalPurityDto;
import io.hearstcorporation.atelier.dto.model.user.UserWithImageDto;
import io.hearstcorporation.atelier.model.order.metal.OrderMetalProductionMaterialType;
import io.hearstcorporation.atelier.model.order.metal.OrderMetalProductionOperation;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Builder
public class OrderMetalProductionDto {

    private Long id;
    private Long orderId;
    private Instant createdAt;
    private OrderMetalProductionOperation operation;
    private OrderMetalProductionMaterialType materialType;
    private BigDecimal weight;
    private BigDecimal cost;
    private ModelNameDto material;
    private MetalDto metal;
    private MetalPurityDto metalPurity;
    private UserWithImageDto employee;


}
