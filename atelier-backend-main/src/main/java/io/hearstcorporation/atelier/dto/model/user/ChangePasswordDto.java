package io.hearstcorporation.atelier.dto.model.user;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePasswordDto extends NewPasswordDto {

    @NotBlank
    private String currentPassword;
}
