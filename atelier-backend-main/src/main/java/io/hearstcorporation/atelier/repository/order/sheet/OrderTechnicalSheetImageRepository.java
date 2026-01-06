package io.hearstcorporation.atelier.repository.order.sheet;

import io.hearstcorporation.atelier.model.order.sheet.OrderTechnicalSheetImage;
import io.hearstcorporation.atelier.model.order.sheet.OrderTechnicalSheetImageType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderTechnicalSheetImageRepository extends JpaRepository<OrderTechnicalSheetImage, Long> {

    List<OrderTechnicalSheetImage> findAllByOrderTechnicalSheetIdAndImageTypeOrderByIdAsc(Long orderTechnicalSheetId, OrderTechnicalSheetImageType imageType);

    @Modifying
    @Query("DELETE FROM OrderTechnicalSheetImage otsi WHERE otsi.orderTechnicalSheet.id = :orderTechnicalSheetId AND otsi.imageType = :imageType")
    void deleteAllByOrderTechnicalSheetIdAndImageType(Long orderTechnicalSheetId, OrderTechnicalSheetImageType imageType);
}
