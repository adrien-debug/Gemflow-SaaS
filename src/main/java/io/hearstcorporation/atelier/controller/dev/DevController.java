package io.hearstcorporation.atelier.controller.dev;

import io.hearstcorporation.atelier.dto.model.user.UserCreateDto;
import io.hearstcorporation.atelier.dto.model.user.UserDto;
import io.hearstcorporation.atelier.service.user.UserCompositeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static io.hearstcorporation.atelier.controller.dev.DevController.BASE_URL;

@Profile("dev")
@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class DevController {

    public static final String BASE_URL = "/api/v1/dev";

    private final UserCompositeService userCompositeService;

    @PostMapping("/users")
    public UserDto createUser(@RequestBody @Valid UserCreateDto userCreateDto) {
        return userCompositeService.createUser(userCreateDto);
    }
}
