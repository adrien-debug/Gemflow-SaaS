package io.hearstcorporation.atelier.dto.model.crm;

import lombok.Builder;
import lombok.Getter;

import java.time.Instant;

@Getter
@Builder
public class EmailTemplateDto {
    private Long id;
    private String name;
    private String subject;
    private String body;
    private String variables;
    private Instant createdAt;
    private Instant updatedAt;
}

