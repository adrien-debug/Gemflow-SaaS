package io.hearstcorporation.atelier.model.crm;

import io.hearstcorporation.atelier.model.BaseModel;
import io.hearstcorporation.atelier.model.TenantAware;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "email_template")
public class EmailTemplate extends BaseModel implements TenantAware {

    @Column(name = "tenant_id", nullable = false)
    private Long tenantId;

    @Column(name = "name", nullable = false, length = 128)
    private String name;

    @Column(name = "subject", nullable = false, length = 512)
    private String subject;

    @Column(name = "body", nullable = false, columnDefinition = "TEXT")
    private String body;

    @Column(name = "variables", length = 512)
    private String variables;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}

