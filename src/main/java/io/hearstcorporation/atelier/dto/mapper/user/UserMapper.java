package io.hearstcorporation.atelier.dto.mapper.user;

import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.user.CurrentUserUpdateDto;
import io.hearstcorporation.atelier.dto.model.user.RoleDto;
import io.hearstcorporation.atelier.dto.model.user.UserCreateDto;
import io.hearstcorporation.atelier.dto.model.user.UserDto;
import io.hearstcorporation.atelier.dto.model.user.UserShortDto;
import io.hearstcorporation.atelier.dto.model.user.UserUpdateDto;
import io.hearstcorporation.atelier.dto.model.user.UserWithImageDto;
import io.hearstcorporation.atelier.model.user.Role;
import io.hearstcorporation.atelier.model.user.User;
import lombok.experimental.UtilityClass;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@UtilityClass
public class UserMapper {

    public static User toUser(UserCreateDto userCreateDto, Role role, UUID oid) {
        User user = new User();
        user.setOid(oid);
        user.setEmail(userCreateDto.getEmail());
        UserMapper.mapUser(user, userCreateDto, role);
        return user;
    }

    public static void mapUser(User user, UserUpdateDto userUpdateDto, Role role) {
        user.setFirstName(userUpdateDto.getFirstName());
        user.setLastName(userUpdateDto.getLastName());
        user.setRole(role);
    }

    public static void mapCurrentUser(User user, CurrentUserUpdateDto currentUserUpdateDto) {
        user.setFirstName(currentUserUpdateDto.getFirstName());
        user.setLastName(currentUserUpdateDto.getLastName());
    }

    public static UserDto toUserDto(User user, List<ImageDto> userImages) {
        if (user == null) {
            return null;
        }
        RoleDto role = RoleMapper.toRoleDto(user.getRole());
        return new UserDto(user.getId(), user.getEmail(), user.getFirstName(), user.getLastName(),
                UserMapper.toFullName(user), role, user.getIsActive(), userImages);
    }

    public static SearchDto<UserDto> toUserListDtoPage(Page<User> userPage,
                                                       Map<Long, List<ImageDto>> userImagesGroupedByUserId) {
        return new SearchDto<>(
                userPage.getContent().stream()
                        .map(user -> UserMapper.toUserDto(user, userImagesGroupedByUserId.get(user.getId())))
                        .toList(),
                userPage.getNumber(),
                userPage.getSize(),
                userPage.getTotalPages(),
                userPage.getTotalElements()
        );
    }

    //todo: Make it generated column in database
    public static String toFullName(User user) {
        if (user == null) {
            return null;
        }
        return user.getFirstName() + " " + user.getLastName();
    }

    public static UserWithImageDto toUserWithImageDto(User entity, List<ImageDto> employeeImages) {
        if (entity == null) {
            return null;
        }
        return UserWithImageDto.builder()
                .id(entity.getId())
                .firstName(entity.getFirstName())
                .lastName(entity.getLastName())
                .fullName(toFullName(entity))
                .photos(employeeImages)
                .build();
    }

    public static UserShortDto toUserShortDto(User entity) {
        if (entity == null) {
            return null;
        }
        return UserShortDto.builder()
                .id(entity.getId())
                .firstName(entity.getFirstName())
                .lastName(entity.getLastName())
                .fullName(toFullName(entity))
                .build();
    }
}
