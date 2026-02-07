package io.hearstcorporation.atelier.service.user;

import io.hearstcorporation.atelier.dto.model.user.RoleDto;
import io.hearstcorporation.atelier.model.user.Role;

import java.util.List;

public interface RoleService {

    List<RoleDto> getRoleDtoList();

    Role getRole(Long roleId);
}
