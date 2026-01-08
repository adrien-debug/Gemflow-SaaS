package io.hearstcorporation.atelier.model.user;

import io.hearstcorporation.atelier.model.BaseModel;
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
import org.springframework.data.annotation.CreatedDate;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "atelier_token")
public class Token extends BaseModel {

    @Column(name = "value", nullable = false)
    private UUID value;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false, length = 32)
    private TokenType type;

    @CreatedDate
    @Column(name = "expired_at", nullable = false)
    private Instant expiredAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
