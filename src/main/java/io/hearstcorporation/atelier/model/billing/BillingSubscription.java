package io.hearstcorporation.atelier.model.billing;

import io.hearstcorporation.atelier.model.BaseModel;
import io.hearstcorporation.atelier.model.Tenant;
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
@Table(name = "billing_subscription")
public class BillingSubscription extends BaseModel implements TenantAware {

    @Column(name = "tenant_id", nullable = false)
    private Long tenantId;

    @Column(name = "stripe_customer_id", length = 128)
    private String stripeCustomerId;

    @Column(name = "stripe_subscription_id", length = 128)
    private String stripeSubscriptionId;

    @Enumerated(EnumType.STRING)
    @Column(name = "plan", length = 32)
    private Tenant.TenantPlan plan;

    @Column(name = "status", length = 32)
    private String status;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}


