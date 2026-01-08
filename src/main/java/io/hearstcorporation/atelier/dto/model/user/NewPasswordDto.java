package io.hearstcorporation.atelier.dto.model.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewPasswordDto {

    @NotBlank
    @Size(min = 8, max = 256)
    private String newPassword;
}
