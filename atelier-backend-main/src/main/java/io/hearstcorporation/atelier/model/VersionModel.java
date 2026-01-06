package io.hearstcorporation.atelier.model;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.Version;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
public class VersionModel extends BaseModel {

    @Version
    @Column(name = "version", nullable = false)
    private Long version;
}
