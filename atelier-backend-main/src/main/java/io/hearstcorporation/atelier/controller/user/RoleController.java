package io.hearstcorporation.atelier.controller.user;

import io.hearstcorporation.atelier.dto.model.user.RoleDto;
import io.hearstcorporation.atelier.service.user.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static io.hearstcorporation.atelier.controller.user.RoleController.BASE_URL;


@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class RoleController {

    public static final String BASE_URL = "/api/v1/roles";

    private final RoleService roleService;

    @GetMapping
    public List<RoleDto> getRoles() {
        return roleService.getRoleDtoList();
    }
}
