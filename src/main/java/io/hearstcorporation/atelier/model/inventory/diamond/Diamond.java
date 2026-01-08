package io.hearstcorporation.atelier.model.inventory.diamond;

import io.hearstcorporation.atelier.model.BaseModel;
import io.hearstcorporation.atelier.model.administration.Supplier;
import io.hearstcorporation.atelier.model.file.AtelierFile;
import io.hearstcorporation.atelier.model.setting.DiamondShape;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "diamond")
public class Diamond extends BaseModel {

    @Enumerated(EnumType.STRING)
    @Column(name = "diamond_type", length = 16, nullable = false)
    private DiamondType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "diamond_colour_type", length = 8, nullable = false)
    private DiamondColourType colourType;

    @Column(name = "parcel_name", nullable = false, length = 256)
    private String parcelName;

    @Column(name = "size_from", nullable = false, precision = 4, scale = 2)
    private BigDecimal sizeFrom;

    @Column(name = "size_to", nullable = false, precision = 4, scale = 2)
    private BigDecimal sizeTo;

    @Generated
    @Column(name = "size_name", nullable = false, insertable = false, updatable = false, length = 16)
    private String sizeName;

    @Enumerated(EnumType.STRING)
    @Column(name = "quality_type", nullable = false)
    private DiamondQualityType qualityType;

    @Column(name = "stone_carat", nullable = false, precision = 8, scale = 5)
    private BigDecimal stoneCarat;

    @Generated
    @Column(name = "stone_grams", nullable = false, insertable = false, updatable = false)
    private BigDecimal stoneGrams;

    @Column(name = "stone_price", nullable = false, precision = 13, scale = 3)
    private BigDecimal stonePrice;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Generated
    @Column(name = "carat_left", nullable = false, insertable = false, updatable = false)
    private BigDecimal caratLeft;

    @Generated
    @Column(name = "grams_left", nullable = false, insertable = false, updatable = false)
    private BigDecimal gramsLeft;

    @Generated
    @Column(name = "total_price", nullable = false, insertable = false, updatable = false)
    private BigDecimal totalPrice;

    @Column(name = "invoice_date")
    private LocalDate invoiceDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diamond_shape_id", nullable = false)
    private DiamondShape diamondShape;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id", nullable = false)
    private Supplier supplier;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "atelier_file_id")
    private AtelierFile invoice;
}
