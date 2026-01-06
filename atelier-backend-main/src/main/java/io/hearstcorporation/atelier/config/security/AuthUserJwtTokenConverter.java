package io.hearstcorporation.atelier.config.security;

import io.hearstcorporation.atelier.config.keycloak.property.KeycloakProperties;
import io.hearstcorporation.atelier.security.model.AuthUser;
import io.hearstcorporation.atelier.security.service.AuthUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.ListUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.NonNull;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.List;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
public class AuthUserJwtTokenConverter implements Converter<Jwt, AuthUserJwtToken> {

    private static final String ORGANIZATION_CLAIM = "organization";

    private final AuthUserService authUserService;
    private final KeycloakProperties keycloakProperties;

    @Override
    public final AuthUserJwtToken convert(@NonNull Jwt jwt) {
        String oidValue = jwt.getSubject();
        UUID oid = UUID.fromString(oidValue);
        AuthUser authUser = authUserService.findByOid(oid);
        String role = authUser.role().code();
        List<String> organizations = ListUtils.emptyIfNull(jwt.getClaimAsStringList(ORGANIZATION_CLAIM));
        if (CollectionUtils.isEmpty(organizations) || !organizations.contains(keycloakProperties.getOrganization())) {
            log.error("Jwt token has unsupported organizations {}", StringUtils.join(organizations, ","));
            throw new AccessDeniedException("Jwt token has unsupported organizations");
        }
        return new AuthUserJwtToken(authUser, jwt, AuthorityUtils.toRoleGrantedAuthorities(List.of(role)));
    }
}
