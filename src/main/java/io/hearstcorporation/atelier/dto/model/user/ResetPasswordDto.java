package io.hearstcorporation.atelier.dto.model.user;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class ResetPasswordDto extends NewPasswordDto {

    @NotNull
    private UUID tokenValue;
}
