package io.hearstcorporation.atelier.dto.mapper.user;

import io.hearstcorporation.atelier.dto.model.user.PermissionDto;
import io.hearstcorporation.atelier.dto.model.user.RolePermissionDto;
import io.hearstcorporation.atelier.model.user.Permission;
import io.hearstcorporation.atelier.model.user.RolePermission;
import org.springframework.stereotype.Component;

@Component
public class PermissionMapper {
    
    public PermissionDto toDto(Permission permission) {
        if (permission == null) {
            return null;
        }
        
        PermissionDto dto = new PermissionDto();
        dto.setId(permission.getId());
        dto.setCode(permission.getCode());
        dto.setName(permission.getName());
        dto.setDescription(permission.getDescription());
        dto.setCategory(permission.getCategory());
        return dto;
    }
    
    public RolePermissionDto toRolePermissionDto(RolePermission rolePermission) {
        if (rolePermission == null) {
            return null;
        }
        
        RolePermissionDto dto = new RolePermissionDto();
        dto.setId(rolePermission.getId());
        dto.setRoleId(rolePermission.getRole().getId());
        dto.setRoleCode(rolePermission.getRole().getCode());
        dto.setRoleName(rolePermission.getRole().getName());
        dto.setPermissionId(rolePermission.getPermission().getId());
        dto.setPermissionCode(rolePermission.getPermission().getCode());
        dto.setPermissionName(rolePermission.getPermission().getName());
        dto.setGranted(rolePermission.getGranted());
        return dto;
    }
}


