package io.hearstcorporation.atelier.service.user.impl;

import io.hearstcorporation.atelier.dto.mapper.user.PermissionMapper;
import static io.hearstcorporation.atelier.dto.mapper.user.RoleMapper.toRoleDto;
import io.hearstcorporation.atelier.dto.model.user.PermissionDto;
import io.hearstcorporation.atelier.dto.model.user.RoleDto;
import io.hearstcorporation.atelier.dto.model.user.RolePermissionsMatrixDto;
import io.hearstcorporation.atelier.dto.model.user.UpdateRolePermissionsDto;
import io.hearstcorporation.atelier.model.user.Permission;
import io.hearstcorporation.atelier.model.user.Role;
import io.hearstcorporation.atelier.model.user.RolePermission;
import io.hearstcorporation.atelier.model.user.User;
import io.hearstcorporation.atelier.repository.user.PermissionRepository;
import io.hearstcorporation.atelier.repository.user.RolePermissionRepository;
import io.hearstcorporation.atelier.repository.user.RoleRepository;
import io.hearstcorporation.atelier.repository.user.UserRepository;
import io.hearstcorporation.atelier.service.user.PermissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PermissionServiceImpl implements PermissionService {
    
    private final PermissionRepository permissionRepository;
    private final RolePermissionRepository rolePermissionRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PermissionMapper permissionMapper;
    
    @Override
    public List<PermissionDto> getAllPermissions() {
        return permissionRepository.findAllByOrderByCategoryAscNameAsc()
                .stream()
                .map(permissionMapper::toDto)
                .collect(Collectors.toList());
    }
    
    @Override
    public RolePermissionsMatrixDto getPermissionsMatrix(Long tenantId) {
        List<Permission> permissions = permissionRepository.findAllByOrderByCategoryAscNameAsc();
        List<Role> roles = roleRepository.findAll();
        
        // Build matrix: Map<roleId, Map<permissionId, granted>>
        Map<Long, Map<Long, Boolean>> matrix = new HashMap<>();
        
        for (Role role : roles) {
            Map<Long, Boolean> rolePermissions = new HashMap<>();
            List<RolePermission> rps = rolePermissionRepository.findByTenantIdAndRoleId(tenantId, role.getId());
            
            // Initialize all permissions as false
            for (Permission permission : permissions) {
                rolePermissions.put(permission.getId(), false);
            }
            
            // Set granted permissions to true
            for (RolePermission rp : rps) {
                if (rp.getGranted()) {
                    rolePermissions.put(rp.getPermission().getId(), true);
                }
            }
            
            matrix.put(role.getId(), rolePermissions);
        }
        
        RolePermissionsMatrixDto dto = new RolePermissionsMatrixDto();
        dto.setPermissions(permissions.stream().map(permissionMapper::toDto).collect(Collectors.toList()));
        dto.setRoles(roles.stream().map(role -> toRoleDto(role)).collect(Collectors.toList()));
        dto.setMatrix(matrix);
        
        return dto;
    }
    
    @Override
    @Transactional
    public void updateRolePermissions(Long tenantId, UpdateRolePermissionsDto dto) {
        Role role = roleRepository.findById(dto.getRoleId())
                .orElseThrow(() -> new IllegalArgumentException("Role not found"));
        
        // Get existing permissions
        List<RolePermission> existing = rolePermissionRepository.findByTenantIdAndRoleId(tenantId, role.getId());
        Map<Long, RolePermission> existingMap = existing.stream()
                .collect(Collectors.toMap(rp -> rp.getPermission().getId(), rp -> rp));
        
        // Update or create permissions
        for (UpdateRolePermissionsDto.PermissionUpdate permUpdate : dto.getPermissions()) {
            Permission permission = permissionRepository.findById(permUpdate.getPermissionId())
                    .orElseThrow(() -> new IllegalArgumentException("Permission not found"));
            
            RolePermission rp = existingMap.get(permission.getId());
            if (rp != null) {
                // Update existing - Hibernate will automatically detect the change
                rp.setGranted(permUpdate.getGranted());
            } else {
                // Create new
                rp = new RolePermission();
                rp.setTenantId(tenantId);
                rp.setRole(role);
                rp.setPermission(permission);
                rp.setGranted(permUpdate.getGranted());
                rolePermissionRepository.save(rp);
            }
        }
    }
    
    @Override
    public boolean hasPermission(Long userId, String permissionCode) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null || user.getRole() == null) {
            return false;
        }
        
        // For now, assume tenantId = 1 (will be replaced with proper tenant context)
        Long tenantId = 1L;
        
        Optional<RolePermission> rp = rolePermissionRepository
                .findByTenantIdAndRoleIdAndPermissionCode(tenantId, user.getRole().getId(), permissionCode);
        
        return rp.isPresent() && rp.get().getGranted();
    }
    
    @Override
    public Set<String> getUserPermissions(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null || user.getRole() == null) {
            return Collections.emptySet();
        }
        
        // For now, assume tenantId = 1
        Long tenantId = 1L;
        
        List<String> codes = rolePermissionRepository
                .findGrantedPermissionCodesByTenantIdAndRoleId(tenantId, user.getRole().getId());
        
        return new HashSet<>(codes);
    }
}

