package io.hearstcorporation.atelier.repository.file;

import io.hearstcorporation.atelier.model.file.AtelierFile;
import io.hearstcorporation.atelier.model.file.AtelierFile_;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;

import java.time.Instant;
import java.util.List;

public interface AtelierFileRepository extends JpaRepository<AtelierFile, Long> {

    List<AtelierFile> findAllByIdInOrderByIdAsc(List<Long> ids);

    @Query("SELECT af FROM AtelierFile af " +
            "WHERE af.createdAt < :createdBefore " +
            "AND FUNCTION('is_row_referenced', '" + AtelierFile.TABLE_NAME + "', '" + AtelierFile_.ID + "', af.id) = FALSE")
    Page<AtelierFile> findUnusedAndCreatedBefore(Instant createdBefore, Pageable pageable);

    @Modifying
    @Query("DELETE FROM AtelierFile af WHERE af.id = :id")
    void deleteById(@NonNull Long id);
}
