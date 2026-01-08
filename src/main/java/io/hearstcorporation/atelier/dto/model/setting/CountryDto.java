package io.hearstcorporation.atelier.dto.model.setting;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CountryDto {

    private Long id;
    private String code;
    private String name;
    private String region;
}
