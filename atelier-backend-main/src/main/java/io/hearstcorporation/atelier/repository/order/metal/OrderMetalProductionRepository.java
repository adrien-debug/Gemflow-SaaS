package io.hearstcorporation.atelier.repository.order.metal;

import io.hearstcorporation.atelier.model.order.metal.OrderMetalProduction;
import io.hearstcorporation.atelier.model.order.metal.OrderMetalProduction_;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.List;

public interface OrderMetalProductionRepository extends JpaRepository<OrderMetalProduction, Long> {

    @NonNull
    @EntityGraph(attributePaths = {
            OrderMetalProduction_.EMPLOYEE,
            OrderMetalProduction_.ALLOYED_METAL,
            OrderMetalProduction_.OTHER_MATERIAL,
            OrderMetalProduction_.METAL,
            OrderMetalProduction_.METAL_PURITY
    })
    List<OrderMetalProduction> findAllByOrderId(@NonNull Long orderId);
}
