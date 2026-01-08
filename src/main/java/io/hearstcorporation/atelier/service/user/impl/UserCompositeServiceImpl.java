package io.hearstcorporation.atelier.service.user.impl;

import io.hearstcorporation.atelier.dto.model.token.TokenDto;
import io.hearstcorporation.atelier.dto.model.user.ChangePasswordDto;
import io.hearstcorporation.atelier.dto.model.user.ResetPasswordDto;
import io.hearstcorporation.atelier.dto.model.user.RestorePasswordDto;
import io.hearstcorporation.atelier.dto.model.user.UserCreateDto;
import io.hearstcorporation.atelier.dto.model.user.UserDto;
import io.hearstcorporation.atelier.dto.model.user.UserUpdateDto;
import io.hearstcorporation.atelier.exception.IncorrectPasswordException;
import io.hearstcorporation.atelier.model.user.Token;
import io.hearstcorporation.atelier.model.user.TokenType;
import io.hearstcorporation.atelier.model.user.User;
import io.hearstcorporation.atelier.service.email.EmailService;
import io.hearstcorporation.atelier.service.frontend.FrontendService;
import io.hearstcorporation.atelier.service.keycloak.KeycloakService;
import io.hearstcorporation.atelier.service.user.TokenService;
import io.hearstcorporation.atelier.service.user.UserCompositeService;
import io.hearstcorporation.atelier.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserCompositeServiceImpl implements UserCompositeService {

    private final KeycloakService keycloakService;
    private final UserService userService;
    private final TokenService tokenService;
    private final FrontendService frontendService;
    private final EmailService emailService;

    @Override
    @Transactional
    public UserDto createUser(UserCreateDto userCreateDto) {
        userService.userNotExistsOrThrow(userCreateDto);
        UUID oid = keycloakService.createUser(userCreateDto);
        User user;
        try {
            user = userService.createUser(userCreateDto, oid);
        } catch (Exception e) {
            log.error("Error creating user: {}", e.getMessage(), e);
            keycloakService.deleteUser(oid);
            throw e;
        }
        TokenDto token = tokenService.createTokenDto(user, TokenType.RESTORE_PASSWORD);
        String link = frontendService.generateNewPasswordLink(token.getValue());
        emailService.sendNewUserEmail(user.getEmail(), user.getFirstName(), user.getLastName(), link);
        return userService.getUserDto(user.getId());
    }

    @Override
    @Transactional
    public UserDto updateUser(Long userId, UserUpdateDto userUpdateDto) {
        User user = userService.getUser(userId);
        userService.updateUser(user, userUpdateDto);
        keycloakService.updateUser(user.getOid(), userUpdateDto);
        return userService.getUserDto(user.getId());
    }

    @Override
    @Transactional
    public UserDto activateUser(Long userId, boolean active) {
        User user = userService.getUser(userId);
        userService.activateUser(user, active);
        keycloakService.activateUser(user.getOid(), active);
        return userService.getUserDto(user.getId());
    }

    @Override
    @Transactional
    public void deleteUser(Long userId) {
        User user = userService.getUser(userId);
        userService.deleteUser(user);
        keycloakService.deleteUser(user.getOid());
    }

    @Override
    @Transactional
    public void restorePassword(RestorePasswordDto restorePasswordDto) {
        Optional<User> userOpt = userService.findUserByEmail(restorePasswordDto.getEmail());

        if (userOpt.isEmpty()) {
            log.warn("User with email {} not found", restorePasswordDto.getEmail());
            return;
        }

        User user = userOpt.get();
        TokenDto token = tokenService.createTokenDto(user, TokenType.RESTORE_PASSWORD);
        String link = frontendService.generateRestorePasswordLink(token.getValue());
        emailService.sendRestorePasswordEmail(user.getEmail(), user.getFirstName(), user.getLastName(), link);
    }

    @Override
    @Transactional
    public void resetPassword(ResetPasswordDto resetPasswordDto) {
        Token token = tokenService.getToken(resetPasswordDto.getTokenValue(), TokenType.RESTORE_PASSWORD);
        User user = token.getUser();
        keycloakService.changePassword(user.getOid(), resetPasswordDto.getNewPassword());
        tokenService.deleteToken(token);
    }

    @Override
    @Transactional
    public void updateCurrentUserPassword(ChangePasswordDto changePasswordDto) {
        User user = userService.getCurrentUser();
        if (!keycloakService.isCurrentPasswordValid(user.getOid(), changePasswordDto.getCurrentPassword())) {
            throw new IncorrectPasswordException();
        }
        keycloakService.changePassword(user.getOid(), changePasswordDto.getNewPassword());
    }
}
