package io.hearstcorporation.atelier.dto.mapper.crm;

import io.hearstcorporation.atelier.dto.model.crm.CrmCommunicationDto;
import io.hearstcorporation.atelier.dto.model.crm.CrmCommunicationRequestDto;
import io.hearstcorporation.atelier.model.administration.Client;
import io.hearstcorporation.atelier.model.crm.CrmCommunication;
import io.hearstcorporation.atelier.model.crm.CrmContact;
import io.hearstcorporation.atelier.model.user.User;
import lombok.experimental.UtilityClass;

import java.time.Instant;

@UtilityClass
public class CrmCommunicationMapper {

    public static CrmCommunicationDto toDto(CrmCommunication comm) {
        return CrmCommunicationDto.builder()
                .id(comm.getId())
                .contactId(comm.getContact() != null ? comm.getContact().getId() : null)
                .contactName(comm.getContact() != null ? comm.getContact().getFullName() : null)
                .clientId(comm.getClient() != null ? comm.getClient().getId() : null)
                .clientName(comm.getClient() != null ? comm.getClient().getName() : null)
                .type(comm.getType())
                .direction(comm.getDirection())
                .subject(comm.getSubject())
                .content(comm.getContent())
                .sentAt(comm.getSentAt())
                .createdById(comm.getCreatedBy() != null ? comm.getCreatedBy().getId() : null)
                .createdByName(comm.getCreatedBy() != null ? 
                        comm.getCreatedBy().getFirstName() + " " + comm.getCreatedBy().getLastName() : null)
                .createdAt(comm.getCreatedAt())
                .build();
    }

    public static CrmCommunication toEntity(CrmCommunicationRequestDto dto, Long tenantId, 
                                             CrmContact contact, Client client, User createdBy) {
        CrmCommunication comm = new CrmCommunication();
        comm.setTenantId(tenantId);
        comm.setContact(contact);
        comm.setClient(client);
        comm.setType(dto.getType());
        comm.setDirection(dto.getDirection());
        comm.setSubject(dto.getSubject());
        comm.setContent(dto.getContent());
        comm.setCreatedBy(createdBy);
        comm.setCreatedAt(Instant.now());
        return comm;
    }
}

