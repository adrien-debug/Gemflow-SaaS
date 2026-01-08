package io.hearstcorporation.atelier.dto.mapper.integration;

import io.hearstcorporation.atelier.dto.model.integration.AccountingIntegrationDto;
import io.hearstcorporation.atelier.dto.model.integration.AccountingSyncLogDto;
import io.hearstcorporation.atelier.model.integration.AccountingIntegration;
import io.hearstcorporation.atelier.model.integration.AccountingSyncLog;
import org.springframework.stereotype.Component;

@Component
public class AccountingIntegrationMapper {

    public AccountingIntegrationDto toDto(AccountingIntegration entity) {
        if (entity == null) {
            return null;
        }
        return AccountingIntegrationDto.builder()
                .id(entity.getId())
                .provider(entity.getProvider())
                .realmId(entity.getRealmId())
                .status(entity.getStatus())
                .connectedAt(entity.getConnectedAt())
                .lastSyncAt(entity.getLastSyncAt())
                .tokenExpiresAt(entity.getTokenExpiresAt())
                .tokenExpired(entity.isTokenExpired())
                .build();
    }

    public AccountingSyncLogDto toSyncLogDto(AccountingSyncLog entity) {
        if (entity == null) {
            return null;
        }
        return AccountingSyncLogDto.builder()
                .id(entity.getId())
                .entityType(entity.getEntityType())
                .entityId(entity.getEntityId())
                .externalId(entity.getExternalId())
                .action(entity.getAction())
                .status(entity.getStatus())
                .errorMessage(entity.getErrorMessage())
                .syncedAt(entity.getSyncedAt())
                .build();
    }
}

