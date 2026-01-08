package io.hearstcorporation.atelier.dto.model.crm;

import io.hearstcorporation.atelier.model.crm.CommunicationDirection;
import io.hearstcorporation.atelier.model.crm.CommunicationType;
import lombok.Builder;
import lombok.Getter;

import java.time.Instant;

@Getter
@Builder
public class CrmCommunicationDto {
    private Long id;
    private Long contactId;
    private String contactName;
    private Long clientId;
    private String clientName;
    private CommunicationType type;
    private CommunicationDirection direction;
    private String subject;
    private String content;
    private Instant sentAt;
    private Long createdById;
    private String createdByName;
    private Instant createdAt;
}

