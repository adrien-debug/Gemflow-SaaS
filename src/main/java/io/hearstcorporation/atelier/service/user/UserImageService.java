package io.hearstcorporation.atelier.service.user;

import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.ImageRequestDto;
import io.hearstcorporation.atelier.model.user.User;

import java.util.List;
import java.util.Map;

public interface UserImageService {

    void updateUserImages(List<ImageRequestDto> images, User user);

    List<ImageDto> getImageDtoList(Long userId);

    Map<Long, List<ImageDto>> getImageDtoListGroupedByUserId(List<Long> userIds);
}
