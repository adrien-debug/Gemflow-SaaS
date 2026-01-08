package io.hearstcorporation.atelier.repository.setting;

import io.hearstcorporation.atelier.model.setting.Metal;
import io.hearstcorporation.atelier.model.setting.MetalCaratage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MetalRepository extends JpaRepository<Metal, Long> {

    List<Metal> findAllByIdInOrderByIdAsc(List<Long> ids);

    List<Metal> findAllByMetalCaratageId(Long metalCaratageId);

    List<Metal> findAllByMetalCaratageIdOrderByIdAsc(Long metalCaratageId);

    List<Metal> findAllByMetalCaratageIdInOrderByIdAsc(List<Long> metalCaratageIds);

    @Modifying
    @Query("UPDATE Metal SET metalCaratage = :metalCaratage WHERE id IN :ids")
    void setMetalCaratage(MetalCaratage metalCaratage, List<Long> ids);

    @Modifying
    @Query("UPDATE Metal SET metalCaratage = null WHERE id IN :ids AND metalCaratage = :previousMetalCaratage")
    void resetMetalCaratage(MetalCaratage previousMetalCaratage, List<Long> ids);

    @Modifying
    @Query("DELETE FROM Metal m WHERE m.id IN :ids")
    void deleteByIds(List<Long> ids);
}
