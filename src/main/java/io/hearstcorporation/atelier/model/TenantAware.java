package io.hearstcorporation.atelier.model;

/**
 * Interface for entities that belong to a tenant.
 * Provides a contract for tenant-aware entities.
 */
public interface TenantAware {
    
    /**
     * Get the tenant ID for this entity
     * @return the tenant ID
     */
    Long getTenantId();
    
    /**
     * Set the tenant ID for this entity
     * @param tenantId the tenant ID
     */
    void setTenantId(Long tenantId);
}

