package io.hearstcorporation.atelier.dto.model.crm;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CrmContactSearchCriteriaDto {
    private String search;
    private Long clientId;
}

