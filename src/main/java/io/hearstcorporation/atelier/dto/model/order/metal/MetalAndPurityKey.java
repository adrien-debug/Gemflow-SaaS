package io.hearstcorporation.atelier.dto.model.order.metal;

import io.hearstcorporation.atelier.dto.model.setting.MetalDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalPurityDto;

public record MetalAndPurityKey(MetalDto metal, MetalPurityDto metalPurity) {
}