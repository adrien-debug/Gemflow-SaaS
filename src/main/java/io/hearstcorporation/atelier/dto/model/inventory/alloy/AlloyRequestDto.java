package io.hearstcorporation.atelier.dto.model.inventory.alloy;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AlloyRequestDto {

    @NotBlank
    @Size(max = 256)
    private String name;

    @NotNull
    private Long metalId;
}
