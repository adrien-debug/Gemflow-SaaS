package io.hearstcorporation.atelier.repository.order.task;

import io.hearstcorporation.atelier.model.casting.Casting_;
import io.hearstcorporation.atelier.model.order.task.OrderTask;
import io.hearstcorporation.atelier.model.order.task.OrderTaskStatus;
import io.hearstcorporation.atelier.model.order.task.OrderTaskStatusCount;
import io.hearstcorporation.atelier.model.order.task.OrderTask_;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface OrderTaskRepository extends JpaRepository<OrderTask, Long>, JpaSpecificationExecutor<OrderTask> {

    @NonNull
    @EntityGraph(attributePaths = {
            OrderTask_.ORDER,
            OrderTask_.CASTING + "." + Casting_.CYLINDER
    })
    Page<OrderTask> findAll(Specification<OrderTask> specification, @NonNull Pageable pageable);

    @EntityGraph(attributePaths = {
            OrderTask_.ORDER
    })
    List<OrderTask> findAllByIdIn(List<Long> ids);

    List<OrderTask> findAllByOrderIdAndStatusIn(Long orderId, List<OrderTaskStatus> statuses);

    Optional<OrderTask> findByIdAndStatusIn(Long orderTaskId, List<OrderTaskStatus> statuses);

    @EntityGraph(attributePaths = {
            OrderTask_.ORDER,
            OrderTask_.CASTING + "." + Casting_.CYLINDER
    })
    Optional<OrderTask> findOrderTaskById(Long orderTaskId);

    @Query("SELECT DISTINCT ot.status FROM OrderTask ot WHERE ot.order.id = :orderId")
    Set<OrderTaskStatus> findOrderTaskStatusesByOrderId(Long orderId);

    @Query("""
            SELECT new io.hearstcorporation.atelier.model.order.task.OrderTaskStatusCount(ot.status, COUNT(ot.id))
            FROM OrderTask ot
            WHERE ot.order.id = :orderId
            GROUP BY ot.status""")
    List<OrderTaskStatusCount> getOrderTaskStatusCountSummary(Long orderId);

    boolean existsByIdNotAndCastingId(Long orderTaskId, Long castingId);

    List<OrderTask> findAllByCastingIdIn(List<Long> castingIds);

    @EntityGraph(attributePaths = {
            OrderTask_.ORDER
    })
    List<OrderTask> findAllByCastingId(Long castingId);

    List<OrderTask> findOrderTasksByCastingId(Long castingId);

    @Modifying
    @Query("DELETE FROM OrderTask ot WHERE ot.id = :id")
    void deleteById(@NonNull Long id);
}
