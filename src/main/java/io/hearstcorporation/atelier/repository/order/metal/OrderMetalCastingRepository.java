package io.hearstcorporation.atelier.repository.order.metal;

import io.hearstcorporation.atelier.model.casting.Casting_;
import io.hearstcorporation.atelier.model.order.metal.OrderMetalCasting;
import io.hearstcorporation.atelier.model.order.metal.OrderMetalCasting_;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import java.util.List;

public interface OrderMetalCastingRepository extends JpaRepository<OrderMetalCasting, Long>, JpaSpecificationExecutor<OrderMetalCasting> {

    @NonNull
    @EntityGraph(attributePaths = {
            OrderMetalCasting_.CASTING,
            OrderMetalCasting_.CASTING + "." + Casting_.METAL,
            OrderMetalCasting_.CASTING + "." + Casting_.METAL_PURITY,
            OrderMetalCasting_.ORDER_TASK

    })
    Page<OrderMetalCasting> findAll(@Nullable Specification<OrderMetalCasting> specification, @NonNull Pageable pageable);

    @NonNull
    @EntityGraph(attributePaths = {
            OrderMetalCasting_.CASTING,
            OrderMetalCasting_.CASTING + "." + Casting_.METAL,
            OrderMetalCasting_.CASTING + "." + Casting_.METAL_PURITY,
            OrderMetalCasting_.ORDER_TASK

    })
    List<OrderMetalCasting> findAllByOrderTaskOrderId(@NonNull Long orderId);
}
