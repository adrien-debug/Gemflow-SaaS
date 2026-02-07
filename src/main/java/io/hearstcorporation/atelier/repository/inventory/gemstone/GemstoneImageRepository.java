package io.hearstcorporation.atelier.repository.inventory.gemstone;

import io.hearstcorporation.atelier.model.inventory.gemstone.GemstoneImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GemstoneImageRepository extends JpaRepository<GemstoneImage, Long> {

    List<GemstoneImage> findAllByGemstoneIdOrderByIdAsc(Long gemstoneId);

    List<GemstoneImage> findAllByGemstoneIdInOrderByIdAsc(List<Long> gemstoneIds);

    @Modifying
    @Query("DELETE FROM GemstoneImage gi WHERE gi.gemstone.id = :gemstoneId")
    void deleteAllByGemstoneId(Long gemstoneId);
}
