package io.hearstcorporation.atelier.config.security;

import io.hearstcorporation.atelier.security.model.AuthUser;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.AbstractOAuth2TokenAuthenticationToken;

import java.util.Collection;
import java.util.Map;

@Getter
public class AuthUserJwtToken extends AbstractOAuth2TokenAuthenticationToken<Jwt> {

    private final AuthUser authUser;

    public AuthUserJwtToken(AuthUser authUser, Jwt jwt, Collection<? extends GrantedAuthority> authorities) {
        super(jwt, authUser, jwt, authorities);
        this.setAuthenticated(true);
        this.authUser = authUser;
    }

    @Override
    public Map<String, Object> getTokenAttributes() {
        return this.getToken().getClaims();
    }

    @Override
    public String getName() {
        return authUser.oid().toString();
    }
}
