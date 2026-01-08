package io.hearstcorporation.atelier.dto.model.inventory.gemstone;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GemstoneShortDto {

    private Long id;
    private String name;
    private String certificate;
}
