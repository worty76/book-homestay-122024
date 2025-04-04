import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import Cookies from "js-cookie";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export interface ApiErrorResponse {
  code?: string;
  message: string;
  status?: number;
  details?: Record<string, any>;
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const statusCode = error.response.status;
      const responseData = error.response.data as any;

      if (responseData) {
        const enhancedData: ApiErrorResponse = {
          code: responseData.code || `HTTP_${statusCode}`,
          message:
            responseData.message ||
            responseData.error ||
            error.message ||
            "An error occurred",
          status: statusCode,
          details: responseData.details || responseData,
        };

        error.response.data = enhancedData;
      }

      if (statusCode === 401) {
        toast.error("Phiên đăng nhập đã hết hạn", {
          description: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
        });

        useAuthStore.getState().logout();

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export const handleApiError = (error: unknown): string => {
  let errorResponse: ApiErrorResponse;

  if (axios.isAxiosError(error)) {
    // If our interceptor already formatted the error, use it
    const responseData = error.response?.data as ApiErrorResponse;
    if (
      responseData &&
      typeof responseData === "object" &&
      "code" in responseData
    ) {
      errorResponse = responseData;
    } else {
      errorResponse = {
        code: `HTTP_${error.response?.status || "UNKNOWN"}`,
        message:
          error.response?.data?.message || error.message || "An error occurred",
        status: error.response?.status,
        details: error.response?.data,
      };
    }
  } else if (error instanceof Error) {
    errorResponse = {
      code: "UNKNOWN_ERROR",
      message: error.message || "An unexpected error occurred",
    };
  } else {
    errorResponse = {
      code: "UNKNOWN_ERROR",
      message: "An unexpected error occurred",
    };
  }

  // Return the message as a string
  return errorResponse.message;
};

export function createCancelableRequest<T>(requestFn: () => Promise<T>) {
  const source = axios.CancelToken.source();
  const promise = requestFn().catch((error) => {
    if (axios.isCancel(error)) {
      console.log("Request canceled:", error.message);
    }
    throw error;
  });

  return {
    promise,
    cancel: () => source.cancel("Request canceled by user"),
  };
}

export const apiGet = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.get<T>(url, config);
  return response.data;
};

export const apiPost = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.post<T>(url, data, config);
  return response.data;
};

export const apiPut = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.put<T>(url, data, config);
  return response.data;
};

export const apiDelete = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.delete<T>(url, config);
  return response.data;
};

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
    isAdmin: boolean;
  };
}

export const login = async (credentials: {
  username: string;
  password: string;
}) => {
  const response = await apiPost<LoginResponse>("/login", credentials);
  const { token, user } = response;
  useAuthStore.getState().login(user, token);
  Cookies.set(
    "auth-storage",
    encodeURIComponent(
      JSON.stringify({ state: { isAuthenticated: true, token } })
    ),
    { expires: 7 }
  );
  return response;
};
