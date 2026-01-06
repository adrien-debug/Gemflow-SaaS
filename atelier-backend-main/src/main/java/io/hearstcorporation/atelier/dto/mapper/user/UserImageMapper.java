package io.hearstcorporation.atelier.dto.mapper.user;

import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.ImageRequestDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.model.file.AtelierFile;
import io.hearstcorporation.atelier.model.user.User;
import io.hearstcorporation.atelier.model.user.UserImage;
import lombok.experimental.UtilityClass;

@UtilityClass
public class UserImageMapper {

    public static UserImage toUserImage(ImageRequestDto imageRequestDto, User user, AtelierFile atelierFile) {
        UserImage userImage = new UserImage();
        userImage.setSizeType(imageRequestDto.getSizeType());
        userImage.setUser(user);
        userImage.setAtelierFile(atelierFile);
        return userImage;
    }

    public static ImageDto toImageDto(UserImage userImage, AtelierDownloadFileDto atelierDownloadFileDto) {
        if (userImage == null) {
            return null;
        }
        return ImageDto.builder()
                .sizeType(userImage.getSizeType())
                .file(atelierDownloadFileDto)
                .build();
    }
}
