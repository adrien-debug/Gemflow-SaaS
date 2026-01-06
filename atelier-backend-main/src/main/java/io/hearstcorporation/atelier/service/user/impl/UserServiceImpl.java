package io.hearstcorporation.atelier.service.user.impl;

import io.hearstcorporation.atelier.dto.mapper.user.UserMapper;
import io.hearstcorporation.atelier.dto.model.ImageDto;
import io.hearstcorporation.atelier.dto.model.SearchDto;
import io.hearstcorporation.atelier.dto.model.SearchRequestDto;
import io.hearstcorporation.atelier.dto.model.user.CurrentUserUpdateDto;
import io.hearstcorporation.atelier.dto.model.user.UserCreateDto;
import io.hearstcorporation.atelier.dto.model.user.UserDto;
import io.hearstcorporation.atelier.dto.model.user.UserSearchCriteriaDto;
import io.hearstcorporation.atelier.dto.model.user.UserUpdateDto;
import io.hearstcorporation.atelier.dto.model.user.UserWithImageDto;
import io.hearstcorporation.atelier.exception.AlreadyExistsException;
import io.hearstcorporation.atelier.exception.NotFoundException;
import io.hearstcorporation.atelier.model.user.Role;
import io.hearstcorporation.atelier.model.user.User;
import io.hearstcorporation.atelier.pagination.PaginationResolver;
import io.hearstcorporation.atelier.repository.user.UserRepository;
import io.hearstcorporation.atelier.security.SecurityProvider;
import io.hearstcorporation.atelier.service.user.RoleService;
import io.hearstcorporation.atelier.service.user.UserImageService;
import io.hearstcorporation.atelier.service.user.UserService;
import io.hearstcorporation.atelier.specification.user.UserSpecification;
import io.hearstcorporation.atelier.util.ExceptionWrapper;
import io.hearstcorporation.atelier.util.ServiceHelper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleService roleService;
    private final UserImageService userImageService;
    private final PaginationResolver userPaginationResolver;

    @Override
    @Transactional
    public User createUser(UserCreateDto userCreateDto, UUID oid) {
        Role role = roleService.getRole(userCreateDto.getRoleId());
        User user = UserMapper.toUser(userCreateDto, role, oid);
        return userRepository.save(user);
    }

    @Override
    @Transactional
    public void updateUser(User user, UserUpdateDto userUpdateDto) {
        Role role = roleService.getRole(userUpdateDto.getRoleId());
        UserMapper.mapUser(user, userUpdateDto, role);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void updateCurrentUser(CurrentUserUpdateDto currentUserUpdateDto) {
        User user = getCurrentUser();
        UserMapper.mapCurrentUser(user, currentUserUpdateDto);
        user = userRepository.save(user);
        userImageService.updateUserImages(currentUserUpdateDto.getPhotos(), user);
    }

    @Override
    @Transactional
    public void activateUser(User user, boolean active) {
        user.setIsActive(active);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void deleteUser(User user) {
        ExceptionWrapper.onDelete(() -> userRepository.deleteById(user.getId()),
                "User %d cannot be deleted.".formatted(user.getId()));
    }

    @Override
    @Transactional(readOnly = true)
    public void userNotExistsOrThrow(UserCreateDto userCreateDto) {
        if (userRepository.existsByEmail(userCreateDto.getEmail())) {
            throw new AlreadyExistsException("User with email %s already exists".formatted(userCreateDto.getEmail()));
        }
    }

    @Override
    @Transactional
    public UserWithImageDto getUserWithImageDto(User user) {
        if (user == null) {
            return null;
        }
        return UserMapper.toUserWithImageDto(user, userImageService.getImageDtoList(user.getId()));
    }

    @Override
    @Transactional
    public Map<Long, UserWithImageDto> getUserWithImageDtoListMappedById(List<Long> userIds) {
        Map<Long, List<ImageDto>> imagesGroupedByUserId = userImageService.getImageDtoListGroupedByUserId(userIds);

        List<User> users = userRepository.findAllByIdInOrderByIdAsc(userIds);
        ServiceHelper.compareIdsOrThrow(users, userIds, User.class);

        return users.stream().collect(Collectors.toMap(
                        User::getId,
                        user -> UserMapper.toUserWithImageDto(user, imagesGroupedByUserId.getOrDefault(user.getId(), List.of()))
                )
        );
    }

    @Override
    @Transactional(readOnly = true)
    public SearchDto<UserDto> searchUsers(SearchRequestDto<UserSearchCriteriaDto> userSearchQueryDto) {
        Pageable pageable = userPaginationResolver.createPageable(
                userSearchQueryDto.getPage(),
                userSearchQueryDto.getSize(),
                userSearchQueryDto.getSorts()
        );
        Specification<User> specification = UserSpecification.create(userSearchQueryDto.getSearchCriteria());
        Page<User> result = userRepository.findAll(specification, pageable);
        List<Long> userIds = result.getContent().stream().map(User::getId).toList();
        Map<Long, List<ImageDto>> userImagesGroupedByUserId = userImageService.getImageDtoListGroupedByUserId(userIds);
        return UserMapper.toUserListDtoPage(result, userImagesGroupedByUserId);
    }

    @Override
    public UserDto getCurrentUserDto() {
        return getUserDto(SecurityProvider.getCurrentUserId());
    }

    @Override
    public UserDto getUserDto(Long userId) {
        List<ImageDto> userImages = userImageService.getImageDtoList(userId);
        User user = getUser(userId);
        return UserMapper.toUserDto(user, userImages);
    }

    @Override
    public User getCurrentUser() {
        return getUser(SecurityProvider.getCurrentUserId());
    }

    @Override
    public User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found by id %d".formatted(userId)));
    }

    @Override
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
