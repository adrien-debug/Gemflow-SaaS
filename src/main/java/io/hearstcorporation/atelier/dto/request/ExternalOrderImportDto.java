package io.hearstcorporation.atelier.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExternalOrderImportDto {
    @NotBlank(message = "External order ID is required")
    private String externalOrderId;

    @NotBlank(message = "Source is required")
    private String source; // e.g., "supplier_name", "api_name"

    @NotBlank(message = "Order name is required")
    private String name;

    private String description;

    @NotNull(message = "Client ID is required")
    private Long clientId;

    private Long categoryId;
    
    private Long collectionId;

    private BigDecimal estimatedCost;

    private LocalDate dueDate;

    private Map<String, Object> metadata; // Additional data from external source
}
