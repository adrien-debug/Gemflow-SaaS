package io.hearstcorporation.atelier.repository.setting;

import io.hearstcorporation.atelier.model.setting.MetalCaratage;
import io.hearstcorporation.atelier.model.setting.MetalCaratage_;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.Optional;

public interface MetalCaratageRepository extends JpaRepository<MetalCaratage, Long> {

    String FIND_BY_METAL_ID_QUERY = "SELECT mc FROM MetalCaratage mc " +
            "WHERE EXISTS (SELECT 1 FROM Metal m WHERE m.metalCaratage.id = mc.id and m.id = :metalId)";

    @NonNull
    @EntityGraph(attributePaths = {
            MetalCaratage_.PRICE_METAL_NAME
    })
    List<MetalCaratage> findAll(@NonNull Sort sort);

    List<MetalCaratage> findAllByIdInOrderByIdAsc(List<Long> ids);

    @EntityGraph(attributePaths = {
            MetalCaratage_.PRICE_METAL_NAME
    })
    Optional<MetalCaratage> findMetalCaratageById(@NonNull Long id);

    @Query(FIND_BY_METAL_ID_QUERY)
    Optional<MetalCaratage> findByMetalId(@NonNull Long metalId);

    @EntityGraph(attributePaths = {
            MetalCaratage_.PRICE_METAL_NAME
    })
    @Query(FIND_BY_METAL_ID_QUERY)
    Optional<MetalCaratage> findMetalCaratageByMetalId(@NonNull Long metalId);

    @Query("SELECT COUNT(mc.id) > 0 FROM MetalCaratage mc " +
            "WHERE EXISTS (SELECT 1 FROM Metal m WHERE m.id = :metalId AND m.metalCaratage.id = mc.id) " +
            "AND EXISTS (SELECT 1 FROM MetalPurity mp WHERE mp.id = :metalPurityId AND mp.metalCaratage.id = mc.id)")
    boolean existsByMetalIdAndMetalPurityId(@NonNull Long metalId, @NonNull Long metalPurityId);

    @Modifying
    @Query("DELETE FROM MetalCaratage mc WHERE mc.id IN :ids")
    void deleteByIds(List<Long> ids);
}
