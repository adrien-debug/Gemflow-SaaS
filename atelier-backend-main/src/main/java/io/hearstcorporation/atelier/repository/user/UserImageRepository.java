package io.hearstcorporation.atelier.repository.user;

import io.hearstcorporation.atelier.model.user.UserImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserImageRepository extends JpaRepository<UserImage, Long> {

    List<UserImage> findAllByUserId(Long userId);

    List<UserImage> findAllByUserIdIn(List<Long> userIds);

    @Modifying
    @Query("DELETE FROM UserImage ui WHERE ui.user.id = :userId")
    void deleteAllByUserId(Long userId);
}
