package io.hearstcorporation.atelier.service.user.impl;

import io.hearstcorporation.atelier.dto.mapper.user.UserImageMapper;
import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.ImageRequestDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.model.file.AtelierFile;
import io.hearstcorporation.atelier.model.user.User;
import io.hearstcorporation.atelier.model.user.UserImage;
import io.hearstcorporation.atelier.repository.user.UserImageRepository;
import io.hearstcorporation.atelier.service.file.AtelierFileCompositeService;
import io.hearstcorporation.atelier.service.file.AtelierFileService;
import io.hearstcorporation.atelier.service.user.UserImageService;
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
public class UserImageServiceImpl implements UserImageService {

    private final UserImageRepository userImageRepository;
    private final AtelierFileService atelierFileService;
    private final AtelierFileCompositeService atelierFileCompositeService;

    @Override
    @Transactional
    public void updateUserImages(List<ImageRequestDto> images, User user) {
        ExceptionWrapper.onDelete(
                () -> userImageRepository.deleteAllByUserId(user.getId()),
                "User images for user %d cannot be deleted.".formatted(user.getId()));

        if (CollectionUtils.isNotEmpty(images)) {
            List<Long> atelierFileIds = images.stream().map(ImageRequestDto::getFileId).toList();
            Map<Long, AtelierFile> atelierFilesMappedById = atelierFileService.getAtelierFilesMappedById(atelierFileIds);
            images.forEach(image -> {
                UserImage userImage = UserImageMapper.toUserImage(image, user, atelierFilesMappedById.get(image.getFileId()));
                userImageRepository.save(userImage);
            });
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<ImageDto> getImageDtoList(Long userId) {
        List<UserImage> userImages = userImageRepository.findAllByUserId(userId);
        return userImages.stream()
                .map(userImage -> UserImageMapper.toImageDto(userImage,
                        atelierFileCompositeService.getAtelierDownloadFileDto(userImage.getAtelierFile().getId()))
                ).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Map<Long, List<ImageDto>> getImageDtoListGroupedByUserId(List<Long> userIds) {
        List<UserImage> userImages = userImageRepository.findAllByUserIdIn(userIds);
        List<Long> atelierFileIds = userImages.stream().map(image -> image.getAtelierFile().getId()).toList();
        Map<Long, AtelierDownloadFileDto> atelierDownloadFileDtoGroupedById = atelierFileCompositeService.getAtelierDownloadFileDtoListMappedById(atelierFileIds);
        Map<Long, List<UserImage>> userImagesGroupedByUserId = userImages.stream()
                .collect(Collectors.groupingBy(image -> image.getUser().getId()));
        return userImagesGroupedByUserId.entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        e -> e.getValue().stream()
                                .map(image -> UserImageMapper.toImageDto(
                                        image,
                                        atelierDownloadFileDtoGroupedById.get(image.getAtelierFile().getId()))
                                ).toList()
                ));
    }
}
