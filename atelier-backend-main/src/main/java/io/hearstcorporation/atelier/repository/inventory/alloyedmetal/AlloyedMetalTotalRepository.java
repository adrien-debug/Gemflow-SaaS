package io.hearstcorporation.atelier.repository.inventory.alloyedmetal;

import io.hearstcorporation.atelier.model.inventory.InventoryTotalCost;
import io.hearstcorporation.atelier.model.inventory.alloyedmetal.AlloyedMetal;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.NonNull;

public interface AlloyedMetalTotalRepository {

    InventoryTotalCost calculateTotal(@NonNull Specification<AlloyedMetal> specification);
}
