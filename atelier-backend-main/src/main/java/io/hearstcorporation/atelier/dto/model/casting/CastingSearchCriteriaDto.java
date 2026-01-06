package io.hearstcorporation.atelier.dto.model.casting;

import io.hearstcorporation.atelier.model.casting.CastingStatus;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CastingSearchCriteriaDto {

    private List<CastingStatus> statuses;
}
