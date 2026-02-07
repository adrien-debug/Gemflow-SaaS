package io.hearstcorporation.atelier.dto.model.user;

import lombok.Data;

@Data
public class RolePermissionDto {
    private Long id;
    private Long roleId;
    private String roleCode;
    private String roleName;
    private Long permissionId;
    private String permissionCode;
    private String permissionName;
    private Boolean granted;
}


