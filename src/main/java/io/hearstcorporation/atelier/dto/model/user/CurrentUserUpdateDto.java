package io.hearstcorporation.atelier.dto.model.user;

import io.hearstcorporation.atelier.dto.model.ImageRequestDto;
import io.hearstcorporation.atelier.dto.validation.ImageList;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CurrentUserUpdateDto {

    @NotNull
    @Size(min = 3, max = 64)
    private String firstName;

    @NotNull
    @Size(min = 3, max = 64)
    private String lastName;

    @Valid
    @ImageList
    private List<@NotNull ImageRequestDto> photos;
}
