package io.hearstcorporation.atelier.dto.model.order.task;

import io.hearstcorporation.atelier.dto.model.ImageRequestDto;
import io.hearstcorporation.atelier.dto.validation.ImageList;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PartBrokenRequestDto {

    @NotNull
    @Positive
    private Integer stlCount;

    @Valid
    @NotNull
    @NotEmpty
    @ImageList
    private List<@NotNull ImageRequestDto> orderTaskImages;
}
