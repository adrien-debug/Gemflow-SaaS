package io.hearstcorporation.atelier.dto.model.inventory.other;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OtherMaterialTransactionUpdateDto {

    @NotBlank
    @Size(max = 120)
    private String description;
}
