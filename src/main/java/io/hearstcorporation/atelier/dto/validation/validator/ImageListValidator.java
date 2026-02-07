package io.hearstcorporation.atelier.dto.validation.validator;

import io.hearstcorporation.atelier.dto.model.ImageRequestDto;
import io.hearstcorporation.atelier.dto.validation.ImageList;
import io.hearstcorporation.atelier.model.ImageSizeType;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.mutable.MutableBoolean;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;

import static io.hearstcorporation.atelier.dto.validation.util.ConstraintValidatorContextHelper.setValidationErrorMessage;

public class ImageListValidator implements ConstraintValidator<ImageList, List<ImageRequestDto>> {

    private static final String IMAGE_LIST_SIZE_MESSAGE_TEMPLATE = "Image list size must not be more than the number of image type sizes (%d)";
    private static final String SIZE_TYPE_UNIQUE_MESSAGE_TEMPLATE = "Size type %s is not unique";

    @Override
    public boolean isValid(List<ImageRequestDto> imageRequests, ConstraintValidatorContext constraintValidatorContext) {
        if (CollectionUtils.isEmpty(imageRequests)) {
            return true;
        }
        MutableBoolean isValid = new MutableBoolean(true);
        int validSize = ImageSizeType.values().length;
        if (imageRequests.size() > validSize) {
            setValidationErrorMessage(IMAGE_LIST_SIZE_MESSAGE_TEMPLATE.formatted(validSize), constraintValidatorContext);
            isValid.setFalse();
        }
        Map<ImageSizeType, Long> imageSizeTypesCount = imageRequests.stream()
                .map(ImageRequestDto::getSizeType)
                .filter(Objects::nonNull)
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
        imageSizeTypesCount.entrySet().stream()
                .filter(entry -> entry.getValue() > 1)
                .forEach(entry -> {
                    setValidationErrorMessage(SIZE_TYPE_UNIQUE_MESSAGE_TEMPLATE.formatted(entry.getKey()), constraintValidatorContext);
                    isValid.setFalse();
                });
        return isValid.booleanValue();
    }
}
