package io.hearstcorporation.atelier.repository.setting;

import io.hearstcorporation.atelier.model.setting.SupplyType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SupplyTypeRepository extends JpaRepository<SupplyType, Long> {

    @Modifying
    @Query("DELETE FROM SupplyType st WHERE st.id IN :ids AND st.immutable = false")
    void deleteByIds(List<Long> ids);
}
