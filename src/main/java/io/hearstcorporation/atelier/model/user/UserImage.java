package io.hearstcorporation.atelier.model.user;

import io.hearstcorporation.atelier.model.BaseModel;
import io.hearstcorporation.atelier.model.ImageSizeType;
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
@Table(name = "atelier_user_image")
public class UserImage extends BaseModel {

    @Enumerated(EnumType.STRING)
    @Column(name = "size_type", nullable = false)
    private ImageSizeType sizeType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "atelier_file_id", nullable = false)
    private AtelierFile atelierFile;
}
