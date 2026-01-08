package io.hearstcorporation.atelier.dto.model.user;

import io.hearstcorporation.atelier.model.user.PermissionCategory;
import lombok.Data;

@Data
public class PermissionDto {
    private Long id;
    private String code;
    private String name;
    private String description;
    private PermissionCategory category;
}


