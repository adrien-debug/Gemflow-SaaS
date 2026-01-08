package io.hearstcorporation.atelier.repository.order;

import io.hearstcorporation.atelier.model.order.OrderFile;
import io.hearstcorporation.atelier.model.order.OrderFileType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderFileRepository extends JpaRepository<OrderFile, Long> {

    List<OrderFile> findAllByOrderIdAndFileTypeOrderByIdAsc(Long orderId, OrderFileType fileType);

    @Modifying
    @Query("DELETE FROM OrderFile of WHERE of.order.id = :orderId AND of.fileType = :fileType")
    void deleteAllByOrderIdAndFileType(Long orderId, OrderFileType fileType);

    @Modifying
    @Query("DELETE FROM OrderFile of WHERE of.order.id = :orderId AND of.atelierFile.id IN :atelierFileIds " +
            "AND of.fileType = :fileType")
    void deleteAllByOrderIdAndAtelierFileIdsAndFileType(Long orderId, List<Long> atelierFileIds, OrderFileType fileType);
}
