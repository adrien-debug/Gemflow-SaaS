package io.hearstcorporation.atelier.repository.user;

import io.hearstcorporation.atelier.model.user.Permission;
import io.hearstcorporation.atelier.model.user.PermissionCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Long> {
    
    Optional<Permission> findByCode(String code);
    
    List<Permission> findByCategory(PermissionCategory category);
    
    List<Permission> findAllByOrderByCategoryAscNameAsc();
}


