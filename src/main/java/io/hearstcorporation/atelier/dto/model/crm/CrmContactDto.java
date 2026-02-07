package io.hearstcorporation.atelier.dto.model.crm;

import lombok.Builder;
import lombok.Getter;

import java.time.Instant;

@Getter
@Builder
public class CrmContactDto {
    private Long id;
    private Long clientId;
    private String clientName;
    private String email;
    private String firstName;
    private String lastName;
    private String fullName;
    private String phone;
    private String company;
    private String notes;
    private String tags;
    private Instant createdAt;
    private Instant updatedAt;
}

