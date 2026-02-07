package io.hearstcorporation.atelier.dto.model.setting;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Getter
@Builder
@EqualsAndHashCode
public class MetalDto {

    private Long id;
    private String name;
}
