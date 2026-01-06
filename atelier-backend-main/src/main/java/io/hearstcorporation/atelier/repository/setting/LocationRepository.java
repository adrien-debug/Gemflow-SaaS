package io.hearstcorporation.atelier.repository.setting;

import io.hearstcorporation.atelier.model.setting.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location, Long> {

    @Modifying
    @Query("DELETE FROM Location l WHERE l.id IN :ids")
    void deleteByIds(List<Long> ids);
}
