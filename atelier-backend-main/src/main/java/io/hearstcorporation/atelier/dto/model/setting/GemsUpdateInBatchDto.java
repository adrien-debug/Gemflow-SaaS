package io.hearstcorporation.atelier.dto.model.setting;

import io.hearstcorporation.atelier.dto.model.BatchUpdateDto;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GemsUpdateInBatchDto {

    @Valid
    private BatchUpdateDto<GemsPaymentUpdateInBatchDto, Long> gemsPayments;
}
