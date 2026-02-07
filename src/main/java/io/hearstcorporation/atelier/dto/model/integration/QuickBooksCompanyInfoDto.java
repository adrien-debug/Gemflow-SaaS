package io.hearstcorporation.atelier.dto.model.integration;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuickBooksCompanyInfoDto {
    private String companyName;
    private String legalName;
    private String country;
    private String email;
    private String companyAddr;
    private String fiscalYearStartMonth;
}

