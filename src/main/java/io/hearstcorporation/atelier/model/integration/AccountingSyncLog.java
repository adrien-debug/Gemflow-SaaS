package io.hearstcorporation.atelier.model.integration;

import io.hearstcorporation.atelier.model.BaseModel;
import io.hearstcorporation.atelier.model.TenantAware;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "accounting_sync_log")
public class AccountingSyncLog extends BaseModel implements TenantAware {

    @Column(name = "tenant_id")
    private Long tenantId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "integration_id", nullable = false)
    private AccountingIntegration integration;

    @Enumerated(EnumType.STRING)
    @Column(name = "entity_type", nullable = false, length = 32)
    private SyncEntityType entityType;

    @Column(name = "entity_id")
    private Long entityId;

    @Column(name = "external_id", length = 64)
    private String externalId;

    @Enumerated(EnumType.STRING)
    @Column(name = "action", nullable = false, length = 16)
    private SyncAction action;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 16)
    private SyncStatus status;

    @Column(name = "error_message", columnDefinition = "TEXT")
    private String errorMessage;

    @Column(name = "request_payload", columnDefinition = "TEXT")
    private String requestPayload;

    @Column(name = "response_payload", columnDefinition = "TEXT")
    private String responsePayload;

    @Column(name = "synced_at", nullable = false)
    private Instant syncedAt;

    public static AccountingSyncLog createSuccess(AccountingIntegration integration, 
                                                   SyncEntityType entityType, 
                                                   Long entityId, 
                                                   String externalId, 
                                                   SyncAction action) {
        AccountingSyncLog log = new AccountingSyncLog();
        log.setIntegration(integration);
        log.setTenantId(integration.getTenantId());
        log.setEntityType(entityType);
        log.setEntityId(entityId);
        log.setExternalId(externalId);
        log.setAction(action);
        log.setStatus(SyncStatus.SUCCESS);
        log.setSyncedAt(Instant.now());
        return log;
    }

    public static AccountingSyncLog createFailure(AccountingIntegration integration, 
                                                   SyncEntityType entityType, 
                                                   Long entityId, 
                                                   SyncAction action, 
                                                   String errorMessage) {
        AccountingSyncLog log = new AccountingSyncLog();
        log.setIntegration(integration);
        log.setTenantId(integration.getTenantId());
        log.setEntityType(entityType);
        log.setEntityId(entityId);
        log.setAction(action);
        log.setStatus(SyncStatus.FAILED);
        log.setErrorMessage(errorMessage);
        log.setSyncedAt(Instant.now());
        return log;
    }
}

