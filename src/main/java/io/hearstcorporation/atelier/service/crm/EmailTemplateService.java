package io.hearstcorporation.atelier.service.crm;

import io.hearstcorporation.atelier.dto.model.crm.EmailTemplateDto;
import io.hearstcorporation.atelier.dto.model.crm.EmailTemplateRequestDto;

import java.util.List;

public interface EmailTemplateService {

    EmailTemplateDto createTemplate(EmailTemplateRequestDto requestDto);

    EmailTemplateDto updateTemplate(Long templateId, EmailTemplateRequestDto requestDto);

    EmailTemplateDto getTemplateDto(Long templateId);

    List<EmailTemplateDto> getAllTemplates();

    void deleteTemplate(Long templateId);
}

