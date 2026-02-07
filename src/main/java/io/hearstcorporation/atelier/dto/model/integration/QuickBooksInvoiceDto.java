package io.hearstcorporation.atelier.dto.model.integration;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class QuickBooksInvoiceDto {
    private String id;
    private String docNumber;
    private LocalDate txnDate;
    private LocalDate dueDate;
    private String customerRef;
    private String customerName;
    private BigDecimal totalAmt;
    private BigDecimal balance;
    private String currencyRef;
    private String status;
    private List<QuickBooksLineItemDto> lines;

    @Data
    @Builder
    public static class QuickBooksLineItemDto {
        private String id;
        private String description;
        private BigDecimal amount;
        private BigDecimal qty;
        private BigDecimal unitPrice;
        private String itemRef;
    }
}

