package io.hearstcorporation.atelier.security.service.impl;

import io.hearstcorporation.atelier.dto.mapper.user.RoleMapper;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.user.User;
import io.hearstcorporation.atelier.repository.user.UserRepository;
import io.hearstcorporation.atelier.security.model.AuthUser;
import io.hearstcorporation.atelier.security.service.AuthUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthUserServiceImpl implements AuthUserService {

    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public AuthUser findByOid(UUID oid) {
        User user = userRepository.findByOid(oid)
                .orElseThrow(() -> new NotFoundException("User not found by oid %s".formatted(oid)));
        return new AuthUser(oid, user.getId(), RoleMapper.toAuthRole(user.getRole()));
    }
}
