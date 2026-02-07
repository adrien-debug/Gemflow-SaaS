package io.hearstcorporation.atelier.service.order.task.impl;

import io.hearstcorporation.atelier.dto.mapper.order.task.OrderTaskImageMapper;
import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.ImageRequestDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.model.file.AtelierFile;
import io.hearstcorporation.atelier.model.order.task.OrderTask;
import io.hearstcorporation.atelier.model.order.task.OrderTaskImage;
import io.hearstcorporation.atelier.repository.order.task.OrderTaskImageRepository;
import io.hearstcorporation.atelier.service.file.AtelierFileCompositeService;
import io.hearstcorporation.atelier.service.file.AtelierFileService;
import io.hearstcorporation.atelier.service.order.task.OrderTaskImageService;
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
public class OrderTaskImageServiceImpl implements OrderTaskImageService {

    private final OrderTaskImageRepository orderTaskImageRepository;
    private final AtelierFileService atelierFileService;
    private final AtelierFileCompositeService atelierFileCompositeService;

    @Override
    @Transactional
    public void updateOrderTaskImages(List<ImageRequestDto> images, OrderTask orderTask) {
        ExceptionWrapper.onDelete(
                () -> orderTaskImageRepository.deleteAllByOrderTaskId(orderTask.getId()),
                "Order task images for order task %d cannot be deleted.".formatted(orderTask.getId()));

        if (CollectionUtils.isNotEmpty(images)) {
            List<Long> atelierFileIds = images.stream().map(ImageRequestDto::getFileId).toList();
            Map<Long, AtelierFile> atelierFilesMappedById = atelierFileService.getAtelierFilesMappedById(atelierFileIds);
            images.forEach(image -> {
                OrderTaskImage orderTaskImage = OrderTaskImageMapper.toOrderTaskImage(image, orderTask, atelierFilesMappedById.get(image.getFileId()));
                orderTaskImageRepository.save(orderTaskImage);
            });
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<ImageDto> getImageDtoList(Long orderTaskId) {
        List<OrderTaskImage> orderTaslImages = orderTaskImageRepository.findAllByOrderTaskIdOrderByIdAsc(orderTaskId);
        List<Long> atelierFileIds = orderTaslImages.stream().map(OrderTaskImage::getAtelierFile).map(AtelierFile::getId).toList();
        Map<Long, AtelierDownloadFileDto> atelierDownloadFileDtoGroupedById = atelierFileCompositeService.getAtelierDownloadFileDtoListMappedById(atelierFileIds);
        return orderTaslImages.stream()
                .map(orderTaskImage -> OrderTaskImageMapper.toImageDto(orderTaskImage,
                        atelierDownloadFileDtoGroupedById.get(orderTaskImage.getAtelierFile().getId()))
                ).collect(Collectors.toList());
    }

    @Override
    public Map<Long, List<ImageDto>> getImageDtoListGroupedByOrderTaskId(List<Long> orderTaskIds) {
        List<OrderTaskImage> orderTaskImages = orderTaskImageRepository.findAllByOrderTaskIdInOrderByIdAsc(orderTaskIds);
        List<Long> atelierFileIds = orderTaskImages.stream().map(OrderTaskImage::getAtelierFile).map(AtelierFile::getId).toList();
        Map<Long, AtelierDownloadFileDto> atelierDownloadFileDtoGroupedById = atelierFileCompositeService.getAtelierDownloadFileDtoListMappedById(atelierFileIds);
        Map<Long, List<OrderTaskImage>> orderTaskImagesGroupedByOrderTaskId = orderTaskImages.stream()
                .collect(Collectors.groupingBy(image -> image.getOrderTask().getId()));
        return orderTaskImagesGroupedByOrderTaskId.entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        e -> e.getValue().stream()
                                .map(image -> OrderTaskImageMapper.toImageDto(
                                        image,
                                        atelierDownloadFileDtoGroupedById.get(image.getAtelierFile().getId()))
                                ).toList()
                ));
    }
}
