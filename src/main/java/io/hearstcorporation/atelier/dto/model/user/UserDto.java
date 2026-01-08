package io.hearstcorporation.atelier.dto.model.user;

import io.hearstcorporation.atelier.dto.model.ImageDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class UserDto {

    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String fullName;
    private RoleDto role;
    private Boolean isActive;
    private List<ImageDto> photos;
}
