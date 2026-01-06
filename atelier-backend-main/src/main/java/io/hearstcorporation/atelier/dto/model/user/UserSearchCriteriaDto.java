package io.hearstcorporation.atelier.dto.model.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSearchCriteriaDto {

    private String searchInput;
    private Boolean isActive;
}
