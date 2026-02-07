package io.hearstcorporation.atelier.dto.model.setting;

import io.hearstcorporation.atelier.dto.model.Identifiable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SegmentUpdateInBatchDto extends SegmentRequestDto implements Identifiable<Long> {

    private Long id;
}
