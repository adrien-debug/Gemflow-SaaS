package io.hearstcorporation.atelier.dto.model.setting;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SupplyTypeRequestDto {

    @NotBlank
    @Size(max = 256)
    private String name;
}
