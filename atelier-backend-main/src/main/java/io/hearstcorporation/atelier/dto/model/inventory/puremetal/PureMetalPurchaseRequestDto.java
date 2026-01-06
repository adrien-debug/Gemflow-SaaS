package io.hearstcorporation.atelier.dto.model.inventory.puremetal;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PureMetalPurchaseRequestDto extends PureMetalPurchaseUpdateDto {

    @NotNull
    private Long priceMetalNameId;
}
