package io.hearstcorporation.atelier.dto.model.file;

import java.time.Instant;

public record FileUrlDto(String url, Instant expiredAt) {
}
