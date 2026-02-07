package io.hearstcorporation.atelier.service.user.impl;

import io.hearstcorporation.atelier.dto.mapper.user.RoleMapper;
import io.hearstcorporation.atelier.dto.model.user.RoleDto;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.user.Role;
import io.hearstcorporation.atelier.repository.user.RoleRepository;
import io.hearstcorporation.atelier.service.user.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Override
    public List<RoleDto> getRoleDtoList() {
        return RoleMapper.toRoleDtoList(roleRepository.findAll());
    }

    @Override
    public Role getRole(Long roleId) {
        return roleRepository.findById(roleId).orElseThrow(
                () -> new NotFoundException("Role with id %d was not found.".formatted(roleId))
        );
    }
}
