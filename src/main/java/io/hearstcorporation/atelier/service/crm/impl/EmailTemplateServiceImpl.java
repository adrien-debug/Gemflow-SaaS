package io.hearstcorporation.atelier.service.crm.impl;

import io.hearstcorporation.atelier.config.tenant.TenantContext;
import io.hearstcorporation.atelier.dto.mapper.crm.EmailTemplateMapper;
import io.hearstcorporation.atelier.dto.model.crm.EmailTemplateDto;
import io.hearstcorporation.atelier.dto.model.crm.EmailTemplateRequestDto;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.crm.EmailTemplate;
import io.hearstcorporation.atelier.repository.crm.EmailTemplateRepository;
import io.hearstcorporation.atelier.service.crm.EmailTemplateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmailTemplateServiceImpl implements EmailTemplateService {

    private final EmailTemplateRepository emailTemplateRepository;

    @Override
    @Transactional
    public EmailTemplateDto createTemplate(EmailTemplateRequestDto requestDto) {
        Long tenantId = TenantContext.getTenantId();
        EmailTemplate template = EmailTemplateMapper.toEntity(requestDto, tenantId);
        template = emailTemplateRepository.save(template);
        return EmailTemplateMapper.toDto(template);
    }

    @Override
    @Transactional
    public EmailTemplateDto updateTemplate(Long templateId, EmailTemplateRequestDto requestDto) {
        EmailTemplate template = getTemplate(templateId);
        EmailTemplateMapper.updateEntity(template, requestDto);
        template = emailTemplateRepository.save(template);
        return EmailTemplateMapper.toDto(template);
    }

    @Override
    public EmailTemplateDto getTemplateDto(Long templateId) {
        return EmailTemplateMapper.toDto(getTemplate(templateId));
    }

    @Override
    public List<EmailTemplateDto> getAllTemplates() {
        Long tenantId = TenantContext.getTenantId();
        return emailTemplateRepository.findByTenantIdOrderByNameAsc(tenantId)
                .stream()
                .map(EmailTemplateMapper::toDto)
                .toList();
    }

    @Override
    @Transactional
    public void deleteTemplate(Long templateId) {
        EmailTemplate template = getTemplate(templateId);
        emailTemplateRepository.delete(template);
    }

    private EmailTemplate getTemplate(Long templateId) {
        return emailTemplateRepository.findById(templateId)
                .orElseThrow(() -> new NotFoundException("Email template not found by id: " + templateId));
    }
}

