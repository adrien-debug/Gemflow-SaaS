package io.hearstcorporation.atelier.model.setting;

import io.hearstcorporation.atelier.model.BaseModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "item_category")
public class ItemCategory extends BaseModel {

    public static final long RING_ID = 1L;
    public static final long EARRINGS_ID = 2L;
    public static final long BRACELET_ID = 3L;

    @Column(name = "name", nullable = false, length = 256)
    private String name;

    @Column(name = "immutable", nullable = false)
    private Boolean immutable;

    public ItemCategory() {
        this.immutable = false;
    }
}
