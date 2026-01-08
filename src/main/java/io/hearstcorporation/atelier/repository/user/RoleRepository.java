package io.hearstcorporation.atelier.repository.user;

import io.hearstcorporation.atelier.model.user.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoleRepository extends JpaRepository<Role, Long> {

    List<Role> getRolesByIdIn(List<Long> roleIds);
}
