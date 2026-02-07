package io.hearstcorporation.atelier.dto.model.inventory.alloy;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AlloyPurchaseRequestDto extends AlloyPurchaseUpdateDto {

    @NotNull
    private Long alloyId;
}
