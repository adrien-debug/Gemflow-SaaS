package io.hearstcorporation.atelier.model.setting;

import io.hearstcorporation.atelier.model.BaseModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "currency")
public class Currency extends BaseModel {

    @Column(name = "symbol", nullable = false, length = 10)
    private String symbol;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "decimal_digits", nullable = false)
    private Integer decimalDigits;

    @Column(name = "rounding", nullable = false, precision = 2, scale = 2)
    private BigDecimal rounding;

    @Column(name = "code", nullable = false, length = 10)
    private String code;

    @Column(name = "name_plural", nullable = false, length = 100)
    private String namePlural;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;
}
