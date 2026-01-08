package io.hearstcorporation.atelier.dto.model.setting;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CylinderDto {

    private Long id;
    private String name;
    private MetalDto metal;
    private Boolean open;
}
