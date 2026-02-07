package io.hearstcorporation.atelier.model.order.stock;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor
public enum OrderStockStatus {
    AVAILABLE("Available"),
    SOLD("Sold"),
    MEMO_OUT("Memo out");

    private final String description;

    public List<OrderStockStatus> getPreviousStatuses() {
        return switch (this) {
            case AVAILABLE -> List.of(MEMO_OUT);
            case MEMO_OUT, SOLD -> List.of(AVAILABLE);
        };
    }
}
