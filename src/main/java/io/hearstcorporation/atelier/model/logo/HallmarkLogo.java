package io.hearstcorporation.atelier.model.logo;

import io.hearstcorporation.atelier.model.BaseModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "hallmark_logo")
public class HallmarkLogo extends BaseModel {

    @Column(name = "name", nullable = false, length = 256)
    private String name;
}
