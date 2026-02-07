package io.hearstcorporation.atelier.service.user;

import io.hearstcorporation.atelier.dto.model.user.PermissionDto;
import io.hearstcorporation.atelier.dto.model.user.RolePermissionsMatrixDto;
import io.hearstcorporation.atelier.dto.model.user.UpdateRolePermissionsDto;

import java.util.List;
import java.util.Set;

public interface PermissionService {
    
    /**
     * Get all permissions
     */
    List<PermissionDto> getAllPermissions();
    
    /**
     * Get permissions matrix for all roles in tenant
     */
    RolePermissionsMatrixDto getPermissionsMatrix(Long tenantId);
    
    /**
     * Update permissions for a specific role
     */
    void updateRolePermissions(Long tenantId, UpdateRolePermissionsDto dto);
    
    /**
     * Check if a user has a specific permission
     */
    boolean hasPermission(Long userId, String permissionCode);
    
    /**
     * Get all granted permission codes for a user
     */
    Set<String> getUserPermissions(Long userId);
}


