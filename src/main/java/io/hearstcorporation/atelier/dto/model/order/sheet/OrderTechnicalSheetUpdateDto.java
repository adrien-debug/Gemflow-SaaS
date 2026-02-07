package io.hearstcorporation.atelier.dto.model.order.sheet;

import io.hearstcorporation.atelier.dto.model.ImageRequestDto;
import io.hearstcorporation.atelier.dto.validation.ImageList;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Optional;

@Getter
@Setter
public class OrderTechnicalSheetUpdateDto {

    private String generalNote;

    private String mountingNote1;

    private Optional<@ImageList List<@Valid @NotNull ImageRequestDto>> mounting1Images;

    private String mountingNote2;

    private Optional<@ImageList List<@Valid @NotNull ImageRequestDto>> mounting2Images;

    private String mountingNote3;

    private Optional<@ImageList List<@Valid @NotNull ImageRequestDto>> mounting3Images;

    private String mountingNote4;

    private Optional<@ImageList List<@Valid @NotNull ImageRequestDto>> mounting4Images;

    private String settingNote;
}
