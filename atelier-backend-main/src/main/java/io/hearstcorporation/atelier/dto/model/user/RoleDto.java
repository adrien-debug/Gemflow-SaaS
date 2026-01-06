package io.hearstcorporation.atelier.dto.model.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RoleDto {

    private Long id;
    private String code;
    private String name;
}
