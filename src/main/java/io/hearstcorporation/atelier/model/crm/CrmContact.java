package io.hearstcorporation.atelier.model.crm;

import io.hearstcorporation.atelier.model.BaseModel;
import io.hearstcorporation.atelier.model.TenantAware;
import io.hearstcorporation.atelier.model.administration.Client;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "crm_contact")
public class CrmContact extends BaseModel implements TenantAware {

    @Column(name = "tenant_id", nullable = false)
    private Long tenantId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "client_id")
    private Client client;

    @Column(name = "email", nullable = false, length = 255)
    private String email;

    @Column(name = "first_name", length = 128)
    private String firstName;

    @Column(name = "last_name", length = 128)
    private String lastName;

    @Column(name = "phone", length = 32)
    private String phone;

    @Column(name = "company", length = 256)
    private String company;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @Column(name = "tags", length = 512)
    private String tags;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    public String getFullName() {
        if (firstName == null && lastName == null) {
            return email;
        }
        return (firstName != null ? firstName : "") + " " + (lastName != null ? lastName : "");
    }
}

