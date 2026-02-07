package io.hearstcorporation.atelier.dto.mapper.order.sheet;

import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.ImageRequestDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.model.file.AtelierFile;
import io.hearstcorporation.atelier.model.order.sheet.OrderTechnicalSheet;
import io.hearstcorporation.atelier.model.order.sheet.OrderTechnicalSheetImage;
import io.hearstcorporation.atelier.model.order.sheet.OrderTechnicalSheetImageType;
import lombok.experimental.UtilityClass;

@UtilityClass
public class OrderTechnicalSheetImageMapper {

    public static OrderTechnicalSheetImage toOrderTechnicalSheetImage(OrderTechnicalSheetImageType type, ImageRequestDto imageRequestDto,
                                                                      OrderTechnicalSheet technicalSheet, AtelierFile atelierFile) {
        OrderTechnicalSheetImage technicalSheetImage = new OrderTechnicalSheetImage();
        technicalSheetImage.setImageType(type);
        technicalSheetImage.setSizeType(imageRequestDto.getSizeType());
        technicalSheetImage.setOrderTechnicalSheet(technicalSheet);
        technicalSheetImage.setAtelierFile(atelierFile);
        return technicalSheetImage;
    }

    public static ImageDto toImageDto(OrderTechnicalSheetImage technicalSheetImage, AtelierDownloadFileDto atelierDownloadFileDto) {
        if (technicalSheetImage == null) {
            return null;
        }
        return ImageDto.builder()
                .sizeType(technicalSheetImage.getSizeType())
                .file(atelierDownloadFileDto)
                .build();
    }
}
