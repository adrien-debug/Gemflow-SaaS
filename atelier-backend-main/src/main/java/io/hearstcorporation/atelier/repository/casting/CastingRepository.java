package io.hearstcorporation.atelier.repository.casting;

import io.hearstcorporation.atelier.model.casting.Casting;
import io.hearstcorporation.atelier.model.casting.CastingStatus;
import io.hearstcorporation.atelier.model.casting.Casting_;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import java.util.List;
import java.util.Optional;

public interface CastingRepository extends JpaRepository<Casting, Long>, JpaSpecificationExecutor<Casting> {

    @NonNull
    @EntityGraph(attributePaths = {
            Casting_.CYLINDER,
            Casting_.METAL,
            Casting_.METAL_PURITY,
            Casting_.ALLOYED_METAL,
            Casting_.PRICE_METAL_NAME,
            Casting_.ALLOY,
            Casting_.CREATED_BY,
            Casting_.COMPLETED_BY
    })
    Page<Casting> findAll(@Nullable Specification<Casting> spec, @NonNull Pageable pageable);

    @EntityGraph(attributePaths = {
            Casting_.CYLINDER,
            Casting_.METAL,
            Casting_.METAL_PURITY,
            Casting_.ALLOYED_METAL,
            Casting_.PRICE_METAL_NAME,
            Casting_.ALLOY,
            Casting_.CREATED_BY,
            Casting_.COMPLETED_BY
    })
    Optional<Casting> findCastingById(Long castingId);

    List<Casting> findByCylinderIdAndMetalIdAndStatus(Long cylinderId, Long metalId, CastingStatus status);

    @Query("SELECT COUNT(c.id) > 0 FROM Casting c " +
            "WHERE c.status = io.hearstcorporation.atelier.model.casting.CastingStatus.OPEN " +
            "AND EXISTS (SELECT 1 FROM OrderTask ot WHERE ot.casting.id = c.id AND ot.order.id = :orderId)")
    boolean openExistsByOrderId(Long orderId);

    @Modifying
    @Query("DELETE FROM Casting c WHERE c.id = :id")
    void deleteById(@NonNull Long id);
}
