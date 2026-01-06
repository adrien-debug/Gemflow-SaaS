package io.hearstcorporation.atelier.config.security;

import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class AuthorityUtils {
    private static final String ROLE_PREFIX = "ROLE_";

    public static String toRoleAuthorityString(String role) {
        return ROLE_PREFIX + StringUtils.upperCase(role);
    }

    public static GrantedAuthority toRoleGrantedAuthority(String role) {
        return new SimpleGrantedAuthority(toRoleAuthorityString(role));
    }

    public static List<GrantedAuthority> toRoleGrantedAuthorities(List<String> roles) {
        return roles.stream().map(AuthorityUtils::toRoleGrantedAuthority).collect(Collectors.toList());
    }
}
