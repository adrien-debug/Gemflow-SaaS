package io.hearstcorporation.atelier.service.order.impl;

import io.hearstcorporation.atelier.dto.mapper.order.OrderFileMapper;
import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.model.file.AtelierFile;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.OrderFile;
import io.hearstcorporation.atelier.model.order.OrderFileType;
import io.hearstcorporation.atelier.repository.order.OrderFileRepository;
import io.hearstcorporation.atelier.service.file.AtelierFileCompositeService;
import io.hearstcorporation.atelier.service.file.AtelierFileService;
import io.hearstcorporation.atelier.service.order.OrderFileService;
import io.hearstcorporation.atelier.util.ExceptionWrapper;
import lombok.RequiredArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderFileServiceImpl implements OrderFileService {

    private final OrderFileRepository orderFileRepository;
    private final AtelierFileCompositeService atelierFileCompositeService;
    private final AtelierFileService atelierFileService;

    @Override
    @Transactional
    public void updateOrderFiles(OrderFileType type, List<Long> createdFileIds,
                                 List<Long> deletedFileIds, Order order) {
        if (CollectionUtils.isNotEmpty(deletedFileIds)) {
            ExceptionWrapper.onDelete(
                    () -> orderFileRepository.deleteAllByOrderIdAndAtelierFileIdsAndFileType(order.getId(), deletedFileIds, type),
                    "Order task files %s with type %s for order task %d cannot be deleted.".formatted(deletedFileIds, type, order.getId()));
        }

        if (CollectionUtils.isNotEmpty(createdFileIds)) {
            atelierFileService.getAtelierFiles(createdFileIds).forEach(atelierFile -> {
                OrderFile orderFile = OrderFileMapper.toOrderFile(type, order, atelierFile);
                orderFileRepository.save(orderFile);
            });
        }
    }

    @Override
    @Transactional
    public void copyOrderFiles(OrderFileType type, Order order, Order fromOrder) {
        orderFileRepository.deleteAllByOrderIdAndFileType(order.getId(), type);
        List<OrderFile> orderFiles = orderFileRepository.findAllByOrderIdAndFileTypeOrderByIdAsc(fromOrder.getId(), type);
        orderFiles.forEach(fromFile -> {
            OrderFile orderFile = OrderFileMapper.copyOrderFile(fromFile, order);
            orderFileRepository.save(orderFile);
        });
    }

    @Override
    @Transactional(readOnly = true)
    public List<AtelierDownloadFileDto> getAtelierDownloadFileDtoList(Long orderId, OrderFileType type) {
        List<OrderFile> orderFiles = orderFileRepository.findAllByOrderIdAndFileTypeOrderByIdAsc(orderId, type);
        List<Long> atelierFileIds = orderFiles.stream().map(OrderFile::getAtelierFile).map(AtelierFile::getId).toList();
        return atelierFileCompositeService.getAtelierDownloadFileDtoList(atelierFileIds);
    }
}
