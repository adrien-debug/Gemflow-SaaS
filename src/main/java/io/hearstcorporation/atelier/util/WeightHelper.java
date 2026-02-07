package io.hearstcorporation.atelier.util;

import io.hearstcorporation.atelier.exception.InvalidDataException;
import lombok.experimental.UtilityClass;

import java.math.BigDecimal;

import static io.hearstcorporation.atelier.dto.model.error.ErrorCode.INVALID_PURCHASE_NEW_BATCH_WEIGHT;

@UtilityClass
public class WeightHelper {

    public static BigDecimal getRemainingWeight(BigDecimal newBatchWeight, BigDecimal oldBatchWeight, BigDecimal remainingWeight, Long id) {
        BigDecimal batchWeightDelta = newBatchWeight.subtract(oldBatchWeight);
        BigDecimal newRemainingWeight = remainingWeight.add(batchWeightDelta);
        if (newRemainingWeight.compareTo(BigDecimal.ZERO) < 0) {
            String oldWeightStr = String.format("%.5f", oldBatchWeight);
            String errorMessage = "You can’t make the purchase total weight less that the weight already used in production (%s) for purchase with id %d".formatted(oldWeightStr, id);
            throw new InvalidDataException(INVALID_PURCHASE_NEW_BATCH_WEIGHT, errorMessage);
        }
        return newRemainingWeight;
    }
}
