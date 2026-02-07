package io.hearstcorporation.atelier.dto.model.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserCreateDto extends UserUpdateDto {

    @Email
    @NotNull
    @Size(max = 256)
    private String email;
}
