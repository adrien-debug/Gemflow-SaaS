package io.hearstcorporation.atelier.dto.model.order;

import io.hearstcorporation.atelier.dto.model.Identifiable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderMaterialUpdateInBatchDto extends OrderMaterialRequestDto implements Identifiable<Long> {

    private Long id;
}
