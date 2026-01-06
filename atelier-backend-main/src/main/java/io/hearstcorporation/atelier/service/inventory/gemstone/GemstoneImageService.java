package io.hearstcorporation.atelier.service.inventory.gemstone;

import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.ImageRequestDto;
import io.hearstcorporation.atelier.model.inventory.gemstone.Gemstone;

import java.util.List;
import java.util.Map;

public interface GemstoneImageService {

    void updateGemstoneImages(List<ImageRequestDto> images, Gemstone gemstone);

    List<ImageDto> getImageDtoList(Long gemstoneId);

    Map<Long, List<ImageDto>> getImageDtoListGroupedByGemstoneId(List<Long> gemstoneIds);
}
