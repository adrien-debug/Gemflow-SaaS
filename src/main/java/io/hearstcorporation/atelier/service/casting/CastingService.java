package io.hearstcorporation.atelier.service.casting;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.casting.CastingDto;
import io.hearstcorporation.atelier.dto.model.casting.CastingFinishDto;
import io.hearstcorporation.atelier.dto.model.casting.CastingListDto;
import io.hearstcorporation.atelier.dto.model.casting.CastingRequestDto;
import io.hearstcorporation.atelier.dto.model.casting.CastingSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.casting.CastingUpdateDto;
import io.hearstcorporation.atelier.model.casting.Casting;

public interface CastingService {

    // Business logic methods

    Long createCasting(CastingRequestDto castingRequestDto);

    void updateCasting(Long castingId, CastingUpdateDto castingUpdateDto);

    void deleteCasting(Long castingId);

    void finishCasting(Long castingId, CastingFinishDto castingFinishDto);

    boolean openCastingExistsForOrder(Long orderId);

    // Get Dto methods

    SearchDto<CastingListDto> searchCastings(SearchRequestDto<CastingSearchCriteriaDto> castingSearchQueryDto);

    CastingDto getCastingDto(Long castingId);

    // Get Entity methods

    Casting getCasting(Long castingId);

    Casting getFullCasting(Long castingId);

    Casting getOpenCastingByCylinderIdAndMetalId(Long cylinderId, Long metalId);
}
