package io.hearstcorporation.atelier.repository.order.task;

import io.hearstcorporation.atelier.model.order.task.OrderTaskImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderTaskImageRepository extends JpaRepository<OrderTaskImage, Long> {

    List<OrderTaskImage> findAllByOrderTaskIdOrderByIdAsc(Long orderId);

    List<OrderTaskImage> findAllByOrderTaskIdInOrderByIdAsc(List<Long> orderIds);

    @Modifying
    @Query("DELETE FROM OrderTaskImage oti WHERE oti.orderTask.id = :orderTaskId")
    void deleteAllByOrderTaskId(Long orderTaskId);
}
