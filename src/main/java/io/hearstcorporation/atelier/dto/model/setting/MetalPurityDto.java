package io.hearstcorporation.atelier.dto.model.setting;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Getter
@Builder
@EqualsAndHashCode
public class MetalPurityDto {

    private Long id;
    private Short metalPurity;
}
