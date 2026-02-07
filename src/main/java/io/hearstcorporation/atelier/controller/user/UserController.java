package io.hearstcorporation.atelier.controller.user;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.user.ChangePasswordDto;
import io.hearstcorporation.atelier.dto.model.user.CurrentUserUpdateDto;
import io.hearstcorporation.atelier.dto.model.user.ResetPasswordDto;
import io.hearstcorporation.atelier.dto.model.user.RestorePasswordDto;
import io.hearstcorporation.atelier.dto.model.user.UserCreateDto;
import io.hearstcorporation.atelier.dto.model.user.UserDto;
import io.hearstcorporation.atelier.dto.model.user.UserSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.user.UserUpdateDto;
import io.hearstcorporation.atelier.service.user.UserCompositeService;
import io.hearstcorporation.atelier.service.user.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static io.hearstcorporation.atelier.controller.user.UserController.BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(BASE_URL)
public class UserController {

    public static final String BASE_URL = "/api/v1/users";
    public static final String PASSWORD_RESTORE = "/password/restore";
    public static final String PASSWORD_RESET = "/password/reset";
    public static final String USER_ID = "/{userId}";
    public static final String ACTIVATE = USER_ID + "/activate";
    public static final String SEARCH = "/search";

    private final UserService userService;
    private final UserCompositeService userCompositeService;

    @PostMapping
    public UserDto createUser(@RequestBody @Valid UserCreateDto userCreateDto) {
        return userCompositeService.createUser(userCreateDto);
    }

    @PutMapping(USER_ID)
    public UserDto updateUser(@PathVariable Long userId,
                              @RequestBody @Valid UserUpdateDto userUpdateDto) {
        return userCompositeService.updateUser(userId, userUpdateDto);
    }

    @PatchMapping(ACTIVATE)
    public UserDto activateUser(@PathVariable Long userId,
                                @RequestParam("active") Boolean active) {
        return userCompositeService.activateUser(userId, active);
    }

    @DeleteMapping(USER_ID)
    public void deleteUser(@PathVariable Long userId) {
        userCompositeService.deleteUser(userId);
    }

    @GetMapping("/current")
    public UserDto getCurrentUser() {
        return userService.getCurrentUserDto();
    }

    @PutMapping("/current")
    public UserDto updateCurrentUser(@RequestBody @Valid CurrentUserUpdateDto currentUserUpdateDto) {
        userService.updateCurrentUser(currentUserUpdateDto);
        return userService.getCurrentUserDto();
    }

    @PutMapping("/current/password")
    public void updateCurrentUserPassword(@RequestBody @Valid ChangePasswordDto changePasswordDto) {
        userCompositeService.updateCurrentUserPassword(changePasswordDto);
    }

    @PostMapping(PASSWORD_RESTORE)
    public void restorePassword(@RequestBody @Valid RestorePasswordDto restorePasswordDto) {
        userCompositeService.restorePassword(restorePasswordDto);
    }

    @PostMapping(PASSWORD_RESET)
    public void resetPassword(@RequestBody @Valid ResetPasswordDto resetPasswordDto) {
        userCompositeService.resetPassword(resetPasswordDto);
    }

    @PostMapping(SEARCH)
    public SearchDto<UserDto> searchUsers(@RequestBody @Valid SearchRequestDto<UserSearchCriteriaDto> userSearchQueryDto) {
        return userService.searchUsers(userSearchQueryDto);
    }
}
