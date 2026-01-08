package io.hearstcorporation.atelier.service.logo;

import io.hearstcorporation.atelier.dto.model.logo.HallmarkLogoDto;
import io.hearstcorporation.atelier.dto.model.logo.HallmarkLogoRequestDto;
import io.hearstcorporation.atelier.model.logo.HallmarkLogo;

import java.util.List;
import java.util.Map;

public interface HallmarkLogoService {

    // Business logic methods

    HallmarkLogoDto createHallmarkLogo(HallmarkLogoRequestDto hallmarkLogoRequestDto);

    HallmarkLogoDto updateHallmarkLogo(Long hallmarkLogoId, HallmarkLogoRequestDto hallmarkLogoRequestDto);

    void deleteHallmarkLogo(Long hallmarkLogoId);

    // Get Dto methods

    List<HallmarkLogoDto> getHallmarkLogoDtoList();

    HallmarkLogoDto getHallmarkLogoDto(Long hallmarkLogoId);

    // Get Entity methods

    HallmarkLogo getHallmarkLogo(Long hallmarkLogoId);

    List<HallmarkLogo> getHallmarkLogos(List<Long> ids);

    Map<Long, HallmarkLogo> getHallmarkLogosMappedById(List<Long> ids);
}
