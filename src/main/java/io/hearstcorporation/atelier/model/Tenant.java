package io.hearstcorporation.atelier.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

/**
 * Tenant entity for multi-tenant architecture.
 * Each tenant represents an organization using the platform.
 */
@Getter
@Setter
@Entity
@Table(name = "tenant")
public class Tenant extends BaseModel {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "subdomain", nullable = false, unique = true, length = 63)
    private String subdomain;

    @Enumerated(EnumType.STRING)
    @Column(name = "plan", nullable = false, length = 32)
    private TenantPlan plan;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 24)
    private TenantStatus status = TenantStatus.ACTIVE;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    /**
     * Tenant subscription plans
     */
    public enum TenantPlan {
        BASIC,
        PRO,
        ENTERPRISE
    }

    /**
     * Tenant status
     */
    public enum TenantStatus {
        ACTIVE,
        SUSPENDED,
        CANCELLED
    }
}

