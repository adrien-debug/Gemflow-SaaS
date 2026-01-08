package io.hearstcorporation.atelier.repository.inventory.alloyedmetal;

import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetal;
import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetal_;
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

import java.util.Optional;

public interface AlloyedMetalRepository extends JpaRepository<AlloyedMetal, Long>, JpaSpecificationExecutor<AlloyedMetal>, AlloyedMetalTotalRepository {

    @NonNull
    @EntityGraph(attributePaths = {
            AlloyedMetal_.METAL,
            AlloyedMetal_.METAL_PURITY
    })
    Page<AlloyedMetal> findAll(@Nullable Specification<AlloyedMetal> spec, @NonNull Pageable pageable);

    @NonNull
    @EntityGraph(attributePaths = {
            AlloyedMetal_.METAL,
            AlloyedMetal_.METAL_PURITY
    })
    Optional<AlloyedMetal> findAlloyedMetalById(Long alloyedMetalId);

    Optional<AlloyedMetal> findByIdAndMetalIdAndMetalPurityId(Long alloyedMetalId, Long metalId, Long metalPurityId);

    @Modifying
    @Query("DELETE FROM AlloyedMetal am WHERE am.id = :id")
    void deleteById(@NonNull Long id);
}
