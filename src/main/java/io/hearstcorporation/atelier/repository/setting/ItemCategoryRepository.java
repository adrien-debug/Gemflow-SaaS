package io.hearstcorporation.atelier.repository.setting;

import io.hearstcorporation.atelier.model.setting.ItemCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemCategoryRepository extends JpaRepository<ItemCategory, Long> {

    @Modifying
    @Query("DELETE FROM ItemCategory ic WHERE ic.id IN :ids AND ic.immutable = false")
    void deleteByIds(List<Long> ids);
}
