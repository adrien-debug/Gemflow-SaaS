package io.hearstcorporation.atelier.repository.logo;

import io.hearstcorporation.atelier.model.logo.HallmarkLogo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;

import java.util.List;

public interface HallmarkLogoRepository extends JpaRepository<HallmarkLogo, Long> {

    List<HallmarkLogo> findAllByIdInOrderByIdAsc(List<Long> ids);

    @Modifying
    @Query("DELETE FROM HallmarkLogo hl WHERE hl.id = :id")
    void deleteById(@NonNull Long id);
}
