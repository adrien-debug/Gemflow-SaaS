package io.hearstcorporation.atelier.dto.model.inventory.gemstone;

import io.hearstcorporation.atelier.model.inventory.gemstone.GemstoneStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GemstoneStatusDto {

    @NotNull
    private GemstoneStatus status;
}
