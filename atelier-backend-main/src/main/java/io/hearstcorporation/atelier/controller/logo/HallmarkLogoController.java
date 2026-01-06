package io.hearstcorporation.atelier.controller.logo;

import io.hearstcorporation.atelier.dto.model.logo.HallmarkLogoDto;
import io.hearstcorporation.atelier.dto.model.logo.HallmarkLogoRequestDto;
import io.hearstcorporation.atelier.service.logo.HallmarkLogoService;
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

import java.util.List;

import static io.hearstcorporation.atelier.controller.logo.HallmarkLogoController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class HallmarkLogoController {

    public static final String BASE_URL = "/api/v1/hallmark-logos";

    private final HallmarkLogoService hallmarkLogoService;

    @PostMapping
    public HallmarkLogoDto createHallmarkLogo(@RequestBody @Valid HallmarkLogoRequestDto hallmarkLogoRequestDto) {
        return hallmarkLogoService.createHallmarkLogo(hallmarkLogoRequestDto);
    }

    @PutMapping("/{hallmarkLogoId}")
    public HallmarkLogoDto updateHallmarkLogo(@PathVariable Long hallmarkLogoId,
                                              @RequestBody @Valid HallmarkLogoRequestDto hallmarkLogoRequestDto) {
        return hallmarkLogoService.updateHallmarkLogo(hallmarkLogoId, hallmarkLogoRequestDto);
    }

    @GetMapping
    public List<HallmarkLogoDto> getHallmarkLogos() {
        return hallmarkLogoService.getHallmarkLogoDtoList();
    }

    @GetMapping("/{hallmarkLogoId}")
    public HallmarkLogoDto getHallmarkLogo(@PathVariable Long hallmarkLogoId) {
        return hallmarkLogoService.getHallmarkLogoDto(hallmarkLogoId);
    }

    @DeleteMapping("/{hallmarkLogoId}")
    public void deleteHallmarkLogo(@PathVariable Long hallmarkLogoId) {
        hallmarkLogoService.deleteHallmarkLogo(hallmarkLogoId);
    }
}
