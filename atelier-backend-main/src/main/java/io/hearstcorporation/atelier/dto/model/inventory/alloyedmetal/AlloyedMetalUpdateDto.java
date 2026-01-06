package io.hearstcorporation.atelier.dto.model.inventory.alloyedmetal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AlloyedMetalUpdateDto {

    @NotBlank
    @Size(max = 256)
    private String name;
}
