package io.hearstcorporation.atelier.dto.model;

import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.model.ImageSizeType;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ImageDto {

    private ImageSizeType sizeType;
    private AtelierDownloadFileDto file;
}
