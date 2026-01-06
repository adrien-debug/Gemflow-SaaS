package io.hearstcorporation.atelier.repository.order.labour;

import io.hearstcorporation.atelier.model.order.labour.LabourTaskType;
import io.hearstcorporation.atelier.model.order.labour.OrderLabour;
import io.hearstcorporation.atelier.model.order.labour.OrderLabourTaskTypeSummary;
import io.hearstcorporation.atelier.model.order.labour.OrderLabour_;
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

public interface OrderLabourRepository extends JpaRepository<OrderLabour, Long>, JpaSpecificationExecutor<OrderLabour> {

    @EntityGraph(attributePaths = {
            OrderLabour_.EMPLOYEE,
            OrderLabour_.ORDER
    })
    Optional<OrderLabour> findLabourById(Long id);

    @Query("""
            SELECT new io.hearstcorporation.atelier.model.order.labour.OrderLabourTaskTypeSummary(ol.taskType, sum(ol.spentSeconds))
            FROM OrderLabour ol
            WHERE ol.order.id = :orderId
            GROUP BY ol.taskType""")
    List<OrderLabourTaskTypeSummary> getOrderLabourTaskTypeSummary(Long orderId);

    @Query("""
            SELECT new io.hearstcorporation.atelier.model.order.labour.OrderLabourTaskTypeSummary(ol.taskType, sum(ol.spentSeconds))
            FROM OrderLabour ol
            WHERE ol.order.id = :orderId
            AND ol.employee.id = :userId
            GROUP BY ol.taskType""")
    List<OrderLabourTaskTypeSummary> getOrderLabourTaskTypeSummary(Long orderId, Long userId);

    @Query("""
            SELECT new io.hearstcorporation.atelier.model.order.labour.OrderLabourTaskTypeSummary(ol.taskType, sum(ol.spentSeconds))
            FROM OrderLabour ol
            WHERE ol.order.id = :orderId
            AND ol.taskType = :taskType
            AND ol.employee.id = :userId
            GROUP BY ol.taskType""")
    OrderLabourTaskTypeSummary getOrderLabourTaskTypeSummary(Long orderId, Long userId, LabourTaskType taskType);

    @NonNull
    @EntityGraph(attributePaths = {
            OrderLabour_.EMPLOYEE,
            OrderLabour_.ORDER
    })
    Page<OrderLabour> findAll(@Nullable Specification<OrderLabour> spec, @NonNull Pageable pageable);

    boolean existsByOrderId(Long orderId);

    @Modifying
    @Query("DELETE FROM OrderLabour ol WHERE ol.id = :id")
    void deleteById(@NonNull Long id);
}
