package io.hearstcorporation.atelier.dto.mapper.order.sheet;

import io.hearstcorporation.atelier.dto.mapper.order.OrderMapper;
import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.order.sheet.OrderTechnicalSheetDto;
import io.hearstcorporation.atelier.dto.model.order.sheet.OrderTechnicalSheetUpdateDto;
import io.hearstcorporation.atelier.model.order.sheet.OrderTechnicalSheet;
import lombok.experimental.UtilityClass;

import java.util.List;

@UtilityClass
public class OrderTechnicalSheetMapper {

    public static void mapOrderTechnicalSheet(OrderTechnicalSheet entity, OrderTechnicalSheetUpdateDto requestDto) {
        entity.setGeneralNote(requestDto.getGeneralNote());
        entity.setMountingNote1(requestDto.getMountingNote1());
        entity.setMountingNote2(requestDto.getMountingNote2());
        entity.setMountingNote3(requestDto.getMountingNote3());
        entity.setMountingNote4(requestDto.getMountingNote4());
        entity.setSettingNote(requestDto.getSettingNote());
    }

    public static OrderTechnicalSheetDto toOrderTechnicalSheetDto(OrderTechnicalSheet entity, List<ImageDto> mounting1Images,
                                                                  List<ImageDto> mounting2Images, List<ImageDto> mounting3Images,
                                                                  List<ImageDto> mounting4Images) {
        if (entity == null) {
            return null;
        }
        return OrderTechnicalSheetDto.builder()
                .id(entity.getId())
                .generalNote(entity.getGeneralNote())
                .mountingNote1(entity.getMountingNote1())
                .mounting1Images(mounting1Images)
                .mountingNote2(entity.getMountingNote2())
                .mounting2Images(mounting2Images)
                .mountingNote3(entity.getMountingNote3())
                .mounting3Images(mounting3Images)
                .mountingNote4(entity.getMountingNote4())
                .mounting4Images(mounting4Images)
                .settingNote(entity.getSettingNote())
                .order(OrderMapper.toModelNameDto(entity.getOrder()))
                .build();
    }
}
