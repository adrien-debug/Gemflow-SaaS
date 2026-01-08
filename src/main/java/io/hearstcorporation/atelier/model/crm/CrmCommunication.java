package io.hearstcorporation.atelier.model.crm;

import io.hearstcorporation.atelier.model.BaseModel;
import io.hearstcorporation.atelier.model.TenantAware;
import io.hearstcorporation.atelier.model.administration.Client;
import io.hearstcorporation.atelier.model.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "crm_communication")
public class CrmCommunication extends BaseModel implements TenantAware {

    @Column(name = "tenant_id", nullable = false)
    private Long tenantId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contact_id")
    private CrmContact contact;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private Client client;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false, length = 32)
    private CommunicationType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "direction", length = 16)
    private CommunicationDirection direction;

    @Column(name = "subject", length = 512)
    private String subject;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "sent_at")
    private Instant sentAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;
}

