package io.hearstcorporation.atelier.repository.user;

import io.hearstcorporation.atelier.model.user.User;
import io.hearstcorporation.atelier.model.user.User_;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    @NonNull
    @EntityGraph(attributePaths = {
            User_.ROLE
    })
    Page<User> findAll(@Nullable Specification<User> spec, @NonNull Pageable pageable);

    @EntityGraph(attributePaths = {
            User_.ROLE
    })
    Optional<User> findByOid(UUID oid);

    @NonNull
    @EntityGraph(attributePaths = {
            User_.ROLE
    })
    Optional<User> findById(@NonNull Long userId);

    Optional<User> findByEmail(@NonNull String email);

    boolean existsByEmail(@NonNull String email);

    List<User> findAllByIdInOrderByIdAsc(List<Long> userIds);

    @Modifying
    @Query("DELETE FROM User u WHERE u.id = :id")
    void deleteById(@NonNull Long id);
}
