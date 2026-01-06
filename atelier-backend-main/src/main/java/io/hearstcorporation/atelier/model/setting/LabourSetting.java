package io.hearstcorporation.atelier.model.setting;

import io.hearstcorporation.atelier.model.BaseModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "labour_setting")
public class LabourSetting extends BaseModel {

    @Column(name = "hourly_rate", precision = 6, scale = 2)
    private BigDecimal hourlyRate;

    @Column(name = "cut_down_pave_cost", precision = 6, scale = 2)
    private BigDecimal cutDownPaveCost;

    @Column(name = "claw_cost", precision = 6, scale = 2)
    private BigDecimal clawCost;

    @Column(name = "center_cost", precision = 6, scale = 2)
    private BigDecimal centerCost;

    @Column(name = "shoulder_cost", precision = 6, scale = 2)
    private BigDecimal shoulderCost;

    @Column(name = "rubover_cost", precision = 6, scale = 2)
    private BigDecimal ruboverCost;

    @Column(name = "channel_cost", precision = 6, scale = 2)
    private BigDecimal channelCost;
}
