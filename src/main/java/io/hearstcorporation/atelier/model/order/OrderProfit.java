package io.hearstcorporation.atelier.model.order;

import io.hearstcorporation.atelier.model.BaseModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "order_profit")
public class OrderProfit extends BaseModel {

    @Column(name = "diamond_profit_percentage", nullable = false)
    private Short diamondProfitPercentage;

    @Column(name = "gemstone_profit_percentage", nullable = false)
    private Short gemstoneProfitPercentage;

    @Column(name = "labour_profit_percentage", nullable = false)
    private Short labourProfitPercentage;

    @Column(name = "metal_profit_percentage", nullable = false)
    private Short metalProfitPercentage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    public OrderProfit() {
        setDiamondProfitPercentage((short) 0);
        setGemstoneProfitPercentage((short) 0);
        setLabourProfitPercentage((short) 0);
        setMetalProfitPercentage((short) 0);
    }
}
