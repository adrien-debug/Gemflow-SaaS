package io.hearstcorporation.atelier.dto.model.integration;

import io.hearstcorporation.atelier.model.integration.AccountingProvider;
import io.hearstcorporation.atelier.model.integration.IntegrationStatus;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
public class AccountingIntegrationDto {
    private Long id;
    private AccountingProvider provider;
    private String realmId;
    private IntegrationStatus status;
    private Instant connectedAt;
    private Instant lastSyncAt;
    private Instant tokenExpiresAt;
    private boolean tokenExpired;
}

