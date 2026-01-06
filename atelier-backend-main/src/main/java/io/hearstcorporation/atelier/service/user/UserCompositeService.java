package io.hearstcorporation.atelier.service.user;

import io.hearstcorporation.atelier.dto.model.user.ChangePasswordDto;
import io.hearstcorporation.atelier.dto.model.user.ResetPasswordDto;
import io.hearstcorporation.atelier.dto.model.user.RestorePasswordDto;
import io.hearstcorporation.atelier.dto.model.user.UserCreateDto;
import io.hearstcorporation.atelier.dto.model.user.UserDto;
import io.hearstcorporation.atelier.dto.model.user.UserUpdateDto;

public interface UserCompositeService {

    UserDto createUser(UserCreateDto userCreateDto);

    UserDto updateUser(Long userId, UserUpdateDto userUpdateDto);

    UserDto activateUser(Long userId, boolean active);

    void deleteUser(Long userId);

    void restorePassword(RestorePasswordDto restorePasswordDto);

    void resetPassword(ResetPasswordDto resetPasswordDto);

    void updateCurrentUserPassword(ChangePasswordDto changePasswordDto);
}
