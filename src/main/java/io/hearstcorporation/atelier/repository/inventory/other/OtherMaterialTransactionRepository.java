package io.hearstcorporation.atelier.repository.inventory.other;

import io.hearstcorporation.atelier.model.inventory.other.OtherMaterialTransaction;
import io.hearstcorporation.atelier.model.inventory.other.OtherMaterialTransaction_;
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

public interface OtherMaterialTransactionRepository extends JpaRepository<OtherMaterialTransaction, Long>,
        JpaSpecificationExecutor<OtherMaterialTransaction> {

    @NonNull
    @EntityGraph(attributePaths = {
            OtherMaterialTransaction_.ORDER,
            OtherMaterialTransaction_.OTHER_MATERIAL
    })
    Page<OtherMaterialTransaction> findAll(@Nullable Specification<OtherMaterialTransaction> spec, @NonNull Pageable pageable);

    @Modifying
    @Query("DELETE FROM OtherMaterialTransaction omt WHERE omt.id = :id")
    void deleteById(@NonNull Long id);
}
