package io.hearstcorporation.atelier.dto.model;

import io.hearstcorporation.atelier.model.ImageSizeType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

@Getter
@Setter
public class ImageRequestDto {

    @NotNull
    private ImageSizeType sizeType;

    @Valid
    @NotNull
    private IdRequestDto file;

    public Long getFileId() {
        return Optional.ofNullable(file)
                .map(IdRequestDto::getId)
                .orElse(null);
    }
}
