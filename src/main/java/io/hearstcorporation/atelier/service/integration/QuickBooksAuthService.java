package io.hearstcorporation.atelier.service.integration;

import io.hearstcorporation.atelier.config.quickbooks.property.QuickBooksProperties;
import io.hearstcorporation.atelier.dto.model.integration.AccountingIntegrationDto;
import io.hearstcorporation.atelier.dto.model.integration.QuickBooksAuthUrlDto;
import io.hearstcorporation.atelier.dto.model.integration.QuickBooksCallbackDto;
import io.hearstcorporation.atelier.dto.model.integration.QuickBooksTokenDto;
import io.hearstcorporation.atelier.dto.mapper.integration.AccountingIntegrationMapper;
import io.hearstcorporation.atelier.exception.ServiceException;
import io.hearstcorporation.atelier.model.integration.AccountingIntegration;
import io.hearstcorporation.atelier.model.integration.AccountingProvider;
import io.hearstcorporation.atelier.model.integration.IntegrationStatus;
import io.hearstcorporation.atelier.repository.integration.AccountingIntegrationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.Base64;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuickBooksAuthService {

    private final QuickBooksProperties properties;
    private final AccountingIntegrationRepository integrationRepository;
    private final AccountingIntegrationMapper mapper;
    
    @Qualifier("quickBooksRestTemplate")
    private final RestTemplate restTemplate;

    /**
     * Generate the QuickBooks OAuth2 authorization URL
     */
    public QuickBooksAuthUrlDto getAuthorizationUrl() {
        String state = UUID.randomUUID().toString();
        
        String authUrl = String.format(
            "%s?client_id=%s&response_type=code&scope=%s&redirect_uri=%s&state=%s",
            properties.getAuthUrl(),
            properties.getClientId(),
            properties.getScope(),
            properties.getRedirectUri(),
            state
        );
        
        return QuickBooksAuthUrlDto.builder()
                .authorizationUrl(authUrl)
                .state(state)
                .build();
    }

    /**
     * Handle the OAuth2 callback and exchange code for tokens
     */
    @Transactional
    public AccountingIntegrationDto handleCallback(QuickBooksCallbackDto callback) {
        log.info("Handling QuickBooks callback for realm: {}", callback.getRealmId());
        
        // Exchange code for tokens
        QuickBooksTokenDto tokens = exchangeCodeForTokens(callback.getCode());
        
        // Find or create integration
        AccountingIntegration integration = integrationRepository
                .findByProvider(AccountingProvider.QUICKBOOKS)
                .orElseGet(AccountingIntegration::new);
        
        integration.setProvider(AccountingProvider.QUICKBOOKS);
        integration.setAccessToken(tokens.getAccessToken());
        integration.setRefreshToken(tokens.getRefreshToken());
        integration.setRealmId(callback.getRealmId());
        integration.setTokenExpiresAt(Instant.now().plusSeconds(tokens.getExpiresIn()));
        integration.setConnectedAt(Instant.now());
        integration.setStatus(IntegrationStatus.CONNECTED);
        integration.setCreatedAt(integration.getCreatedAt() != null ? integration.getCreatedAt() : Instant.now());
        integration.setUpdatedAt(Instant.now());
        
        integration = integrationRepository.save(integration);
        log.info("QuickBooks integration connected successfully for realm: {}", callback.getRealmId());
        
        return mapper.toDto(integration);
    }

    /**
     * Refresh the access token using the refresh token
     */
    @Transactional
    public void refreshToken(AccountingIntegration integration) {
        log.info("Refreshing QuickBooks token for realm: {}", integration.getRealmId());
        
        try {
            HttpHeaders headers = createAuthHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            
            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("grant_type", "refresh_token");
            body.add("refresh_token", integration.getRefreshToken());
            
            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);
            
            ResponseEntity<QuickBooksTokenDto> response = restTemplate.exchange(
                    properties.getTokenUrl(),
                    HttpMethod.POST,
                    request,
                    QuickBooksTokenDto.class
            );
            
            QuickBooksTokenDto tokens = response.getBody();
            if (tokens != null) {
                integration.setAccessToken(tokens.getAccessToken());
                integration.setRefreshToken(tokens.getRefreshToken());
                integration.setTokenExpiresAt(Instant.now().plusSeconds(tokens.getExpiresIn()));
                integration.setStatus(IntegrationStatus.CONNECTED);
                integration.setUpdatedAt(Instant.now());
                integrationRepository.save(integration);
                log.info("QuickBooks token refreshed successfully");
            }
        } catch (RestClientException e) {
            log.error("Failed to refresh QuickBooks token: {}", e.getMessage());
            integration.setStatus(IntegrationStatus.TOKEN_EXPIRED);
            integration.setUpdatedAt(Instant.now());
            integrationRepository.save(integration);
            throw new ServiceException("Failed to refresh QuickBooks token");
        }
    }

    /**
     * Disconnect QuickBooks integration
     */
    @Transactional
    public void disconnect() {
        Optional<AccountingIntegration> integration = integrationRepository
                .findByProvider(AccountingProvider.QUICKBOOKS);
        
        integration.ifPresent(integ -> {
            integ.setAccessToken(null);
            integ.setRefreshToken(null);
            integ.setStatus(IntegrationStatus.DISCONNECTED);
            integ.setUpdatedAt(Instant.now());
            integrationRepository.save(integ);
            log.info("QuickBooks integration disconnected");
        });
    }

    /**
     * Get current integration status
     */
    public Optional<AccountingIntegrationDto> getIntegrationStatus() {
        return integrationRepository
                .findByProvider(AccountingProvider.QUICKBOOKS)
                .map(mapper::toDto);
    }

    /**
     * Get integration with valid token (refreshing if needed)
     */
    @Transactional
    public AccountingIntegration getValidIntegration() {
        AccountingIntegration integration = integrationRepository
                .findByProvider(AccountingProvider.QUICKBOOKS)
                .orElseThrow(() -> new ServiceException("QuickBooks not connected"));
        
        if (integration.getStatus() != IntegrationStatus.CONNECTED) {
            throw new ServiceException("QuickBooks integration is not active");
        }
        
        if (integration.isTokenExpired()) {
            refreshToken(integration);
        }
        
        return integration;
    }

    private QuickBooksTokenDto exchangeCodeForTokens(String code) {
        try {
            HttpHeaders headers = createAuthHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            
            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("grant_type", "authorization_code");
            body.add("code", code);
            body.add("redirect_uri", properties.getRedirectUri());
            
            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);
            
            ResponseEntity<QuickBooksTokenDto> response = restTemplate.exchange(
                    properties.getTokenUrl(),
                    HttpMethod.POST,
                    request,
                    QuickBooksTokenDto.class
            );
            
            return response.getBody();
        } catch (RestClientException e) {
            log.error("Failed to exchange code for tokens: {}", e.getMessage());
            throw new ServiceException("Failed to connect to QuickBooks: " + e.getMessage());
        }
    }

    private HttpHeaders createAuthHeaders() {
        HttpHeaders headers = new HttpHeaders();
        String credentials = properties.getClientId() + ":" + properties.getClientSecret();
        String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());
        headers.add("Authorization", "Basic " + encodedCredentials);
        return headers;
    }
}

