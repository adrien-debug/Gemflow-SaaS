package io.hearstcorporation.atelier.dto.model.setting;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GemsDto {

    private List<GemsPaymentDto> gemsPayments;
}
