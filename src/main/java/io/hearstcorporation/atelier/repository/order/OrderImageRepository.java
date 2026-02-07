package io.hearstcorporation.atelier.repository.order;

import io.hearstcorporation.atelier.model.order.OrderImage;
import io.hearstcorporation.atelier.model.order.OrderImageType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderImageRepository extends JpaRepository<OrderImage, Long> {

    boolean existsByOrderIdAndImageType(Long orderId, OrderImageType type);

    List<OrderImage> findAllByOrderIdAndImageTypeOrderByIdAsc(Long orderId, OrderImageType imageType);

    List<OrderImage> findAllByOrderIdInAndImageTypeOrderByIdAsc(List<Long> orderIds, OrderImageType imageType);

    @Modifying
    @Query("DELETE FROM OrderImage oi WHERE oi.order.id = :orderId AND oi.imageType = :imageType")
    void deleteAllByOrderIdAndImageType(Long orderId, OrderImageType imageType);
}
