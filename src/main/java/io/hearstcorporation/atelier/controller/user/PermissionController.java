package io.hearstcorporation.atelier.controller.user;

import io.hearstcorporation.atelier.dto.model.user.PermissionDto;
import io.hearstcorporation.atelier.dto.model.user.RolePermissionsMatrixDto;
import io.hearstcorporation.atelier.dto.model.user.UpdateRolePermissionsDto;
import io.hearstcorporation.atelier.service.user.PermissionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/permissions")
@RequiredArgsConstructor
public class PermissionController {
    
    private final PermissionService permissionService;
    
    /**
     * Get all available permissions
     */
    @GetMapping
    public ResponseEntity<List<PermissionDto>> getAllPermissions() {
        return ResponseEntity.ok(permissionService.getAllPermissions());
    }
    
    /**
     * Get permissions matrix for all roles
     * Returns a matrix showing which permissions are granted to which roles
     */
    @GetMapping("/matrix")
    public ResponseEntity<RolePermissionsMatrixDto> getPermissionsMatrix(
            @RequestParam(defaultValue = "1") Long tenantId) {
        return ResponseEntity.ok(permissionService.getPermissionsMatrix(tenantId));
    }
    
    /**
     * Update permissions for a specific role
     */
    @PutMapping("/role")
    public ResponseEntity<Void> updateRolePermissions(
            @RequestParam(defaultValue = "1") Long tenantId,
            @Valid @RequestBody UpdateRolePermissionsDto dto) {
        permissionService.updateRolePermissions(tenantId, dto);
        return ResponseEntity.ok().build();
    }
    
    /**
     * Check if current user has a specific permission
     */
    @GetMapping("/check/{permissionCode}")
    public ResponseEntity<Boolean> hasPermission(
            @PathVariable String permissionCode,
            @RequestParam Long userId) {
        boolean hasPermission = permissionService.hasPermission(userId, permissionCode);
        return ResponseEntity.ok(hasPermission);
    }
    
    /**
     * Get all permissions for a user
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<Set<String>> getUserPermissions(@PathVariable Long userId) {
        return ResponseEntity.ok(permissionService.getUserPermissions(userId));
    }
}


