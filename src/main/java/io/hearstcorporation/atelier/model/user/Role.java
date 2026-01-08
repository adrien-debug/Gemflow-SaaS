package io.hearstcorporation.atelier.model.user;

import io.hearstcorporation.atelier.model.BaseModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;

@Getter
@Entity
@Table(name = "atelier_role")
public class Role extends BaseModel {

    @Column(name = "code", unique = true, nullable = false, length = 32)
    private String code;

    @Column(name = "name", unique = true, nullable = false, length = 32)
    private String name;
}
