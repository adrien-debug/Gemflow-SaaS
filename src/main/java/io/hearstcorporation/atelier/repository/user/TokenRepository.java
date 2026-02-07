package io.hearstcorporation.atelier.repository.user;

import io.hearstcorporation.atelier.model.user.Token;
import io.hearstcorporation.atelier.model.user.TokenType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;

import java.util.Optional;
import java.util.UUID;

public interface TokenRepository extends JpaRepository<Token, Long> {

    Optional<Token> findByUserIdAndType(Long userId, TokenType type);

    Optional<Token> findByValueAndType(UUID tokenValue, TokenType type);

    @Modifying
    @Query("DELETE FROM Token t WHERE t.id = :id")
    void deleteById(@NonNull Long id);
}
