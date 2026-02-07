package io.hearstcorporation.atelier.dto.model.crm;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CrmContactRequestDto {
    
    private Long clientId;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Size(max = 255)
    private String email;
    
    @Size(max = 128)
    private String firstName;
    
    @Size(max = 128)
    private String lastName;
    
    @Size(max = 32)
    private String phone;
    
    @Size(max = 256)
    private String company;
    
    private String notes;
    
    @Size(max = 512)
    private String tags;
}

