package io.hearstcorporation.atelier.dto.model.setting;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ItemCategoryDto {

    private Long id;
    private String name;
    private Boolean immutable;
}
