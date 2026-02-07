package io.hearstcorporation.atelier.model.file;

import io.hearstcorporation.atelier.model.BaseModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = AtelierFile.TABLE_NAME)
@EntityListeners(AuditingEntityListener.class)
public class AtelierFile extends BaseModel {

    public static final String TABLE_NAME = "atelier_file";

    @Column(name = "file_name", nullable = false, length = 128)
    private String fileName;

    @Column(name = "internal_file_name", nullable = false, length = 156)
    private String internalFileName;

    @Column(name = "path", nullable = false, length = 512)
    private String path;

    @Column(name = "content_type", nullable = false, length = 128)
    private String contentType;

    @Enumerated(EnumType.STRING)
    @Column(name = "source", nullable = false, length = 16)
    private Source source;

    @Column(name = "download_url", length = 750)
    private String downloadUrl;

    @Column(name = "download_url_expired_at")
    private Instant downloadUrlExpiredAt;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;
}
