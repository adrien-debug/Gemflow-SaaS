package io.hearstcorporation.atelier.dto.mapper.inventory.gemstone;

import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.ImageRequestDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.model.file.AtelierFile;
import io.hearstcorporation.atelier.model.inventory.gemstone.Gemstone;
import io.hearstcorporation.atelier.model.inventory.gemstone.GemstoneImage;
import lombok.experimental.UtilityClass;

@UtilityClass
public class GemstoneImageMapper {

    public static GemstoneImage toGemstoneImage(ImageRequestDto imageRequestDto, Gemstone gemstone,
                                                AtelierFile atelierFile) {
        GemstoneImage gemstoneImage = new GemstoneImage();
        gemstoneImage.setSizeType(imageRequestDto.getSizeType());
        gemstoneImage.setGemstone(gemstone);
        gemstoneImage.setAtelierFile(atelierFile);
        return gemstoneImage;
    }

    public static ImageDto toImageDto(GemstoneImage gemstoneImage, AtelierDownloadFileDto atelierDownloadFileDto) {
        if (gemstoneImage == null) {
            return null;
        }
        return ImageDto.builder()
                .sizeType(gemstoneImage.getSizeType())
                .file(atelierDownloadFileDto)
                .build();
    }
}
