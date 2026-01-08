package io.hearstcorporation.atelier.service.order.impl;

import io.hearstcorporation.atelier.dto.mapper.order.OrderImageMapper;
import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.ImageRequestDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.model.file.AtelierFile;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.OrderImage;
import io.hearstcorporation.atelier.model.order.OrderImageType;
import io.hearstcorporation.atelier.repository.order.OrderImageRepository;
import io.hearstcorporation.atelier.service.file.AtelierFileCompositeService;
import io.hearstcorporation.atelier.service.file.AtelierFileService;
import io.hearstcorporation.atelier.service.order.OrderImageService;
import io.hearstcorporation.atelier.util.ExceptionWrapper;
import lombok.RequiredArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderImageServiceImpl implements OrderImageService {

    private final OrderImageRepository orderImageRepository;
    private final AtelierFileService atelierFileService;
    private final AtelierFileCompositeService atelierFileCompositeService;

    @Override
    @Transactional
    public void updateOrderImages(OrderImageType type, List<ImageRequestDto> images, Order order) {
        ExceptionWrapper.onDelete(
                () -> orderImageRepository.deleteAllByOrderIdAndImageType(order.getId(), type),
                "Order images with type %s for order %d cannot be deleted.".formatted(type, order.getId()));

        if (CollectionUtils.isNotEmpty(images)) {
            List<Long> atelierFileIds = images.stream().map(ImageRequestDto::getFileId).toList();
            Map<Long, AtelierFile> atelierFilesMappedById = atelierFileService.getAtelierFilesMappedById(atelierFileIds);
            images.forEach(image -> {
                OrderImage orderImage = OrderImageMapper.toOrderImage(type, image, order, atelierFilesMappedById.get(image.getFileId()));
                orderImageRepository.save(orderImage);
            });
        }
    }

    @Override
    @Transactional
    public void copyOrderImages(OrderImageType type, Order order, Order fromOrder) {
        orderImageRepository.deleteAllByOrderIdAndImageType(order.getId(), type);
        List<OrderImage> orderImages = orderImageRepository.findAllByOrderIdAndImageTypeOrderByIdAsc(fromOrder.getId(), type);
        orderImages.forEach(fromImage -> {
            OrderImage orderImage = OrderImageMapper.copyOrderImage(fromImage, order);
            orderImageRepository.save(orderImage);
        });
    }

    @Override
    public boolean isOrderImagesExists(Long orderId, OrderImageType orderImageType) {
        return orderImageRepository.existsByOrderIdAndImageType(orderId, orderImageType);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ImageDto> getImageDtoList(Long orderId, OrderImageType type) {
        List<OrderImage> orderImages = orderImageRepository.findAllByOrderIdAndImageTypeOrderByIdAsc(orderId, type);
        List<Long> atelierFileIds = orderImages.stream().map(OrderImage::getAtelierFile).map(AtelierFile::getId).toList();
        Map<Long, AtelierDownloadFileDto> atelierDownloadFileDtoGroupedById = atelierFileCompositeService.getAtelierDownloadFileDtoListMappedById(atelierFileIds);
        return orderImages.stream()
                .map(orderImage -> OrderImageMapper.toImageDto(orderImage,
                        atelierDownloadFileDtoGroupedById.get(orderImage.getAtelierFile().getId()))
                ).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Map<Long, List<ImageDto>> getImageDtoListGroupedByOrderId(List<Long> orderIds, OrderImageType type) {
        List<OrderImage> orderImages = orderImageRepository.findAllByOrderIdInAndImageTypeOrderByIdAsc(orderIds, type);
        List<Long> atelierFileIds = orderImages.stream().map(OrderImage::getAtelierFile).map(AtelierFile::getId).toList();
        Map<Long, AtelierDownloadFileDto> atelierDownloadFileDtoGroupedById = atelierFileCompositeService.getAtelierDownloadFileDtoListMappedById(atelierFileIds);
        Map<Long, List<OrderImage>> orderImagesGroupedByOrderId = orderImages.stream()
                .collect(Collectors.groupingBy(image -> image.getOrder().getId()));
        return orderImagesGroupedByOrderId.entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        e -> e.getValue().stream()
                                .map(image -> OrderImageMapper.toImageDto(
                                        image,
                                        atelierDownloadFileDtoGroupedById.get(image.getAtelierFile().getId()))
                                ).toList()
                ));
    }

    @Override
    public List<ImageRequestDto> getImageRequestDtoList(Long orderId, OrderImageType type) {
        return OrderImageMapper.toImageRequestDtoList(
                orderImageRepository.findAllByOrderIdAndImageTypeOrderByIdAsc(orderId, type));
    }
}
