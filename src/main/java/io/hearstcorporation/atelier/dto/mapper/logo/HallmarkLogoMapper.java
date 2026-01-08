package io.hearstcorporation.atelier.dto.mapper.logo;

import io.hearstcorporation.atelier.dto.model.logo.HallmarkLogoDto;
import io.hearstcorporation.atelier.dto.model.logo.HallmarkLogoRequestDto;
import io.hearstcorporation.atelier.model.logo.HallmarkLogo;
import lombok.experimental.UtilityClass;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@UtilityClass
public class HallmarkLogoMapper {

    public static HallmarkLogo toHallmarkLogo(HallmarkLogoRequestDto hallmarkLogoRequestDto) {
        HallmarkLogo hallmarkLogo = new HallmarkLogo();
        hallmarkLogo.setName(hallmarkLogoRequestDto.getName());
        return hallmarkLogo;
    }

    public static List<HallmarkLogoDto> toHallmarkLogoDtoList(List<HallmarkLogo> hallmarkLogos) {
        return hallmarkLogos.stream()
                .filter(Objects::nonNull)
                .map(HallmarkLogoMapper::toHallmarkLogoDto)
                .collect(Collectors.toList());
    }

    public static HallmarkLogoDto toHallmarkLogoDto(HallmarkLogo hallmarkLogo) {
        if (hallmarkLogo == null) {
            return null;
        }
        return HallmarkLogoDto.builder()
                .id(hallmarkLogo.getId())
                .name(hallmarkLogo.getName())
                .build();
    }

    public static void mapHallmarkLogo(HallmarkLogo hallmarkLogo, HallmarkLogoRequestDto hallmarkLogoRequestDto) {
        hallmarkLogo.setName(hallmarkLogoRequestDto.getName());
    }
}
