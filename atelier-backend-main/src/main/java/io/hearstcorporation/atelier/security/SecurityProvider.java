package io.hearstcorporation.atelier.security;

import io.hearstcorporation.atelier.security.model.AuthUser;
import lombok.experimental.UtilityClass;
import org.springframework.security.core.context.SecurityContextHolder;

@UtilityClass
public class SecurityProvider {

    public static Long getCurrentUserId() {
        return getCurrentUser().userId();
    }

    public static AuthUser getCurrentUser() {
        return (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
