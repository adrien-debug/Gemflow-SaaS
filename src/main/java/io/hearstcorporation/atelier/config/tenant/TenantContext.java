package io.hearstcorporation.atelier.config.tenant;

import lombok.extern.slf4j.Slf4j;

/**
 * Thread-local storage for current tenant ID.
 * Used to filter queries automatically by tenant in multi-tenant architecture.
 */
@Slf4j
public class TenantContext {

    private static final ThreadLocal<Long> CURRENT_TENANT = new ThreadLocal<>();

    /**
     * Set the current tenant ID for this thread
     * @param tenantId the tenant ID
     */
    public static void setTenantId(Long tenantId) {
        if (tenantId == null) {
            log.warn("Attempting to set null tenant ID - this may cause data isolation issues");
        }
        CURRENT_TENANT.set(tenantId);
        log.debug("Tenant context set to: {}", tenantId);
    }

    /**
     * Get the current tenant ID for this thread
     * @return the tenant ID, or null if not set
     */
    public static Long getTenantId() {
        return CURRENT_TENANT.get();
    }

    /**
     * Clear the current tenant ID from this thread
     * Should be called at the end of each request to prevent memory leaks
     */
    public static void clear() {
        Long tenantId = CURRENT_TENANT.get();
        CURRENT_TENANT.remove();
        log.debug("Tenant context cleared (was: {})", tenantId);
    }

    /**
     * Check if tenant context is set
     * @return true if tenant ID is set, false otherwise
     */
    public static boolean isSet() {
        return CURRENT_TENANT.get() != null;
    }
}

