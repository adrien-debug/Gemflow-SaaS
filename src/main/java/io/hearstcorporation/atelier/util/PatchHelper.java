package io.hearstcorporation.atelier.util;

import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.ObjectUtils;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Consumer;
import java.util.function.Function;

@UtilityClass
public class PatchHelper {

    @SuppressWarnings({"OptionalUsedAsFieldOrParameterType"})
    public static <T> boolean isEmpty(Optional<T> optional) {
        return Objects.isNull(optional) || optional.isEmpty();
    }

    @SuppressWarnings({"OptionalUsedAsFieldOrParameterType"})
    public static <T> boolean isPresent(Optional<T> optional) {
        return Objects.nonNull(optional) && optional.isPresent();
    }

    @SuppressWarnings({"OptionalUsedAsFieldOrParameterType"})
    public static <T> Optional<T> emptyIfNull(Optional<T> optional) {
        return ObjectUtils.defaultIfNull(optional, Optional.empty());
    }

    @SuppressWarnings({"OptionalUsedAsFieldOrParameterType"})
    public static <T> T getOrNull(Optional<T> optional) {
        return emptyIfNull(optional).orElse(null);
    }

    @SuppressWarnings({"OptionalUsedAsFieldOrParameterType"})
    public static <T> List<T> getOrEmptyList(Optional<List<T>> optional) {
        return emptyIfNull(optional).orElseGet(List::of);
    }

    @SuppressWarnings({"OptionalUsedAsFieldOrParameterType"})
    public static <T, R> R mapOrNull(Optional<T> optional, Function<T, R> mapper) {
        return emptyIfNull(optional).map(mapper).orElse(null);
    }

    @SuppressWarnings({"OptionalUsedAsFieldOrParameterType"})
    public static <T> void setIfNotNull(Optional<T> optional, Consumer<T> setter) {
        if (Objects.nonNull(optional)) {
            setter.accept(getOrNull(optional));
        }
    }
}
