package io.hearstcorporation.atelier.service.identity.impl;

import io.hearstcorporation.atelier.config.supabase.SupabaseConfig;
import io.hearstcorporation.atelier.dto.model.user.UserCreateDto;
import io.hearstcorporation.atelier.dto.model.user.UserUpdateDto;
import io.hearstcorporation.atelier.exception.IdentityProviderException;
import io.hearstcorporation.atelier.service.identity.IdentityProviderService;
import io.hearstcorporation.atelier.service.identity.dto.SupabaseUserResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
public class SupabaseIdentityProviderServiceImpl implements IdentityProviderService {

    private static final String ADMIN_USERS_PATH = "/admin/users";
    private static final String ADMIN_USER_PATH = "/admin/users/{id}";
    private static final String SIGNIN_PATH = "/token?grant_type=password";
    private static final String BAN_DURATION_NONE = "none";
    private static final String BAN_DURATION_FOREVER = "876000h"; // ~100 years

    private final RestClient adminClient;
    private final RestClient authClient;

    public SupabaseIdentityProviderServiceImpl(
            @Qualifier(SupabaseConfig.SUPABASE_ADMIN_REST_CLIENT) RestClient adminClient,
            @Qualifier(SupabaseConfig.SUPABASE_AUTH_REST_CLIENT) RestClient authClient) {
        this.adminClient = adminClient;
        this.authClient = authClient;
    }

    @Override
    public UUID createUser(UserCreateDto userCreateDto) {
        String randomPassword = RandomStringUtils.secureStrong().nextAlphabetic(64);
        Map<String, Object> body = Map.of(
                "email", userCreateDto.getEmail(),
                "password", randomPassword,
                "email_confirm", true,
                "user_metadata", Map.of(
                        "first_name", userCreateDto.getFirstName(),
                        "last_name", userCreateDto.getLastName()
                )
        );
        try {
            SupabaseUserResponse response = adminClient.post()
                    .uri(ADMIN_USERS_PATH)
                    .body(body)
                    .retrieve()
                    .body(SupabaseUserResponse.class);
            if (response == null || response.id() == null) {
                throw new IdentityProviderException("Supabase did not return a user id");
            }
            log.info("Supabase user {} created", userCreateDto.getEmail());
            return UUID.fromString(response.id());
        } catch (RestClientResponseException e) {
            log.error("Error creating Supabase user: {} {}", e.getStatusCode(), e.getResponseBodyAsString(), e);
            throw new IdentityProviderException("Error during identity provider user creation", e);
        }
    }

    @Override
    public void updateUser(UUID oid, UserUpdateDto userUpdateDto) {
        Map<String, Object> body = Map.of(
                "user_metadata", Map.of(
                        "first_name", userUpdateDto.getFirstName(),
                        "last_name", userUpdateDto.getLastName()
                )
        );
        try {
            adminClient.put()
                    .uri(ADMIN_USER_PATH, oid.toString())
                    .body(body)
                    .retrieve()
                    .toBodilessEntity();
            log.info("Supabase user {} updated", oid);
        } catch (RestClientResponseException e) {
            log.error("Error updating Supabase user {}: {} {}", oid, e.getStatusCode(), e.getResponseBodyAsString(), e);
            throw new IdentityProviderException("Error during identity provider user update", e);
        }
    }

    @Override
    public void activateUser(UUID oid, boolean active) {
        Map<String, Object> body = Map.of("ban_duration", active ? BAN_DURATION_NONE : BAN_DURATION_FOREVER);
        try {
            adminClient.put()
                    .uri(ADMIN_USER_PATH, oid.toString())
                    .body(body)
                    .retrieve()
                    .toBodilessEntity();
            log.info("Supabase user {} active={}", oid, active);
        } catch (RestClientResponseException e) {
            log.error("Error activating Supabase user {}: {} {}", oid, e.getStatusCode(), e.getResponseBodyAsString(), e);
            throw new IdentityProviderException("Error during identity provider user activation", e);
        }
    }

    @Override
    public boolean isCurrentPasswordValid(UUID oid, String currentPassword) {
        SupabaseUserResponse user = getUser(oid);
        if (user.email() == null) {
            throw new IdentityProviderException("Supabase user has no email");
        }
        Map<String, Object> body = Map.of("email", user.email(), "password", currentPassword);
        try {
            authClient.post()
                    .uri(SIGNIN_PATH)
                    .body(body)
                    .retrieve()
                    .toBodilessEntity();
            return true;
        } catch (RestClientResponseException e) {
            HttpStatusCode status = e.getStatusCode();
            if (status.is4xxClientError()) {
                log.warn("User {} provided invalid current password", oid);
                return false;
            }
            log.error("Error verifying Supabase user password {}: {} {}", oid, status, e.getResponseBodyAsString(), e);
            throw new IdentityProviderException("Error during identity provider password verification", e);
        }
    }

    @Override
    public void changePassword(UUID oid, String newPassword) {
        Map<String, Object> body = Map.of("password", newPassword);
        try {
            adminClient.put()
                    .uri(ADMIN_USER_PATH, oid.toString())
                    .body(body)
                    .retrieve()
                    .toBodilessEntity();
            log.info("Supabase user {} password reset", oid);
        } catch (RestClientResponseException e) {
            log.error("Error resetting Supabase user password {}: {} {}", oid, e.getStatusCode(), e.getResponseBodyAsString(), e);
            throw new IdentityProviderException("Error during identity provider password reset", e);
        }
    }

    @Override
    public void deleteUser(UUID oid) {
        deleteUser(oid.toString());
    }

    @Override
    public void deleteUser(String oid) {
        try {
            adminClient.delete()
                    .uri(ADMIN_USER_PATH, oid)
                    .retrieve()
                    .toBodilessEntity();
            log.info("Supabase user {} deleted", oid);
        } catch (RestClientResponseException e) {
            if (e.getStatusCode().value() == 404) {
                log.warn("Supabase user {} not found while deleting (already gone)", oid);
                return;
            }
            log.error("Error deleting Supabase user {}: {} {}", oid, e.getStatusCode(), e.getResponseBodyAsString(), e);
            throw new IdentityProviderException("Error during identity provider user deletion", e);
        }
    }

    private SupabaseUserResponse getUser(UUID oid) {
        try {
            SupabaseUserResponse response = adminClient.get()
                    .uri(ADMIN_USER_PATH, oid.toString())
                    .retrieve()
                    .body(SupabaseUserResponse.class);
            if (response == null) {
                throw new IdentityProviderException("Supabase returned no user for oid " + oid);
            }
            return response;
        } catch (RestClientResponseException e) {
            log.error("Error fetching Supabase user {}: {} {}", oid, e.getStatusCode(), e.getResponseBodyAsString(), e);
            throw new IdentityProviderException("Error fetching identity provider user", e);
        }
    }
}
