package io.hearstcorporation.atelier.dto.model.integration;

import io.hearstcorporation.atelier.model.integration.SyncAction;
import io.hearstcorporation.atelier.model.integration.SyncEntityType;
import io.hearstcorporation.atelier.model.integration.SyncStatus;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
public class AccountingSyncLogDto {
    private Long id;
    private SyncEntityType entityType;
    private Long entityId;
    private String externalId;
    private SyncAction action;
    private SyncStatus status;
    private String errorMessage;
    private Instant syncedAt;
}

