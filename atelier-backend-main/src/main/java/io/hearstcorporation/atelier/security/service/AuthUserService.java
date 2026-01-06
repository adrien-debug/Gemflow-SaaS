package io.hearstcorporation.atelier.security.service;

import io.hearstcorporation.atelier.security.model.AuthUser;

import java.util.UUID;

public interface AuthUserService {

    AuthUser findByOid(UUID oid);
}
