package io.hearstcorporation.atelier.dto.model.error;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    INTERNAL_SERVER_ERROR("The action cannot be performed at the moment. Please try again later."),
    NOT_FOUND("No data found."),
    ALREADY_EXISTS("Data already exists."),
    CANNOT_DELETE("Data cannot be deleted."),
    KEYCLOAK_ERROR("The action cannot be performed at the moment. Please try again later."),
    EMAIL_ERROR("The action cannot be performed at the moment. Please try again later."),
    TOKEN_EXPIRED("Sorry, this link expired. Please ask platform admin to resend it."),
    UNAUTHORIZED("User is not logged in."),
    ACCESS_DENIED("Insufficient permissions to perform the operation."),
    NO_RESOURCE_FOUND("Sorry we couldn't find that page."),
    METHOD_NOT_ALLOWED("The request method is not supported."),
    INVALID_REQUEST("The request is incorrect."),
    INVALID_PARAMETERS("Specified parameters are incorrect."),
    INVALID_DATA("Specified request is incorrect."),
    ILLEGAL_STATE("The action cannot be performed because of illegal state or conditions."),
    FILE_UPLOAD_ERROR("The action cannot be performed at the moment. Please try again later."),
    FILE_DELETE_ERROR("The action cannot be performed at the moment. Please try again later."),
    INCORRECT_PASSWORD("The password cannot be updated. Please verify your password."),

    CHANGE_ASSIGNED_GEMSTONE_STATUS_ERROR("The status of the gemstone cannot be changed because it is assigned to the order."),
    CANNOT_DELETE_ORDER_WITH_LABOUR_ERROR("You can't delete the order because it has tracked labour efforts."),
    CANNOT_MOVE_ORDER_TO_STOCK_TASKS_NOT_COMPLETED("The order has unfinished tasks and can't be moved to Stock."),
    CANNOT_MOVE_ORDER_TO_STOCK_CASTING_NOT_COMPLETED("The order has unfinished casting and can't be moved to Stock."),
    INVALID_PURCHASE_NEW_BATCH_WEIGHT("You can’t make the purchase total weight less that the weight already used in production."),
    PURE_METAL_NOT_ENOUGH("Not enough weight in pure metal."),
    ALLOY_NOT_ENOUGH("Not enough weight in alloy."),
    ALLOYED_METAL_NOT_ENOUGH("Not enough weight in alloyed metal."),
    ORDER_METAL_NOT_ENOUGH("Not enough weight of metal in order."),
    ORDER_TASK_NOT_COMPLETED("Order task is not completed.");

    private final String message;

    @JsonValue
    private String getCode() {
        return this.name();
    }

}
