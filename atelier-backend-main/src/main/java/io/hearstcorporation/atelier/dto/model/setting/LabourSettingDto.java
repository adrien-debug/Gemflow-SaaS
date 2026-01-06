package io.hearstcorporation.atelier.dto.model.setting;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class LabourSettingDto {

    private BigDecimal hourlyRate;
    private BigDecimal cutDownPaveCost;
    private BigDecimal clawCost;
    private BigDecimal centerCost;
    private BigDecimal shoulderCost;
    private BigDecimal ruboverCost;
    private BigDecimal channelCost;
}
