package io.hearstcorporation.atelier.config.tenant;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Filter to extract and set tenant ID from request.
 * Currently uses default tenant (ID=1) for development.
 * 
 * Future implementation will extract tenant from:
 * - JWT token claims
 * - Subdomain (e.g., acme.app.com -> tenant "acme")
 * - Custom header (X-Tenant-Id)
 */
@Slf4j
@Component
@Order(1)
public class TenantFilter extends OncePerRequestFilter {

    private static final Long DEFAULT_TENANT_ID = 1L;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            Long tenantId = extractTenantId(request);
            TenantContext.setTenantId(tenantId);
            log.debug("Request {} - Tenant ID set to: {}", request.getRequestURI(), tenantId);
            
            filterChain.doFilter(request, response);
        } finally {
            // Always clear tenant context to prevent memory leaks
            TenantContext.clear();
        }
    }

    /**
     * Extract tenant ID from request.
     * 
     * Current implementation: Returns default tenant (ID=1) for development.
     * 
     * TODO Phase 1.3: Implement real extraction logic:
     * 1. Check JWT token for tenant claim
     * 2. Check subdomain (e.g., acme.app.com)
     * 3. Check X-Tenant-Id header
     * 4. Fallback to default if none found
     * 
     * @param request the HTTP request
     * @return the tenant ID
     */
    private Long extractTenantId(HttpServletRequest request) {
        // TODO: Implement real tenant extraction
        // For now, use default tenant for all requests
        
        // Example future implementation:
        // String subdomain = extractSubdomain(request);
        // if (subdomain != null) {
        //     return tenantRepository.findBySubdomain(subdomain)
        //         .map(Tenant::getId)
        //         .orElse(DEFAULT_TENANT_ID);
        // }
        
        return DEFAULT_TENANT_ID;
    }

    /**
     * Extract subdomain from request hostname.
     * Example: acme.app.com -> "acme"
     * 
     * @param request the HTTP request
     * @return the subdomain, or null if not found
     */
    @SuppressWarnings("unused")
    private String extractSubdomain(HttpServletRequest request) {
        String host = request.getServerName();
        if (host == null || host.equals("localhost")) {
            return null;
        }
        
        String[] parts = host.split("\\.");
        if (parts.length >= 3) {
            return parts[0]; // First part is subdomain
        }
        
        return null;
    }
}

