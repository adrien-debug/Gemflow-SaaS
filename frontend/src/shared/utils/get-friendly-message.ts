import { ApiErrorCodes } from "@shared/constants/api-error-codes";

export const FriendlyMessagesNameMap: Record<ApiErrorCodes, string> = {
  [ApiErrorCodes.CANNOT_DELETE]: "The parameters are used in the system and can't be deleted",
  [ApiErrorCodes.CANNOT_MOVE_ORDER_TO_STOCK_TASKS_NOT_COMPLETED]:
    "The order has unfinished tasks and can't be moved to Stock",
  [ApiErrorCodes.CHANGE_ASSIGNED_STATUS_ERROR]: "Status cannot be moved to Returned from Assigned status",
  [ApiErrorCodes.CHANGE_MEMO_OUT_STATUS_ORDER_ERROR]:
    "Status can be moved only to Assigned from Memo Out because gemstone assigned to order",
  [ApiErrorCodes.CHANGE_MEMO_OUT_STATUS_NO_ORDER_ERROR]:
    "Status can be moved only to Available or Returned from Memo Out because gemstone does not assigned to order",
  [ApiErrorCodes.CHANGE_AVAILABLE_STATUS_NO_ORDER_ERROR]:
    "Status Available cannot be moved to Assigned manually when gemstone does not assigned to order",
  [ApiErrorCodes.CHANGE_AVAILABLE_STATUS_ORDER_ERROR]: "Status Available cannot be moved to Sold",
  [ApiErrorCodes.CHANGE_SOLD_RETURNED_STATUS_ERROR]: "Statuses Sold and Returned cannot be changed",
  [ApiErrorCodes.CANNOT_DELETE_ORDER_WITH_LABOUR_ERROR]:
    "You can't delete the order because it has tracked labour efforts",
  [ApiErrorCodes.CHANGE_ASSIGNED_GEMSTONE_STATUS_ERROR]:
    "Status cannot be changed because it is assigned to the order.",
  [ApiErrorCodes.INVALID_DATA]: "Failed to perform the operation at this time. Please try again later",
};

export const getFriendlyMessage = (data: ApiErrorCodes): string => {
  return FriendlyMessagesNameMap[data];
};
