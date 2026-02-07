package io.hearstcorporation.atelier.dto.model.integration;

import io.hearstcorporation.atelier.model.integration.SyncEntityType;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
@Builder
public class QuickBooksSyncResultDto {
    private SyncEntityType entityType;
    private int totalProcessed;
    private int successCount;
    private int failureCount;
    private List<String> errors;
    private Instant syncedAt;
}

