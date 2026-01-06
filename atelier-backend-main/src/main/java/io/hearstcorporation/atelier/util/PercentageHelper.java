package io.hearstcorporation.atelier.util;

import lombok.experimental.UtilityClass;

import java.math.BigDecimal;
import java.math.RoundingMode;

@UtilityClass
public class PercentageHelper {

    public static final BigDecimal ONE_HUNDRED = BigDecimal.valueOf(100);

    public static BigDecimal calculateDifferencePercentage(BigDecimal value, BigDecimal currentValue) {
        if (value.compareTo(currentValue) == 0) {
            return BigDecimal.ZERO;
        }
        //todo: it is not 100, it is infinity, but need to investigate how to handle it
        if (value.compareTo(BigDecimal.ZERO) == 0 && currentValue.compareTo(BigDecimal.ZERO) > 0) {
            return ONE_HUNDRED;
        }
        if (value.compareTo(BigDecimal.ZERO) == 0 && currentValue.compareTo(BigDecimal.ZERO) < 0) {
            return ONE_HUNDRED.negate();
        }
        return currentValue.multiply(ONE_HUNDRED).divide(value, 2, RoundingMode.HALF_UP).subtract(ONE_HUNDRED);
    }
}
