package io.hearstcorporation.atelier.dto.model.order.sheet;

import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.ModelNameDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class OrderTechnicalSheetDto {

    private Long id;
    private String generalNote;
    private String mountingNote1;
    private List<ImageDto> mounting1Images;
    private String mountingNote2;
    private List<ImageDto> mounting2Images;
    private String mountingNote3;
    private List<ImageDto> mounting3Images;
    private String mountingNote4;
    private List<ImageDto> mounting4Images;
    private String settingNote;
    private ModelNameDto order;
}
