package io.hearstcorporation.atelier.repository.billing;

import io.hearstcorporation.atelier.model.billing.BillingSubscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BillingSubscriptionRepository extends JpaRepository<BillingSubscription, Long> {

    Optional<BillingSubscription> findByTenantId(Long tenantId);

    Optional<BillingSubscription> findByStripeSubscriptionId(String stripeSubscriptionId);
}


