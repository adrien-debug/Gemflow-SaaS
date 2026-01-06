package io.hearstcorporation.atelier.model.order.sheet;

import io.hearstcorporation.atelier.model.BaseModel;
import io.hearstcorporation.atelier.model.order.Order;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "order_technical_sheet")
public class OrderTechnicalSheet extends BaseModel {

    @Column(name = "general_note", length = 1200)
    private String generalNote;

    @Column(name = "mounting_note_1", length = 1200)
    private String mountingNote1;

    @Column(name = "mounting_note_2", length = 1200)
    private String mountingNote2;

    @Column(name = "mounting_note_3", length = 1200)
    private String mountingNote3;

    @Column(name = "mounting_note_4", length = 1200)
    private String mountingNote4;

    @Column(name = "setting_note", length = 1200)
    private String settingNote;

    @OrderBy("id")
    @OneToMany(mappedBy = "orderTechnicalSheet", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<OrderTechnicalSheetImage> technicalSheetImages;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;
}
