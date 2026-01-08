package io.hearstcorporation.atelier.dto.model.crm;

import io.hearstcorporation.atelier.model.crm.CommunicationDirection;
import io.hearstcorporation.atelier.model.crm.CommunicationType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CrmCommunicationRequestDto {
    
    private Long contactId;
    
    private Long clientId;
    
    @NotNull(message = "Communication type is required")
    private CommunicationType type;
    
    private CommunicationDirection direction;
    
    @Size(max = 512)
    private String subject;
    
    private String content;
}

