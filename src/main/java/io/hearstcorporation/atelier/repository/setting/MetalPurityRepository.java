package io.hearstcorporation.atelier.repository.setting;

import io.hearstcorporation.atelier.model.setting.MetalPurity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MetalPurityRepository extends JpaRepository<MetalPurity, Long> {

    List<MetalPurity> findAllByIdInOrderByIdAsc(List<Long> ids);

    List<MetalPurity> findAllByMetalCaratageIdOrderByIdAsc(Long metalCaratageId);

    List<MetalPurity> findAllByMetalCaratageIdInOrderByIdAsc(List<Long> metalCaratageIds);

    @Modifying
    @Query("DELETE FROM MetalPurity mp WHERE mp.id IN :ids AND mp.metalCaratage.id = :metalCaratageId")
    void deleteByIdsAndMetalCaratageId(List<Long> ids, Long metalCaratageId);
}
