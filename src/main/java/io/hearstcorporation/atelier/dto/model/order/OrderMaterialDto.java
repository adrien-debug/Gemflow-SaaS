package io.hearstcorporation.atelier.dto.model.order;

import io.hearstcorporation.atelier.dto.model.logo.HallmarkLogoDto;
import io.hearstcorporation.atelier.dto.model.setting.MetalDto;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderMaterialDto {

    private Long id;
    private MetalDto materialMetal;
    private MetalDto clawMetal;
    private HallmarkLogoDto hallmarkLogo;
}
