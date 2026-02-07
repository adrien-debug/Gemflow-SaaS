package io.hearstcorporation.atelier.dto.model.user;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class RolePermissionsMatrixDto {
    private List<PermissionDto> permissions;
    private List<RoleDto> roles;
    // Map<roleId, Map<permissionId, granted>>
    private Map<Long, Map<Long, Boolean>> matrix;
}


