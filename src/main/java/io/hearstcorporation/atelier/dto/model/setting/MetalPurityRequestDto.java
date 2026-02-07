package io.hearstcorporation.atelier.dto.model.setting;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class MetalPurityRequestDto {

    @NotNull
    @Min(value = 1)
    @Max(value = 1000)
    private Short metalPurity;
}
