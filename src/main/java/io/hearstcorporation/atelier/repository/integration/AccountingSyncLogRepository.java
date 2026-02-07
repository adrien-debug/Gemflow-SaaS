package io.hearstcorporation.atelier.repository.integration;

import io.hearstcorporation.atelier.model.integration.AccountingSyncLog;
import io.hearstcorporation.atelier.model.integration.SyncEntityType;
import io.hearstcorporation.atelier.model.integration.SyncStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Repository
public interface AccountingSyncLogRepository extends JpaRepository<AccountingSyncLog, Long> {

    Page<AccountingSyncLog> findByIntegrationIdOrderBySyncedAtDesc(Long integrationId, Pageable pageable);
    
    List<AccountingSyncLog> findByIntegrationIdAndEntityTypeOrderBySyncedAtDesc(Long integrationId, SyncEntityType entityType);
    
    Optional<AccountingSyncLog> findTopByIntegrationIdAndEntityTypeAndEntityIdOrderBySyncedAtDesc(
            Long integrationId, SyncEntityType entityType, Long entityId);
    
    @Query("SELECT s FROM AccountingSyncLog s WHERE s.integration.id = :integrationId " +
           "AND s.syncedAt >= :since ORDER BY s.syncedAt DESC")
    List<AccountingSyncLog> findRecentLogs(@Param("integrationId") Long integrationId, 
                                            @Param("since") Instant since);
    
    long countByIntegrationIdAndStatus(Long integrationId, SyncStatus status);
    
    @Query("SELECT s.entityType, COUNT(s), SUM(CASE WHEN s.status = 'SUCCESS' THEN 1 ELSE 0 END) " +
           "FROM AccountingSyncLog s WHERE s.integration.id = :integrationId " +
           "GROUP BY s.entityType")
    List<Object[]> getSyncStatsByEntityType(@Param("integrationId") Long integrationId);
}

