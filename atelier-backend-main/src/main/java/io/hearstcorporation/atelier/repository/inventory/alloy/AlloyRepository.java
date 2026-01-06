package io.hearstcorporation.atelier.repository.inventory.alloy;

import io.hearstcorporation.atelier.model.inventory.alloy.Alloy;
import io.hearstcorporation.atelier.model.inventory.alloy.Alloy_;
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

public interface AlloyRepository extends JpaRepository<Alloy, Long>, JpaSpecificationExecutor<Alloy>, AlloyTotalRepository {

    @NonNull
    @EntityGraph(attributePaths = {
            Alloy_.METAL
    })
    Page<Alloy> findAll(@Nullable Specification<Alloy> spec, @NonNull Pageable pageable);

    @NonNull
    @EntityGraph(attributePaths = {
            Alloy_.METAL
    })
    Optional<Alloy> findAlloyById(Long alloyId);

    Optional<Alloy> findByIdAndMetalId(Long alloyId, Long metalId);

    @Modifying
    @Query("DELETE FROM Alloy al WHERE al.id = :id")
    void deleteById(@NonNull Long id);
}
