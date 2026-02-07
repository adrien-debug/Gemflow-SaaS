package io.hearstcorporation.atelier.repository.setting;

import io.hearstcorporation.atelier.model.setting.Cylinder;
import io.hearstcorporation.atelier.model.setting.Cylinder_;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.Optional;

public interface CylinderRepository extends JpaRepository<Cylinder, Long> {

    @NonNull
    @EntityGraph(attributePaths = {
            Cylinder_.METAL
    })
    List<Cylinder> findAll(@NonNull Sort sort);

    @EntityGraph(attributePaths = {
            Cylinder_.METAL
    })
    Optional<Cylinder> findCylinderById(Long id);

    @Modifying
    @Query("DELETE FROM Cylinder c WHERE c.id IN :ids")
    void deleteByIds(List<Long> ids);
}
