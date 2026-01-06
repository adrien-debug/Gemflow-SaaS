package io.hearstcorporation.atelier.model.order;

import io.hearstcorporation.atelier.model.BaseModel;
import io.hearstcorporation.atelier.model.Priority;
import io.hearstcorporation.atelier.model.SettingType;
import io.hearstcorporation.atelier.model.SizeSystem;
import io.hearstcorporation.atelier.model.administration.Client;
import io.hearstcorporation.atelier.model.inventory.gemstone.Gemstone;
import io.hearstcorporation.atelier.model.order.stock.OrderStock;
import io.hearstcorporation.atelier.model.setting.Collection;
import io.hearstcorporation.atelier.model.setting.ItemCategory;
import io.hearstcorporation.atelier.model.setting.Segment;
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
import jakarta.persistence.OneToOne;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

//todo: related to all tables. We need to create indexes for each popular foreign key,
// for the most popular columns by which we are filtering
@Getter
@Setter
@Entity
@Table(name = "atelier_order")
@EntityListeners(AuditingEntityListener.class)
public class Order extends BaseModel {

    @Column(name = "name", nullable = false, length = 128)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "priority", nullable = false, length = 16)
    private Priority priority;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "acceptance_date")
    private LocalDate acceptanceDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 24)
    private OrderStatus status;

    @Column(name = "length")
    private Integer length;

    @Enumerated(EnumType.STRING)
    @Column(name = "size_system")
    private SizeSystem sizeSystem;

    @Column(name = "finger_size")
    private Integer fingerSize;

    @Column(name = "description", length = 1000)
    private String description;

    @Column(name = "stl_count")
    private Integer stlCount;

    @Enumerated(EnumType.STRING)
    @Column(name = "setting_type")
    private SettingType settingType;

    @Column(name = "stone_in_packet")
    private Boolean stoneInPacket;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @CreatedBy
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_id", nullable = false, updatable = false)
    private User createdBy;

    @Column(name = "labour_hourly_rate", nullable = false, updatable = false, precision = 6, scale = 2)
    private BigDecimal labourHourlyRate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_category_id", nullable = false)
    private ItemCategory itemCategory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "collection_id")
    private Collection collection;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "segment_id", nullable = false)
    private Segment segment;

    @OrderBy("id")
    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY)
    private List<Gemstone> gemstones;

    @OrderBy("id")
    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<OrderMaterial> materials;

    @OrderBy("id")
    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<OrderImage> orderImages;

    @OrderBy("id")
    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<OrderFile> orderFiles;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "order_stock_id")
    private OrderStock orderStock;

    public Order() {
        this.status = OrderStatus.IN_CAD;
    }
}
