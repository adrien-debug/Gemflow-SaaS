package io.hearstcorporation.atelier.dto.model.setting;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class CurrencyDto {

    private Long id;
    private String symbol;
    private String name;
    private Integer decimalDigits;
    private BigDecimal rounding;
    private String code;
    private String namePlural;
}
