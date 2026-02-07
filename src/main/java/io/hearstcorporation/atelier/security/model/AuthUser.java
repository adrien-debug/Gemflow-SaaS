package io.hearstcorporation.atelier.security.model;

import java.util.UUID;

public record AuthUser(UUID oid, Long userId, AuthRole role) {
}
