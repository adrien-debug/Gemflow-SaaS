package io.hearstcorporation.atelier.repository.user;

import io.hearstcorporation.atelier.model.user.RolePermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RolePermissionRepository extends JpaRepository<RolePermission, Long> {
    
    List<RolePermission> findByTenantIdAndRoleId(Long tenantId, Long roleId);
    
    @Query("SELECT rp FROM RolePermission rp WHERE rp.tenantId = :tenantId AND rp.role.id = :roleId AND rp.permission.code = :permissionCode")
    Optional<RolePermission> findByTenantIdAndRoleIdAndPermissionCode(
        @Param("tenantId") Long tenantId,
        @Param("roleId") Long roleId,
        @Param("permissionCode") String permissionCode
    );
    
    @Query("SELECT rp.permission.code FROM RolePermission rp WHERE rp.tenantId = :tenantId AND rp.role.id = :roleId AND rp.granted = true")
    List<String> findGrantedPermissionCodesByTenantIdAndRoleId(
        @Param("tenantId") Long tenantId,
        @Param("roleId") Long roleId
    );
    
    @Modifying
    @Query("DELETE FROM RolePermission rp WHERE rp.tenantId = :tenantId AND rp.role.id = :roleId")
    void deleteByTenantIdAndRoleId(@Param("tenantId") Long tenantId, @Param("roleId") Long roleId);
}

