package io.hearstcorporation.atelier.dto.model.integration;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuickBooksCustomerDto {
    private String id;
    private String displayName;
    private String companyName;
    private String givenName;
    private String familyName;
    private String primaryEmailAddr;
    private String primaryPhone;
    private String balance;
    private boolean active;
}

