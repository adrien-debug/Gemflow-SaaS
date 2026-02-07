package io.hearstcorporation.atelier.model.inventory.other;

import io.hearstcorporation.atelier.model.VersionModel;
import io.hearstcorporation.atelier.model.order.Order;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "other_material_transaction")
//todo: Version don't needed for this entity. We are updating only description. Also remove related Retryable
public class OtherMaterialTransaction extends VersionModel {

    @Column(name = "balance_date", nullable = false)
    private LocalDate balanceDate;

    @Column(name = "description", nullable = false, length = 120)
    private String description;

    @Column(name = "batch_weight", nullable = false, precision = 11, scale = 5)
    private BigDecimal batchWeight;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "other_material_id", nullable = false)
    private OtherMaterial otherMaterial;
}
