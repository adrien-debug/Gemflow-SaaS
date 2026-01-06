package io.hearstcorporation.atelier.repository.setting;

import io.hearstcorporation.atelier.model.setting.Segment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SegmentRepository extends JpaRepository<Segment, Long> {

    @Modifying
    @Query("DELETE FROM Segment s WHERE s.id IN :ids")
    void deleteByIds(List<Long> ids);
}
