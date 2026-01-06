package io.hearstcorporation.atelier.dto.model.order.labour;

import io.hearstcorporation.atelier.model.order.labour.LabourTaskType;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderLabourSearchCriteriaDto {

    private String searchInput;
    private List<LabourTaskType> taskTypes;
    private List<Long> employeeIds;
    private List<Long> orderIds;
}
