package io.hearstcorporation.atelier.dto.mapper.crm;

import io.hearstcorporation.atelier.dto.model.crm.EmailTemplateDto;
import io.hearstcorporation.atelier.dto.model.crm.EmailTemplateRequestDto;
import io.hearstcorporation.atelier.model.crm.EmailTemplate;
import lombok.experimental.UtilityClass;

import java.time.Instant;

@UtilityClass
public class EmailTemplateMapper {

    public static EmailTemplateDto toDto(EmailTemplate template) {
        return EmailTemplateDto.builder()
                .id(template.getId())
                .name(template.getName())
                .subject(template.getSubject())
                .body(template.getBody())
                .variables(template.getVariables())
                .createdAt(template.getCreatedAt())
                .updatedAt(template.getUpdatedAt())
                .build();
    }

    public static EmailTemplate toEntity(EmailTemplateRequestDto dto, Long tenantId) {
        EmailTemplate template = new EmailTemplate();
        template.setTenantId(tenantId);
        template.setName(dto.getName());
        template.setSubject(dto.getSubject());
        template.setBody(dto.getBody());
        template.setVariables(dto.getVariables());
        template.setCreatedAt(Instant.now());
        template.setUpdatedAt(Instant.now());
        return template;
    }

    public static void updateEntity(EmailTemplate template, EmailTemplateRequestDto dto) {
        template.setName(dto.getName());
        template.setSubject(dto.getSubject());
        template.setBody(dto.getBody());
        template.setVariables(dto.getVariables());
        template.setUpdatedAt(Instant.now());
    }
}

