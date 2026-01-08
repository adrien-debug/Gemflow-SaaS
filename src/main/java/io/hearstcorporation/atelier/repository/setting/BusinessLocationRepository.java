package io.hearstcorporation.atelier.repository.setting;

import io.hearstcorporation.atelier.model.setting.BusinessLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BusinessLocationRepository extends JpaRepository<BusinessLocation, Long> {

    @Modifying
    @Query("DELETE FROM BusinessLocation bl WHERE bl.id IN :ids")
    void deleteByIds(List<Long> ids);
}
