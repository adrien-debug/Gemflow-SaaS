package io.hearstcorporation.atelier.model.inventory.gemstone;

import io.hearstcorporation.atelier.model.BaseModel;
import io.hearstcorporation.atelier.model.administration.Supplier;
import io.hearstcorporation.atelier.model.file.AtelierFile;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.setting.GemsPayment;
import io.hearstcorporation.atelier.model.setting.Location;
import io.hearstcorporation.atelier.model.user.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Generated;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "gemstone")
@EntityListeners(AuditingEntityListener.class)
public class Gemstone extends BaseModel {

    public static final BigDecimal CUSTOM_DUTY_PERCENTAGE = new BigDecimal("0.05");
    public static final BigDecimal VAT_PERCENTAGE = new BigDecimal("0.05");
    public static final BigDecimal TEN_PERCENTAGE = new BigDecimal("0.1");

    @Column(name = "gemstone_type", length = 16, nullable = false)
    private GemstoneType type;

    @Column(name = "name", nullable = false, length = 256)
    private String name;

    @Column(name = "description", length = 1500)
    private String description;

    @Column(name = "number_of_gems", nullable = false)
    private Integer numberOfGems;

    @Column(name = "total_weight", nullable = false, precision = 8, scale = 5)
    private BigDecimal totalWeight;

    @Generated
    @Column(name = "total_weight_grams", nullable = false, insertable = false, updatable = false)
    private BigDecimal totalWeightGrams;

    @Column(name = "certificate", length = 64)
    private String certificate;

    @Column(name = "comment", length = 1500)
    private String comment;

    @Column(name = "stone_price", nullable = false, precision = 13, scale = 3)
    private BigDecimal stonePrice;

    @Column(name = "price_per_carat", precision = 13, scale = 3)
    private BigDecimal pricePerCarat;

    @Column(name = "customs_duty_price_active", nullable = false)
    private Boolean customsDutyPriceActive;

    @Column(name = "customs_duty_price", nullable = false, precision = 13, scale = 3)
    private BigDecimal customsDutyPrice;

    @Column(name = "vat_price_active", nullable = false)
    private Boolean vatPriceActive;

    @Column(name = "vat_price", nullable = false, precision = 13, scale = 3)
    private BigDecimal vatPrice;

    @Column(name = "ten_percents_price_active", nullable = false)
    private Boolean tenPercentsPriceActive;

    @Column(name = "ten_percents_price", nullable = false, precision = 13, scale = 3)
    private BigDecimal tenPercentsPrice;

    @Column(name = "certificate_cost", nullable = false, precision = 13, scale = 3)
    private BigDecimal certificateCost;

    @Column(name = "shipment", nullable = false, precision = 13, scale = 3)
    private BigDecimal shipment;

    @Generated
    @Column(name = "total_cost", nullable = false, insertable = false, updatable = false)
    private BigDecimal totalCost;

    @Enumerated(EnumType.STRING)
    @Column(name = "method_type", nullable = false, length = 8)
    private MethodType methodType;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 16)
    private GemstoneStatus status;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @CreatedBy
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_id", nullable = false, updatable = false)
    private User createdBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gems_payment_id")
    private GemsPayment paymentStatus;

    @Column(name = "invoice_date")
    private LocalDate invoiceDate;

    @Column(name = "owner_type", nullable = false)
    private GemstoneOwnerType ownerType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

    @OrderBy("id")
    @OneToMany(mappedBy = "gemstone", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<GemstoneImage> gemstoneImages;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "atelier_file_id")
    private AtelierFile invoice;

    public Gemstone() {
        status = GemstoneStatus.AVAILABLE;
    }
}
