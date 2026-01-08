package io.hearstcorporation.atelier.dto.model.order;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderMaterialRequestDto {

    @NotNull
    private Long materialMetalId;

    @NotNull
    private Long clawMetalId;

    private Long hallmarkLogoId;
}
