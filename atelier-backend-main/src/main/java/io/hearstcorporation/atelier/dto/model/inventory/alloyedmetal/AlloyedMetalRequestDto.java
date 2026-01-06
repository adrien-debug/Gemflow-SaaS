package io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AlloyedMetalRequestDto extends AlloyedMetalUpdateDto {

    @NotNull
    private Long metalId;

    @NotNull
    private Long metalPurityId;
}
