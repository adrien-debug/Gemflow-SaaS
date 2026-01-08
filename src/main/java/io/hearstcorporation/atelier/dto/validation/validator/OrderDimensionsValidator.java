package io.hearstcorporation.atelier.dto.validation.validator;

import io.hearstcorporation.atelier.dto.model.order.OrderRequestDto;
import io.hearstcorporation.atelier.dto.validation.OrderDimensions;
import io.hearstcorporation.atelier.model.setting.ItemCategory;
import io.hearstcorporation.atelier.util.PatchHelper;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import static io.hearstcorporation.atelier.dto.validation.util.ConstraintValidatorContextHelper.setValidationErrorMessage;

public class OrderDimensionsValidator implements ConstraintValidator<OrderDimensions, OrderRequestDto> {

    private static final String RING_LENGTH_MESSAGE = "Length must be null for item category with id 1 (Ring)";
    private static final String RING_SIZE_SYSTEM_MESSAGE = "Size system must not be null for item category with id 1 (Ring)";
    private static final String RING_FINGER_SIZE_MESSAGE = "Finger size must not be null for item category with id 1 (Ring).";

    private static final String NOT_RING_LENGTH_MESSAGE_TEMPLATE = "Length must not be null for item category with id %d.";
    private static final String NOT_RING_SIZE_SYSTEM_MESSAGE_TEMPLATE = "Size system must be null for item category with id %d.";
    private static final String NOT_RING_FINGER_SIZE_MESSAGE_TEMPLATE = "Finger size must be null for item category with id %d.";

    @Override
    public boolean isValid(OrderRequestDto orderRequestDto, ConstraintValidatorContext constraintValidatorContext) {
        if (orderRequestDto == null || orderRequestDto.getItemCategoryId().isEmpty()) {
            return true;
        }
        boolean isValid = true;
        long itemCategoryId = orderRequestDto.getItemCategoryId().get();
        if (itemCategoryId == ItemCategory.RING_ID) {
            if (PatchHelper.isPresent(orderRequestDto.getLength())) {
                setValidationErrorMessage(RING_LENGTH_MESSAGE, constraintValidatorContext);
                isValid = false;
            }
            if (PatchHelper.isEmpty(orderRequestDto.getSizeSystem())) {
                setValidationErrorMessage(RING_SIZE_SYSTEM_MESSAGE, constraintValidatorContext);
                isValid = false;
            }
            if (PatchHelper.isEmpty(orderRequestDto.getFingerSize())) {
                setValidationErrorMessage(RING_FINGER_SIZE_MESSAGE, constraintValidatorContext);
                isValid = false;
            }
        } else {
            if (PatchHelper.isEmpty(orderRequestDto.getLength())) {
                setValidationErrorMessage(NOT_RING_LENGTH_MESSAGE_TEMPLATE.formatted(itemCategoryId), constraintValidatorContext);
                isValid = false;
            }
            if (PatchHelper.isPresent(orderRequestDto.getSizeSystem())) {
                setValidationErrorMessage(NOT_RING_SIZE_SYSTEM_MESSAGE_TEMPLATE.formatted(itemCategoryId), constraintValidatorContext);
                isValid = false;
            }
            if (PatchHelper.isPresent(orderRequestDto.getFingerSize())) {
                setValidationErrorMessage(NOT_RING_FINGER_SIZE_MESSAGE_TEMPLATE.formatted(itemCategoryId), constraintValidatorContext);
                isValid = false;
            }
        }
        return isValid;
    }
}
