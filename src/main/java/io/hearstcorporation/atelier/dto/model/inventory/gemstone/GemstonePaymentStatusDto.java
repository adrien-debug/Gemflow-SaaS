package io.hearstcorporation.atelier.dto.model.inventory.gemstone;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GemstonePaymentStatusDto {

    @NotNull
    private Long paymentStatusId;
}
