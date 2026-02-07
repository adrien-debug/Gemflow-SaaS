package io.hearstcorporation.atelier.dto.mapper.order;

import io.hearstcorporation.atelier.dto.mapper.file.AtelierFileMapper;
import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.ImageRequestDto;
import io.hearstcorporation.atelier.dto.model.file.AtelierDownloadFileDto;
import io.hearstcorporation.atelier.model.file.AtelierFile;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.OrderImage;
import io.hearstcorporation.atelier.model.order.OrderImageType;
import lombok.experimental.UtilityClass;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class OrderImageMapper {

    public static OrderImage toOrderImage(OrderImageType type, ImageRequestDto imageRequestDto,
                                          Order order, AtelierFile atelierFile) {
        OrderImage orderImage = new OrderImage();
        orderImage.setImageType(type);
        orderImage.setSizeType(imageRequestDto.getSizeType());
        orderImage.setOrder(order);
        orderImage.setAtelierFile(atelierFile);
        return orderImage;
    }

    public static OrderImage copyOrderImage(OrderImage fromOrderImage, Order order) {
        OrderImage orderImage = new OrderImage();
        orderImage.setImageType(fromOrderImage.getImageType());
        orderImage.setSizeType(fromOrderImage.getSizeType());
        orderImage.setOrder(order);
        orderImage.setAtelierFile(fromOrderImage.getAtelierFile());
        return orderImage;
    }

    public static ImageDto toImageDto(OrderImage orderImage, AtelierDownloadFileDto atelierDownloadFileDto) {
        if (orderImage == null) {
            return null;
        }
        return ImageDto.builder()
                .sizeType(orderImage.getSizeType())
                .file(atelierDownloadFileDto)
                .build();
    }

    public static ImageRequestDto toImageRequestDto(OrderImage orderImage) {
        if (orderImage == null) {
            return null;
        }
        ImageRequestDto imageRequestDto = new ImageRequestDto();
        imageRequestDto.setSizeType(orderImage.getSizeType());
        imageRequestDto.setFile(AtelierFileMapper.toIdRequestDto(orderImage.getAtelierFile()));
        return imageRequestDto;
    }

    public static List<ImageRequestDto> toImageRequestDtoList(List<OrderImage> orderImages) {
        return orderImages.stream().map(OrderImageMapper::toImageRequestDto).collect(Collectors.toList());
    }
}
