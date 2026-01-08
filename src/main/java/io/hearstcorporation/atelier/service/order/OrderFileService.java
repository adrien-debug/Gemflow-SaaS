package io.hearstcorporation.atelier.service.order;

import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.OrderFileType;

import java.util.List;

public interface OrderFileService {

    void updateOrderFiles(OrderFileType type, List<Long> createdFileIds, List<Long> deletedFileIds, Order order);

    void copyOrderFiles(OrderFileType type, Order order, Order fromOrder);

    List<AtelierDownloadFileDto> getAtelierDownloadFileDtoList(Long orderId, OrderFileType type);
}
