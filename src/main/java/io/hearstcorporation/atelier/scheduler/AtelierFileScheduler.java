package io.hearstcorporation.atelier.scheduler;

import io.hearstcorporation.atelier.model.file.AtelierFile;
import io.hearstcorporation.atelier.model.file.AtelierFile_;
import io.hearstcorporation.atelier.service.file.AtelierFileCompositeService;
import io.hearstcorporation.atelier.service.file.AtelierFileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import static io.hearstcorporation.atelier.config.sheduler.SchedulerConfig.ATELIER_FILE_DELETE_CRON;

@Slf4j
@Component
@RequiredArgsConstructor
public class AtelierFileScheduler {

    private static final int DELETE_BATCH_SIZE = 200;
    private static final Short DELETE_CREATED_HOURS_BEFORE = 24;

    private final AtelierFileService atelierFileService;
    private final AtelierFileCompositeService atelierFileCompositeService;

    @Scheduled(cron = ATELIER_FILE_DELETE_CRON)
    @SchedulerLock(name = "AtelierFileScheduler_deleteUnusedAtelierFiles", lockAtMostFor = "PT29M")
    public void deleteUnusedAtelierFiles() {
        log.info("Delete unused atelier files job started.");
        Instant createdBefore = Instant.now().minus(DELETE_CREATED_HOURS_BEFORE, ChronoUnit.HOURS);
        Pageable pageable = PageRequest.ofSize(DELETE_BATCH_SIZE).withSort(Sort.Direction.ASC, AtelierFile_.ID);
        Page<AtelierFile> unsusedFilePage = atelierFileService.getUnusedAtelierFiles(createdBefore, pageable);
        unsusedFilePage.forEach(this::deleteAtelierFileSilently);
        log.info("Delete unused atelier files job finished.");
    }

    private void deleteAtelierFileSilently(AtelierFile atelierFile) {
        try {
            atelierFileCompositeService.deleteAtelierFile(atelierFile);
            log.info("Atelier file with id {}, source {}, path {} deleted.", atelierFile.getId(),
                    atelierFile.getSource(), atelierFile.getPath());
        } catch (Exception e) {
            log.error("Error deleting the atelier file with id {}, source {}, path {}.", atelierFile.getId(),
                    atelierFile.getSource(), atelierFile.getPath(), e);
        }
    }
}
