package io.hearstcorporation.atelier.service.keycloak.impl;

import io.hearstcorporation.atelier.config.keycloak.property.KeycloakProperties;
import io.hearstcorporation.atelier.dto.mapper.keycloak.KeycloakMapper;
import io.hearstcorporation.atelier.dto.model.user.UserCreateDto;
import io.hearstcorporation.atelier.dto.model.user.UserUpdateDto;
import io.hearstcorporation.atelier.exception.KeycloakException;
import io.hearstcorporation.atelier.service.keycloak.KeycloakService;
import jakarta.ws.rs.NotAuthorizedException;
import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.OrganizationMembersResource;
import org.keycloak.admin.client.resource.OrganizationResource;
import org.keycloak.admin.client.resource.OrganizationsResource;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.admin.client.token.TokenManager;
import org.keycloak.representations.idm.OrganizationRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class KeycloakServiceImpl implements KeycloakService {

    private final Keycloak keycloak;
    private final KeycloakProperties keycloakProperties;

    @Override
    public UUID createUser(UserCreateDto userCreateDto) {
        String randomPassword = RandomStringUtils.secureStrong().nextAlphabetic(64);
        UserRepresentation keycloakUser = KeycloakMapper.toUserRepresentation(userCreateDto, randomPassword);

        RealmResource realmResource = keycloak.realm(keycloakProperties.getRealm());
        UsersResource usersResource = realmResource.users();

        OrganizationsResource organizationsResource = realmResource.organizations();
        OrganizationRepresentation organizationRepresentation = organizationsResource.search(keycloakProperties.getOrganization(), true, 0, 1).stream()
                .findFirst()
                .orElseThrow(() -> {
                    log.error("Keycloak organization with name {} not found", keycloakProperties.getOrganization());
                    return new KeycloakException("Error during keycloak user creation");
                });
        OrganizationResource organizationResource = organizationsResource.get(organizationRepresentation.getId());
        OrganizationMembersResource organizationMembersResource = organizationResource.members();

        String userId;
        try (Response response = usersResource.create(keycloakUser)) {
            log.info("Keycloak user {} created", userCreateDto.getEmail());
            userId = CreatedResponseUtil.getCreatedId(response);
        } catch (Exception e) {
            log.error("Error creating keycloak user: {}", e.getMessage(), e);
            throw new KeycloakException("Error during keycloak user creation");
        }

        if (userId == null) {
            userId = usersResource.searchByEmail(userCreateDto.getEmail(), true).stream()
                    .findFirst()
                    .map(UserRepresentation::getId)
                    .orElse(null);
        }

        if (userId == null) {
            log.error("Cannot determine keycloak user id for email {}, first name {}, last name {}.",
                    userCreateDto.getEmail(), userCreateDto.getFirstName(), userCreateDto.getLastName());
            throw new KeycloakException("Error during keycloak user creation");
        }

        try (Response response = organizationMembersResource.addMember(userId)) {
            log.info("Added keycloak user {} to organization", userCreateDto.getEmail());
        } catch (Exception e) {
            log.error("Error assign keycloak user {} to organization: {}", userCreateDto.getEmail(), e.getMessage(), e);
            deleteUser(userId);
            throw new KeycloakException("Error during keycloak user creation");
        }

        return UUID.fromString(userId);
    }

    @Override
    public void updateUser(UUID oid, UserUpdateDto userUpdateDto) {
        RealmResource realmResource = keycloak.realm(keycloakProperties.getRealm());
        UsersResource usersResource = realmResource.users();
        UserResource userResource = usersResource.get(oid.toString());
        UserRepresentation keycloakUser = getUser(userResource);
        KeycloakMapper.mapUserRepresentation(keycloakUser, userUpdateDto);
        userResource.update(keycloakUser);
        log.info("Keycloak user {} updated", keycloakUser.getEmail());
    }

    @Override
    public void activateUser(UUID oid, boolean active) {
        RealmResource realmResource = keycloak.realm(keycloakProperties.getRealm());
        UsersResource usersResource = realmResource.users();
        UserResource userResource = usersResource.get(oid.toString());
        UserRepresentation keycloakUser = getUser(userResource);
        keycloakUser.setEnabled(active);
        userResource.update(keycloakUser);
        log.info("Keycloak user {} activated", keycloakUser.getEmail());
    }

    @Override
    public boolean isCurrentPasswordValid(UUID oid, String currentPassword) {
        RealmResource realmResource = keycloak.realm(keycloakProperties.getRealm());
        UsersResource usersResource = realmResource.users();
        UserResource userResource = usersResource.get(oid.toString());
        UserRepresentation keycloakUser = getUser(userResource);

        try (Keycloak userKeycloak = KeycloakBuilder.builder()
                .serverUrl(keycloakProperties.getUrl())
                .realm(keycloakProperties.getRealm())
                .grantType(OAuth2Constants.PASSWORD)
                .clientId(keycloakProperties.getClientId())
                .clientSecret(keycloakProperties.getClientSecret())
                .username(keycloakUser.getUsername())
                .password(currentPassword)
                .build()) {
            TokenManager tokenManager = userKeycloak.tokenManager();
            tokenManager.getAccessToken();
            tokenManager.logout();
            return true;
        } catch (NotAuthorizedException e) {
            log.warn("User with email {} use incorrect password", keycloakUser.getEmail());
            return false;
        } catch (Exception e) {
            throw new KeycloakException("Error during keycloak user password verification");
        }
    }

    @Override
    public void changePassword(UUID oid, String newPassword) {
        RealmResource realmResource = keycloak.realm(keycloakProperties.getRealm());
        UsersResource usersResource = realmResource.users();
        UserResource userResource = usersResource.get(oid.toString());
        UserRepresentation keycloakUser = getUser(userResource);
        try {
            userResource.resetPassword(KeycloakMapper.toCredentialRepresentation(newPassword));
            log.info("Keycloak user {} password was reset", keycloakUser.getEmail());
        } catch (Exception e) {
            log.error("Error reset keycloak user password: {}", e.getMessage(), e);
            throw new KeycloakException("Error during keycloak user password reset");
        }
    }

    @Override
    public void deleteUser(UUID oid) {
        deleteUser(oid.toString());
    }

    @Override
    public void deleteUser(String oid) {
        RealmResource realmResource = keycloak.realm(keycloakProperties.getRealm());
        UsersResource usersResource = realmResource.users();
        UserResource userResource = usersResource.get(oid);
        UserRepresentation keycloakUser = getUser(userResource);
        try (Response delete = usersResource.delete(oid)) {
            log.info("Keycloak user {} deleted", keycloakUser.getEmail());
        } catch (Exception e) {
            log.error("Error deleting keycloak user: {}", e.getMessage(), e);
            throw new KeycloakException("Error during keycloak user deletion");
        }
    }

    private UserRepresentation getUser(UserResource userResource) {
        try {
            return userResource.toRepresentation();
        } catch (jakarta.ws.rs.NotFoundException e) {
            log.error("Error get keycloak user: {}", e.getMessage(), e);
            throw new KeycloakException("Error get keycloak user");
        }
    }
}
