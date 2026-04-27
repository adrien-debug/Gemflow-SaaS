package io.hearstcorporation.atelier.config.security;

import io.hearstcorporation.atelier.security.model.AuthUser;
import io.hearstcorporation.atelier.security.service.AuthUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.NonNull;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.List;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
public class AuthUserJwtTokenConverter implements Converter<Jwt, AuthUserJwtToken> {

    private final AuthUserService authUserService;

    @Override
    public final AuthUserJwtToken convert(@NonNull Jwt jwt) {
        UUID oid;
        try {
            oid = UUID.fromString(jwt.getSubject());
        } catch (IllegalArgumentException e) {
            log.error("Jwt token subject is not a valid UUID: {}", jwt.getSubject());
            throw new AccessDeniedException("Invalid token subject");
        }
        AuthUser authUser = authUserService.findByOid(oid);
        String role = authUser.role().code();
        return new AuthUserJwtToken(authUser, jwt, AuthorityUtils.toRoleGrantedAuthorities(List.of(role)));
    }
}
