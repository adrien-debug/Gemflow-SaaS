package io.hearstcorporation.atelier.repository.setting;

import io.hearstcorporation.atelier.model.setting.ClientCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClientCategoryRepository extends JpaRepository<ClientCategory, Long> {

    @Modifying
    @Query("DELETE FROM ClientCategory cc WHERE cc.id IN :ids")
    void deleteByIds(List<Long> ids);
}
