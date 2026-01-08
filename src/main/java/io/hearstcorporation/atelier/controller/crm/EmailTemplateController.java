package io.hearstcorporation.atelier.controller.crm;

import io.hearstcorporation.atelier.dto.model.crm.EmailTemplateDto;
import io.hearstcorporation.atelier.dto.model.crm.EmailTemplateRequestDto;
import io.hearstcorporation.atelier.service.crm.EmailTemplateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static io.hearstcorporation.atelier.controller.crm.EmailTemplateController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class EmailTemplateController {

    public static final String BASE_URL = "/api/v1/crm/templates";
    public static final String TEMPLATE_ID = "/{templateId}";

    private final EmailTemplateService emailTemplateService;

    @PostMapping
    public EmailTemplateDto createTemplate(@RequestBody @Valid EmailTemplateRequestDto requestDto) {
        return emailTemplateService.createTemplate(requestDto);
    }

    @PutMapping(TEMPLATE_ID)
    public EmailTemplateDto updateTemplate(@PathVariable Long templateId,
                                            @RequestBody @Valid EmailTemplateRequestDto requestDto) {
        return emailTemplateService.updateTemplate(templateId, requestDto);
    }

    @GetMapping
    public List<EmailTemplateDto> getAllTemplates() {
        return emailTemplateService.getAllTemplates();
    }

    @GetMapping(TEMPLATE_ID)
    public EmailTemplateDto getTemplate(@PathVariable Long templateId) {
        return emailTemplateService.getTemplateDto(templateId);
    }

    @DeleteMapping(TEMPLATE_ID)
    public void deleteTemplate(@PathVariable Long templateId) {
        emailTemplateService.deleteTemplate(templateId);
    }
}

