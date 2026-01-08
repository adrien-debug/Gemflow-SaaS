import { HttpStatusCode } from "axios";

interface ErrorDescription {
  errorCode: string;
  message: string;
  developerMessage: string;
  timestamp: string;
  validationErrors: null | object;
  friendlyMessage: string;
}

export interface ApiError {
  code: HttpStatusCode;
  data: ErrorDescription | null;
}
