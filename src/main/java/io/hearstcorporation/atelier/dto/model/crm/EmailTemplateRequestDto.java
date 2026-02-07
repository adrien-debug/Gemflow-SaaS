package io.hearstcorporation.atelier.dto.model.crm;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailTemplateRequestDto {
    
    @NotBlank(message = "Template name is required")
    @Size(max = 128)
    private String name;
    
    @NotBlank(message = "Subject is required")
    @Size(max = 512)
    private String subject;
    
    @NotBlank(message = "Body is required")
    private String body;
    
    @Size(max = 512)
    private String variables;
}

