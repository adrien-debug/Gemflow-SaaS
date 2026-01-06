package io.hearstcorporation.atelier.controller.casting;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.casting.CastingDto;
import io.hearstcorporation.atelier.dto.model.casting.CastingFinishDto;
import io.hearstcorporation.atelier.dto.model.casting.CastingListDto;
import io.hearstcorporation.atelier.dto.model.casting.CastingRequestDto;
import io.hearstcorporation.atelier.dto.model.casting.CastingSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.casting.CastingUpdateDto;
import io.hearstcorporation.atelier.service.casting.CastingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static io.hearstcorporation.atelier.controller.casting.CastingController.BASE_URL;


@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class CastingController {

    public static final String BASE_URL = "/api/v1/castings";

    private final CastingService castingService;

    @PostMapping
    public CastingDto createCasting(@RequestBody @Valid CastingRequestDto castingRequestDto) {
        Long castingId = castingService.createCasting(castingRequestDto);
        return castingService.getCastingDto(castingId);
    }

    @PutMapping("/{castingId}")
    public CastingDto updateCasting(@PathVariable Long castingId,
                                    @RequestBody @Valid CastingUpdateDto castingUpdateDto) {
        castingService.updateCasting(castingId, castingUpdateDto);
        return castingService.getCastingDto(castingId);
    }

    @DeleteMapping("/{castingId}")
    public void deleteCasting(@PathVariable Long castingId) {
        castingService.deleteCasting(castingId);
    }

    @GetMapping("/{castingId}")
    public CastingDto getCasting(@PathVariable Long castingId) {
        return castingService.getCastingDto(castingId);
    }

    @PostMapping("/search")
    public SearchDto<CastingListDto> searchCastings(@RequestBody @Valid SearchRequestDto<CastingSearchCriteriaDto> searchQuery) {
        return castingService.searchCastings(searchQuery);
    }

    @PostMapping("/{castingId}/finish")
    public CastingDto finishCasting(@PathVariable Long castingId, @RequestBody @Valid CastingFinishDto castingFinishDto) {
        castingService.finishCasting(castingId, castingFinishDto);
        return castingService.getCastingDto(castingId);
    }
}
