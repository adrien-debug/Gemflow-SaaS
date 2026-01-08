package io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AlloyedMetalPurchaseRequestDto extends AlloyedMetalPurchaseUpdateDto {

    @NotNull
    private Long alloyId;

    @NotNull
    private Long alloyedMetalId;
}
