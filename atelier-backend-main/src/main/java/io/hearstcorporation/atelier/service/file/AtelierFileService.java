package io.hearstcorporation.atelier.service.file;

import io.hearstcorporation.atelier.dto.model.file.AtelierRequestDto;
import io.hearstcorporation.atelier.dto.model.file.FileUrlDto;
import io.hearstcorporation.atelier.model.file.AtelierFile;
import io.hearstcorporation.atelier.model.file.Source;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.Instant;
import java.util.List;
import java.util.Map;

public interface AtelierFileService {

    // Business logic methods

    AtelierFile createAtelierFile(AtelierRequestDto atelierRequestDto, Source source);

    void updateDownloadUrl(AtelierFile atelierFile, FileUrlDto fileUrlDto);

    void deleteAtelierFile(Long id);

    void deleteAtelierFile(AtelierFile atelierFile);

    // Get Entity methods

    AtelierFile getAtelierFile(Long id);

    List<AtelierFile> getAtelierFiles(List<Long> ids);

    Map<Long, AtelierFile> getAtelierFilesMappedById(List<Long> ids);

    Page<AtelierFile> getUnusedAtelierFiles(Instant createdBefore, Pageable pageable);
}
