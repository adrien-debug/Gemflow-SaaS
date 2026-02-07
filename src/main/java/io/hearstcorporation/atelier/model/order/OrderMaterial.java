package io.hearstcorporation.atelier.model.order;

import io.hearstcorporation.atelier.model.BaseModel;
import io.hearstcorporation.atelier.model.logo.HallmarkLogo;
import io.hearstcorporation.atelier.model.setting.Metal;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@Entity
@Table(name = "order_material")
@EntityListeners(AuditingEntityListener.class)
public class OrderMaterial extends BaseModel {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "material_metal_id", nullable = false)
    private Metal materialMetal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "claw_metal_id", nullable = false)
    private Metal clawMetal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hallmark_logo_id")
    private HallmarkLogo hallmarkLogo;
}
