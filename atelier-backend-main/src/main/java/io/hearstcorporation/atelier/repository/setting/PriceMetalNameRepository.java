package io.hearstcorporation.atelier.repository.setting;

import io.hearstcorporation.atelier.model.setting.PriceMetalName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PriceMetalNameRepository extends JpaRepository<PriceMetalName, Long> {

    @Modifying
    @Query("DELETE FROM PriceMetalName pmn WHERE pmn.id IN :ids")
    void deleteByIds(List<Long> ids);
}
