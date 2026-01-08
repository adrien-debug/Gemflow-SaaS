package io.hearstcorporation.atelier.repository.order.task;

import io.hearstcorporation.atelier.model.order.task.OrderTaskMetal;
import io.hearstcorporation.atelier.model.order.task.OrderTaskMetalId;
import io.hearstcorporation.atelier.model.order.task.OrderTaskMetal_;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderTaskMetalRepository extends JpaRepository<OrderTaskMetal, OrderTaskMetalId> {

    @EntityGraph(attributePaths = {
            OrderTaskMetal_.METAL
    })
    List<OrderTaskMetal> findAllByOrderTaskId(Long orderTaskId);

    @EntityGraph(attributePaths = {
            OrderTaskMetal_.METAL
    })
    List<OrderTaskMetal> findAllByOrderTaskIdIn(List<Long> orderTaskIds);
}
