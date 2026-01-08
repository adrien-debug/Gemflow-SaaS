package io.hearstcorporation.atelier.security;

import io.hearstcorporation.atelier.security.model.AuthUser;
import lombok.experimental.UtilityClass;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.UUID;

@UtilityClass
public class SecurityProvider {

    // Default user ID for development mode (when auth is disabled)
    private static final Long DEV_USER_ID = 1L;
    private static final UUID DEV_USER_OID = UUID.fromString("00000000-0000-0000-0000-000000000001");

    public static Long getCurrentUserId() {
        AuthUser user = getCurrentUser();
        return user != null ? user.userId() : DEV_USER_ID;
    }

    public static AuthUser getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getPrincipal() == null) {
            return null;
        }
        Object principal = auth.getPrincipal();
        if (principal instanceof AuthUser) {
            return (AuthUser) principal;
        }
        // Development mode: return null when auth is disabled (principal is String "anonymousUser")
        return null;
    }

    public static boolean isAuthenticated() {
        return getCurrentUser() != null;
    }
}
