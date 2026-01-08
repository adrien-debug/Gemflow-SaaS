package io.hearstcorporation.atelier.model.user;

import io.hearstcorporation.atelier.model.BaseModel;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "permission")
public class Permission extends BaseModel {

    @Column(name = "code", unique = true, nullable = false, length = 64)
    private String code;

    @Column(name = "name", nullable = false, length = 128)
    private String name;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "category", length = 64)
    @Enumerated(EnumType.STRING)
    private PermissionCategory category;
}


