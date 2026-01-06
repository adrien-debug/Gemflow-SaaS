package io.hearstcorporation.atelier.service.keycloak;

import io.hearstcorporation.atelier.dto.model.user.UserCreateDto;
import io.hearstcorporation.atelier.dto.model.user.UserUpdateDto;

import java.util.UUID;

public interface KeycloakService {

    UUID createUser(UserCreateDto userCreateDto);

    void updateUser(UUID oid, UserUpdateDto userUpdateDto);

    void activateUser(UUID oid, boolean active);

    boolean isCurrentPasswordValid(UUID oid, String currentPassword);

    void changePassword(UUID oid, String newPassword);

    void deleteUser(UUID oid);

    void deleteUser(String oid);
}
