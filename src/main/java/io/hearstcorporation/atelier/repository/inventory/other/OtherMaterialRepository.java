package io.hearstcorporation.atelier.repository.inventory.other;

import io.hearstcorporation.atelier.model.inventory.other.OtherMaterial;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

public interface OtherMaterialRepository extends JpaRepository<OtherMaterial, Long>, JpaSpecificationExecutor<OtherMaterial> {

    @NonNull
    Page<OtherMaterial> findAll(@Nullable Specification<OtherMaterial> spec, @NonNull Pageable pageable);

    @Modifying
    @Query("DELETE FROM OtherMaterial om WHERE om.id = :id")
    void deleteById(@NonNull Long id);
}
