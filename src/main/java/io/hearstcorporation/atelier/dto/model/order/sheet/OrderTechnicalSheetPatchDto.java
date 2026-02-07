package io.hearstcorporation.atelier.dto.model.order.sheet;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderTechnicalSheetPatchDto {

    @NotNull
    @NotEmpty
    private String note;
}
