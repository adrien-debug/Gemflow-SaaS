package io.hearstcorporation.atelier.dto.model.integration;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuickBooksDataSummaryDto {
    private QuickBooksCompanyInfoDto companyInfo;
    private int customerCount;
    private int invoiceCount;
    private int itemCount;
    private int vendorCount;
    private int accountCount;
}

