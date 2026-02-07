package io.hearstcorporation.atelier.dto.model.file;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AtelierRequestDto {

    @NotBlank
    @Size(max = 128)
    protected String fileName;

    @NotBlank
    protected String contentType;
}
