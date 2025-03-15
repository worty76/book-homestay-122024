import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.0.110:3000";

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

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.error || error.message || "An error occurred";
  }
  return "An unexpected error occurred";
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
