package io.hearstcorporation.atelier.dto.model.casting;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CastingRequestDto extends CastingUpdateDto {

    @NotNull
    private Long cylinderId;

    @NotNull
    private Long metalId;
}
