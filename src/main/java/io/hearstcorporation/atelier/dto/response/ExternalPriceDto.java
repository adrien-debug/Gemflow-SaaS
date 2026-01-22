package io.hearstcorporation.atelier.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExternalPriceDto {
    private String metal; // GOLD, SILVER, PLATINUM, PALLADIUM
    private String unit; // gram, ounce, kilogram
    private BigDecimal price;
    private String currency;
    private LocalDateTime timestamp;
    private String source;
    private BigDecimal change24h; // Percentage change
}
