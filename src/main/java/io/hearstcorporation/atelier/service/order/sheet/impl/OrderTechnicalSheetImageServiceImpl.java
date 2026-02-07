package io.hearstcorporation.atelier.service.order.sheet.impl;

import io.hearstcorporation.atelier.dto.mapper.order.sheet.OrderTechnicalSheetImageMapper;
import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.ImageRequestDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.model.file.AtelierFile;
import io.hearstcorporation.atelier.model.order.sheet.OrderTechnicalSheet;
import io.hearstcorporation.atelier.model.order.sheet.OrderTechnicalSheetImage;
import io.hearstcorporation.atelier.model.order.sheet.OrderTechnicalSheetImageType;
import io.hearstcorporation.atelier.repository.order.sheet.OrderTechnicalSheetImageRepository;
import io.hearstcorporation.atelier.service.file.AtelierFileCompositeService;
import io.hearstcorporation.atelier.service.file.AtelierFileService;
import io.hearstcorporation.atelier.service.order.sheet.OrderTechnicalSheetImageService;
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
public class OrderTechnicalSheetImageServiceImpl implements OrderTechnicalSheetImageService {

    private final OrderTechnicalSheetImageRepository orderTechnicalSheetImageRepository;
    private final AtelierFileService atelierFileService;
    private final AtelierFileCompositeService atelierFileCompositeService;

    @Override
    @Transactional
    public void updateOrderTechnicalSheetImages(OrderTechnicalSheetImageType type, List<ImageRequestDto> images, OrderTechnicalSheet orderTechnicalSheet) {
        ExceptionWrapper.onDelete(
                () -> orderTechnicalSheetImageRepository.deleteAllByOrderTechnicalSheetIdAndImageType(orderTechnicalSheet.getId(), type),
                "Order technical sheet images with type %s for order technical sheet %d cannot be deleted.".formatted(type, orderTechnicalSheet.getId()));

        if (CollectionUtils.isNotEmpty(images)) {
            List<Long> atelierFileIds = images.stream().map(ImageRequestDto::getFileId).toList();
            Map<Long, AtelierFile> atelierFilesMappedById = atelierFileService.getAtelierFilesMappedById(atelierFileIds);
            images.forEach(image -> {
                OrderTechnicalSheetImage technicalSheetImage = OrderTechnicalSheetImageMapper
                        .toOrderTechnicalSheetImage(type, image, orderTechnicalSheet, atelierFilesMappedById.get(image.getFileId()));
                orderTechnicalSheetImageRepository.save(technicalSheetImage);
            });
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<ImageDto> getImageDtoList(Long orderTechnicalSheetId, OrderTechnicalSheetImageType type) {
        List<OrderTechnicalSheetImage> orderImages = orderTechnicalSheetImageRepository.findAllByOrderTechnicalSheetIdAndImageTypeOrderByIdAsc(orderTechnicalSheetId, type);
        List<Long> atelierFileIds = orderImages.stream().map(OrderTechnicalSheetImage::getAtelierFile).map(AtelierFile::getId).toList();
        Map<Long, AtelierDownloadFileDto> atelierDownloadFileDtoGroupedById = atelierFileCompositeService.getAtelierDownloadFileDtoListMappedById(atelierFileIds);
        return orderImages.stream()
                .map(orderImage -> OrderTechnicalSheetImageMapper.toImageDto(orderImage,
                        atelierDownloadFileDtoGroupedById.get(orderImage.getAtelierFile().getId()))
                ).collect(Collectors.toList());
    }
}
