package io.hearstcorporation.atelier.dto.model.integration;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class QuickBooksItemDto {
    private String id;
    private String name;
    private String description;
    private String type;
    private BigDecimal unitPrice;
    private BigDecimal qtyOnHand;
    private boolean active;
    private String incomeAccountRef;
    private String expenseAccountRef;
}

