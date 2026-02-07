package io.hearstcorporation.atelier.model.inventory.puremetal;

import io.hearstcorporation.atelier.model.VersionModel;
import io.hearstcorporation.atelier.model.administration.Supplier;
import io.hearstcorporation.atelier.model.file.AtelierFile;
import io.hearstcorporation.atelier.model.setting.PriceMetalName;
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
@Table(name = "pure_metal_purchase")
public class PureMetalPurchase extends VersionModel {

    @Column(name = "batch_weight", nullable = false, precision = 11, scale = 5)
    private BigDecimal batchWeight;

    @Column(name = "remaining_weight", nullable = false, precision = 11, scale = 5)
    private BigDecimal remainingWeight;

    @Column(name = "bar_number", length = 32)
    private String barNumber;

    @Column(name = "coc", length = 32)
    private String coc;

    @Column(name = "balance_date", nullable = false)
    private LocalDate balanceDate;

    @Column(name = "price_gram", nullable = false, precision = 13, scale = 3)
    private BigDecimal priceGram;

    @Generated
    @Column(name = "batch_price", nullable = false, insertable = false, updatable = false)
    private BigDecimal batchPrice;

    @Generated
    @Column(name = "remaining_price", nullable = false, insertable = false, updatable = false)
    private BigDecimal remainingPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "price_metal_name_id", nullable = false, updatable = false)
    private PriceMetalName priceMetalName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id", nullable = false)
    private Supplier supplier;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "atelier_file_id")
    private AtelierFile invoice;
}
