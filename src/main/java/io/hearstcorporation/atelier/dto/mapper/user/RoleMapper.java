package io.hearstcorporation.atelier.dto.mapper.user;

import io.hearstcorporation.atelier.dto.model.user.RoleDto;
import io.hearstcorporation.atelier.model.user.Role;
import io.hearstcorporation.atelier.security.model.AuthRole;
import lombok.experimental.UtilityClass;

import java.util.List;

@UtilityClass
public class RoleMapper {

    public static AuthRole toAuthRole(Role role) {
        if (role == null) {
            return null;
        }
        return new AuthRole(role.getId(), role.getCode(), role.getName());
    }

    public static RoleDto toRoleDto(Role role) {
        if (role == null) {
            return null;
        }
        return new RoleDto(role.getId(), role.getCode(), role.getName());
    }

    public static List<RoleDto> toRoleDtoList(List<Role> roles) {
        return roles.stream().map(RoleMapper::toRoleDto).toList();
    }
}
