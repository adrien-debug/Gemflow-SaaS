package io.hearstcorporation.atelier.model.integration;

import io.hearstcorporation.atelier.model.BaseModel;
import io.hearstcorporation.atelier.model.TenantAware;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "accounting_integration")
public class AccountingIntegration extends BaseModel implements TenantAware {

    @Column(name = "tenant_id")
    private Long tenantId;

    @Enumerated(EnumType.STRING)
    @Column(name = "provider", nullable = false, length = 32)
    private AccountingProvider provider;

    @Column(name = "access_token", columnDefinition = "TEXT")
    private String accessToken;

    @Column(name = "refresh_token", columnDefinition = "TEXT")
    private String refreshToken;

    @Column(name = "realm_id", length = 64)
    private String realmId;

    @Column(name = "token_expires_at")
    private Instant tokenExpiresAt;

    @Column(name = "connected_at")
    private Instant connectedAt;

    @Column(name = "last_sync_at")
    private Instant lastSyncAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 24)
    private IntegrationStatus status = IntegrationStatus.DISCONNECTED;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    public boolean isTokenExpired() {
        return tokenExpiresAt != null && Instant.now().isAfter(tokenExpiresAt);
    }

    public boolean isConnected() {
        return status == IntegrationStatus.CONNECTED && !isTokenExpired();
    }
}

