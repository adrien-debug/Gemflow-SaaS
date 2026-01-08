package io.hearstcorporation.atelier.dto.model.user;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserShortDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String fullName;
}
