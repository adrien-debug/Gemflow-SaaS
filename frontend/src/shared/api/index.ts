import axios, { AxiosInstance, AxiosRequestConfig, HttpStatusCode } from "axios";
import { environment } from "@shared/constants/environment.ts";
import LocalStorageService from "@shared/services/local-storage.service.ts";
import { HeaderName } from "@shared/constants/header-name.ts";
import TokenApi from "@entities/authorization/api/token.api.ts";
import { AuthData } from "@entities/authorization/model/auth-data.model.ts";
import { StorageKey } from "@shared/constants/storage-key.ts";
import { getAxiosErrorMessage } from "@shared/utils/get-axios-error-message.ts";
import { getLoginWithRedirectBackUrl } from "@shared/utils/url-helper.ts";

console.log("Starting API Initialization");

interface TypedAxiosInstance extends AxiosInstance {
  get<T = unknown, R = T>(url: string, config?: AxiosRequestConfig): Promise<R>;
  post<T = unknown, R = T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<R>;
  patch<T = unknown, R = T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<R>;
  put<T = unknown, R = T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<R>;
  delete<T = unknown, R = T>(url: string, config?: AxiosRequestConfig): Promise<R>;
}

const api = axios.create({
  baseURL: environment.baseURL,
  timeout: 10000,
}) as TypedAxiosInstance;

let isRefreshing = false; // Flag to track if the token is currently being refreshed
let refreshSubscribers: ((newToken: string) => void)[] = []; // To hold requests waiting for the token refresh

// Function to call when the token refresh is complete
const onTokenRefreshed = (newAccessToken: string) => {
  refreshSubscribers.forEach((callback) => callback(newAccessToken));
  refreshSubscribers = []; // Reset the array after refreshing
};
// Request interceptor for adding the access token
api.interceptors.request.use(
  (config) => {
    const authData = LocalStorageService.getItem(StorageKey.AuthData) as AuthData; // Or wherever you store your token
    if (authData) {
      config.headers[HeaderName.Authorization] = `Bearer ${authData.access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for handling 401 (Unauthorized) errors and refreshing the token
api.interceptors.response.use(
  (response) => response.data, // If the response is successful, return it
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is a 401 (Unauthorized) and if the access token has expired
    if (error.response && error.response.status === HttpStatusCode.Unauthorized && !originalRequest._retry) {
      if (isRefreshing) {
        // If token is already being refreshed, add the original request to the queue
        return new Promise((resolve) => {
          refreshSubscribers.push((newAccessToken) => {
            // Modify the original request with the new token and retry
            originalRequest.headers[HeaderName.Authorization] = `Bearer ${newAccessToken}`;
            resolve(axios(originalRequest).then((response) => response.data));
          });
        });
      }

      originalRequest._retry = true; // Mark the request as retried
      isRefreshing = true;

      try {
        // Get a new refresh token from the API
        const authData = await TokenApi.refreshAccessToken();

        const newAccessToken = authData.access_token;

        // Save the new tokens in localStorage (or your preferred storage method)
        LocalStorageService.setItem(StorageKey.AuthData, authData);

        // Call all the waiting requests with the new token
        onTokenRefreshed(newAccessToken);

        // Retry the original request with the new access token
        originalRequest.headers[HeaderName.Authorization] = `Bearer ${newAccessToken}`;
        return axios(originalRequest)
          .then((response) => response.data)
          .catch((error) => Promise.reject(getAxiosErrorMessage(error)));
      } catch (refreshError) {
        // If refresh fails, redirect to login page or handle it
        // Optionally clear tokens and redirect user to login
        TokenApi.clearAuthData();
        window.location.href = getLoginWithRedirectBackUrl(); // Redirect to login page
        refreshSubscribers = [];
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // If it's another error or not 401, reject the promise
    return Promise.reject(getAxiosErrorMessage(error));
  },
);

export default api;
