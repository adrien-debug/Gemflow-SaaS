package io.hearstcorporation.atelier.dto.model.logo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HallmarkLogoRequestDto {

    @NotBlank
    @Size(max = 256)
    private String name;
}
