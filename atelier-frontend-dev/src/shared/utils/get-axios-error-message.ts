import axios from "axios";
import { ApiError } from "@shared/types/api-error.type.ts";
import { getFriendlyMessage } from "./get-friendly-message";

export const getAxiosErrorMessage = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    return {
      code: error.response?.status || 500,
      data: { ...error.response?.data, friendlyMessage: getFriendlyMessage(error.response?.data?.errorCode) },
    };
  } else {
    return {
      code: 500,
      data: null,
    };
  }
};
