package io.hearstcorporation.atelier.service.inventory.gemstone.impl;

import io.hearstcorporation.atelier.dto.mapper.inventory.gemstone.GemstoneImageMapper;
import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.ImageRequestDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.model.file.AtelierFile;
import io.hearstcorporation.atelier.model.inventory.gemstone.Gemstone;
import io.hearstcorporation.atelier.model.inventory.gemstone.GemstoneImage;
import io.hearstcorporation.atelier.repository.inventory.gemstone.GemstoneImageRepository;
import io.hearstcorporation.atelier.service.file.AtelierFileCompositeService;
import io.hearstcorporation.atelier.service.file.AtelierFileService;
import io.hearstcorporation.atelier.service.inventory.gemstone.GemstoneImageService;
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
public class GemstoneImageServiceImpl implements GemstoneImageService {

    private final GemstoneImageRepository gemstoneImageRepository;
    private final AtelierFileService atelierFileService;
    private final AtelierFileCompositeService atelierFileCompositeService;

    @Override
    @Transactional
    public void updateGemstoneImages(List<ImageRequestDto> images, Gemstone gemstone) {
        ExceptionWrapper.onDelete(
                () -> gemstoneImageRepository.deleteAllByGemstoneId(gemstone.getId()),
                "Gemstone image for gemstone %d cannot be deleted.".formatted(gemstone.getId()));

        if (CollectionUtils.isNotEmpty(images)) {
            List<Long> atelierFileIds = images.stream().map(ImageRequestDto::getFileId).toList();
            Map<Long, AtelierFile> atelierFilesMappedById = atelierFileService.getAtelierFilesMappedById(atelierFileIds);
            images.forEach(image -> {
                GemstoneImage gemstoneImage = GemstoneImageMapper.toGemstoneImage(image, gemstone, atelierFilesMappedById.get(image.getFileId()));
                gemstoneImageRepository.save(gemstoneImage);
            });
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<ImageDto> getImageDtoList(Long gemstoneId) {
        List<GemstoneImage> gemstoneImages = gemstoneImageRepository.findAllByGemstoneIdOrderByIdAsc(gemstoneId);
        List<Long> atelierFileIds = gemstoneImages.stream().map(GemstoneImage::getAtelierFile).map(AtelierFile::getId).toList();
        Map<Long, AtelierDownloadFileDto> atelierDownloadFileDtoGroupedById = atelierFileCompositeService.getAtelierDownloadFileDtoListMappedById(atelierFileIds);
        return gemstoneImages.stream()
                .map(gemstoneImage -> GemstoneImageMapper.toImageDto(gemstoneImage,
                        atelierDownloadFileDtoGroupedById.get(gemstoneImage.getAtelierFile().getId()))
                ).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Map<Long, List<ImageDto>> getImageDtoListGroupedByGemstoneId(List<Long> gemstoneIds) {
        List<GemstoneImage> gemstoneImages = gemstoneImageRepository.findAllByGemstoneIdInOrderByIdAsc(gemstoneIds);
        List<Long> atelierFileIds = gemstoneImages.stream().map(GemstoneImage::getAtelierFile).map(AtelierFile::getId).toList();
        Map<Long, AtelierDownloadFileDto> atelierDownloadFileDtoGroupedById = atelierFileCompositeService.getAtelierDownloadFileDtoListMappedById(atelierFileIds);
        Map<Long, List<GemstoneImage>> gemstoneImagesGroupedByOrderId = gemstoneImages.stream()
                .collect(Collectors.groupingBy(image -> image.getGemstone().getId()));
        return gemstoneImagesGroupedByOrderId.entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        e -> e.getValue().stream()
                                .map(image -> GemstoneImageMapper.toImageDto(
                                        image,
                                        atelierDownloadFileDtoGroupedById.get(image.getAtelierFile().getId()))
                                ).toList()
                ));
    }
}
