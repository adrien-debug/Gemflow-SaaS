package io.hearstcorporation.atelier.repository.order;

import io.hearstcorporation.atelier.model.order.OrderMaterial;
import io.hearstcorporation.atelier.model.order.OrderMaterial_;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OrderMaterialRepository extends JpaRepository<OrderMaterial, Long> {

    boolean existsByOrderId(Long orderId);

    Optional<OrderMaterial> findByIdAndOrderId(Long id, Long orderId);

    List<OrderMaterial> findAllByOrderId(Long orderId);

    @EntityGraph(attributePaths = {
            OrderMaterial_.MATERIAL_METAL,
            OrderMaterial_.CLAW_METAL,
            OrderMaterial_.HALLMARK_LOGO
    })
    List<OrderMaterial> findOrderMaterialsByOrderIdOrderByIdAsc(Long orderId);

    @EntityGraph(attributePaths = {
            OrderMaterial_.MATERIAL_METAL,
            OrderMaterial_.CLAW_METAL,
            OrderMaterial_.HALLMARK_LOGO
    })
    Optional<OrderMaterial> findOrderMaterialById(Long orderId);

    @Modifying
    @Query("DELETE FROM OrderMaterial om WHERE om.id IN :ids")
    void deleteByIds(List<Long> ids);
}
