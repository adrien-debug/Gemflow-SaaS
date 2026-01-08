package io.hearstcorporation.atelier.dto.mapper.order.task;

import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.ImageRequestDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.model.file.AtelierFile;
import io.hearstcorporation.atelier.model.order.task.OrderTask;
import io.hearstcorporation.atelier.model.order.task.OrderTaskImage;
import lombok.experimental.UtilityClass;

@UtilityClass
public class OrderTaskImageMapper {

    public static OrderTaskImage toOrderTaskImage(ImageRequestDto imageRequestDto,
                                                  OrderTask orderTask, AtelierFile atelierFile) {
        OrderTaskImage orderTaskImage = new OrderTaskImage();
        orderTaskImage.setSizeType(imageRequestDto.getSizeType());
        orderTaskImage.setOrderTask(orderTask);
        orderTaskImage.setAtelierFile(atelierFile);
        return orderTaskImage;
    }

    public static ImageDto toImageDto(OrderTaskImage orderTaskImage, AtelierDownloadFileDto atelierDownloadFileDto) {
        if (orderTaskImage == null) {
            return null;
        }
        return ImageDto.builder()
                .sizeType(orderTaskImage.getSizeType())
                .file(atelierDownloadFileDto)
                .build();
    }
}
