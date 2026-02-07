package io.hearstcorporation.atelier.service.user;

import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.user.CurrentUserUpdateDto;
import io.hearstcorporation.atelier.dto.model.user.UserCreateDto;
import io.hearstcorporation.atelier.dto.model.user.UserDto;
import io.hearstcorporation.atelier.dto.model.user.UserSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.user.UserUpdateDto;
import io.hearstcorporation.atelier.dto.model.user.UserWithImageDto;
import io.hearstcorporation.atelier.model.user.User;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

public interface UserService {

    // Business logic methods

    User createUser(UserCreateDto userCreateDto, UUID oid);

    void updateUser(User user, UserUpdateDto userUpdateDto);

    void updateCurrentUser(CurrentUserUpdateDto currentUserUpdateDto);

    void activateUser(User user, boolean active);

    void deleteUser(User user);

    void userNotExistsOrThrow(UserCreateDto userCreateDto);

    UserWithImageDto getUserWithImageDto(User user);

    Map<Long, UserWithImageDto> getUserWithImageDtoListMappedById(List<Long> userIds);

    // Get Dto methods

    SearchDto<UserDto> searchUsers(SearchRequestDto<UserSearchCriteriaDto> userSearchQueryDto);

    UserDto getCurrentUserDto();

    UserDto getUserDto(Long userId);

    // Get Entity methods

    User getCurrentUser();

    User getUser(Long userId);

    // Find Entity methods

    Optional<User> findUserByEmail(String email);
}
