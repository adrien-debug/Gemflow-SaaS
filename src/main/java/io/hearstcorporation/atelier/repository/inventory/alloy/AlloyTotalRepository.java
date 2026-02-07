package io.hearstcorporation.atelier.repository.inventory.alloy;

import io.hearstcorporation.atelier.model.inventory.InventoryTotalCost;
import io.hearstcorporation.atelier.model.inventory.alloy.Alloy;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.NonNull;

public interface AlloyTotalRepository {

    InventoryTotalCost calculateTotal(@NonNull Specification<Alloy> specification);
}
