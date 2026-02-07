package io.hearstcorporation.atelier.repository.setting;

import io.hearstcorporation.atelier.model.setting.DiamondShape;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DiamondShapeRepository extends JpaRepository<DiamondShape, Long> {

    @Modifying
    @Query("DELETE FROM DiamondShape ds WHERE ds.id IN :ids")
    void deleteByIds(List<Long> ids);
}
