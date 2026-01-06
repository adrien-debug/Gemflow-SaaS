package io.hearstcorporation.atelier.dto.model.setting;

import io.hearstcorporation.atelier.dto.model.Identifiable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SupplyTypeUpdateInBatchDto extends SupplyTypeRequestDto implements Identifiable<Long> {

    private Long id;
}
