package io.hearstcorporation.atelier.repository.integration;

import io.hearstcorporation.atelier.model.integration.AccountingIntegration;
import io.hearstcorporation.atelier.model.integration.AccountingProvider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountingIntegrationRepository extends JpaRepository<AccountingIntegration, Long> {

    Optional<AccountingIntegration> findByProviderAndTenantId(AccountingProvider provider, Long tenantId);
    
    Optional<AccountingIntegration> findByProvider(AccountingProvider provider);
    
    Optional<AccountingIntegration> findByRealmId(String realmId);
    
    List<AccountingIntegration> findByTenantId(Long tenantId);
    
    boolean existsByProviderAndTenantId(AccountingProvider provider, Long tenantId);
    
    boolean existsByProvider(AccountingProvider provider);
}

