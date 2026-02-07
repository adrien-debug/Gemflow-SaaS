package io.hearstcorporation.atelier.model.order;

import io.hearstcorporation.atelier.model.BaseModel;
import io.hearstcorporation.atelier.model.file.AtelierFile;
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

@Getter
@Setter
@Entity
@Table(name = "order_file")
public class OrderFile extends BaseModel {

    @Enumerated(EnumType.STRING)
    @Column(name = "file_type", nullable = false)
    private OrderFileType fileType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "atelier_file_id", nullable = false)
    private AtelierFile atelierFile;
}
