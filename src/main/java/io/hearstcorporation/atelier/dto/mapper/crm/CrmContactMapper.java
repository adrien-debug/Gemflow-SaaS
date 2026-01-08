package io.hearstcorporation.atelier.dto.mapper.crm;

import io.hearstcorporation.atelier.dto.model.crm.CrmContactDto;
import io.hearstcorporation.atelier.dto.model.crm.CrmContactRequestDto;
import io.hearstcorporation.atelier.model.administration.Client;
import io.hearstcorporation.atelier.model.crm.CrmContact;
import lombok.experimental.UtilityClass;

import java.time.Instant;

@UtilityClass
public class CrmContactMapper {

    public static CrmContactDto toDto(CrmContact contact) {
        return CrmContactDto.builder()
                .id(contact.getId())
                .clientId(contact.getClient() != null ? contact.getClient().getId() : null)
                .clientName(contact.getClient() != null ? contact.getClient().getName() : null)
                .email(contact.getEmail())
                .firstName(contact.getFirstName())
                .lastName(contact.getLastName())
                .fullName(contact.getFullName())
                .phone(contact.getPhone())
                .company(contact.getCompany())
                .notes(contact.getNotes())
                .tags(contact.getTags())
                .createdAt(contact.getCreatedAt())
                .updatedAt(contact.getUpdatedAt())
                .build();
    }

    public static CrmContact toEntity(CrmContactRequestDto dto, Long tenantId, Client client) {
        CrmContact contact = new CrmContact();
        contact.setTenantId(tenantId);
        contact.setClient(client);
        contact.setEmail(dto.getEmail());
        contact.setFirstName(dto.getFirstName());
        contact.setLastName(dto.getLastName());
        contact.setPhone(dto.getPhone());
        contact.setCompany(dto.getCompany());
        contact.setNotes(dto.getNotes());
        contact.setTags(dto.getTags());
        contact.setCreatedAt(Instant.now());
        contact.setUpdatedAt(Instant.now());
        return contact;
    }

    public static void updateEntity(CrmContact contact, CrmContactRequestDto dto, Client client) {
        contact.setClient(client);
        contact.setEmail(dto.getEmail());
        contact.setFirstName(dto.getFirstName());
        contact.setLastName(dto.getLastName());
        contact.setPhone(dto.getPhone());
        contact.setCompany(dto.getCompany());
        contact.setNotes(dto.getNotes());
        contact.setTags(dto.getTags());
        contact.setUpdatedAt(Instant.now());
    }
}

