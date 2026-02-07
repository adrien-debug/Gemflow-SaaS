package io.hearstcorporation.atelier.repository.setting;

import io.hearstcorporation.atelier.model.setting.Collection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CollectionRepository extends JpaRepository<Collection, Long> {

    @Modifying
    @Query("DELETE FROM Collection c WHERE c.id IN :ids")
    void deleteByIds(List<Long> ids);
}
