package io.hearstcorporation.atelier.model.inventory.alloy;

import io.hearstcorporation.atelier.model.VersionModel;
import io.hearstcorporation.atelier.model.administration.Supplier;
import io.hearstcorporation.atelier.model.file.AtelierFile;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Generated;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "alloy_purchase")
public class AlloyPurchase extends VersionModel {

    @Column(name = "balance_date", nullable = false)
    private LocalDate balanceDate;

    @Column(name = "price_gram", nullable = false, precision = 13, scale = 3)
    private BigDecimal priceGram;

    @Column(name = "batch_weight", nullable = false, precision = 11, scale = 5)
    private BigDecimal batchWeight;

    @Column(name = "remaining_weight", nullable = false, precision = 11, scale = 5)
    private BigDecimal remainingWeight;

    @Generated
    @Column(name = "batch_price", nullable = false, insertable = false, updatable = false)
    private BigDecimal batchPrice;

    @Generated
    @Column(name = "remaining_price", nullable = false, insertable = false, updatable = false)
    private BigDecimal remainingPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "alloy_id", nullable = false)
    private Alloy alloy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id", nullable = false)
    private Supplier supplier;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "atelier_file_id")
    private AtelierFile invoice;
}
