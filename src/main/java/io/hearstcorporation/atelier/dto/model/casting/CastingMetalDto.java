package io.hearstcorporation.atelier.dto.model.casting;

import io.hearstcorporation.atelier.dto.model.setting.MetalDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalPurityDto;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CastingMetalDto {

    private Long id;
    private MetalDto metal;
    private MetalPurityDto metalPurity;
}
