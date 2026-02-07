package io.hearstcorporation.atelier.dto.mapper.keycloak;

import io.hearstcorporation.atelier.dto.model.user.UserCreateDto;
import io.hearstcorporation.atelier.dto.model.user.UserUpdateDto;
import lombok.experimental.UtilityClass;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;

import java.util.List;

@UtilityClass
public class KeycloakMapper {

    public static UserRepresentation toUserRepresentation(UserCreateDto userCreateDto, String password) {
        UserRepresentation keycloakUser = new UserRepresentation();
        keycloakUser.setUsername(userCreateDto.getEmail());
        keycloakUser.setFirstName(userCreateDto.getFirstName());
        keycloakUser.setLastName(userCreateDto.getLastName());
        keycloakUser.setEmail(userCreateDto.getEmail());
        keycloakUser.setEnabled(true);
        keycloakUser.setEmailVerified(true);
        keycloakUser.setCredentials(List.of(toCredentialRepresentation(password)));
        return keycloakUser;
    }

    public static void mapUserRepresentation(UserRepresentation keycloakUser, UserUpdateDto userUpdateDto) {
        keycloakUser.setFirstName(userUpdateDto.getFirstName());
        keycloakUser.setLastName(userUpdateDto.getLastName());
    }

    public static CredentialRepresentation toCredentialRepresentation(String password) {
        CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
        credentialRepresentation.setType(CredentialRepresentation.PASSWORD);
        credentialRepresentation.setValue(password);
        return credentialRepresentation;
    }
}
