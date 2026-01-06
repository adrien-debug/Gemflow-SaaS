package io.hearstcorporation.atelier.dto.model.order;

import io.hearstcorporation.atelier.dto.model.ImageRequestDto;
import io.hearstcorporation.atelier.dto.validation.ImageList;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Optional;

@Getter
@Setter
@SuppressWarnings("OptionalUsedAsFieldOrParameterType")
public class OrderCadRequestDto {

    private Optional<@Positive Integer> stlCount;

    private Optional<@ImageList List<@Valid @NotNull ImageRequestDto>> cadImages;

    private Optional<@ImageList List<@Valid @NotNull ImageRequestDto>> castingPartsImages;

    private Optional<@ImageList List<@Valid @NotNull ImageRequestDto>> diamondMapImages;

    private Optional<@Size(max = 10) List<@NotNull Long>> createStlFileIds;

    private Optional<@Size(max = 10) List<@NotNull Long>> deletedStlFileIds;

    private Optional<@Size(max = 10) List<@NotNull Long>> createCadFileIds;

    private Optional<@Size(max = 10) List<@NotNull Long>> deletedCadFileIds;
}
