package io.hearstcorporation.atelier.dto.model.order.labour;

import io.hearstcorporation.atelier.dto.model.ModelNameDto;
import io.hearstcorporation.atelier.dto.model.user.UserWithImageDto;
import io.hearstcorporation.atelier.model.order.labour.LabourTaskType;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class OrderLabourDto {

    private Long id;
    private LabourTaskType taskType;
    private Long spentSeconds;
    private LocalDate date;
    private UserWithImageDto employee;
    private ModelNameDto order;
}
