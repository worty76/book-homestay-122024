import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { apiPost, handleApiError } from "@/api/api-client";

// Login types
interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  token: string;
  userId: string;
  isAdmin: boolean;
  email?: string;
}

export const useLogin = () => {
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      try {
        const data = await apiPost<LoginResponse>(
          "/api/v1/user/login",
          credentials
        );
        return data;
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
    onSuccess: (data, variables) => {
      const user = {
        id: data.userId,
        email: data.email || variables.email,
        isAdmin: data.isAdmin,
      };

      login(user, data.token);
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuthStore();

  return () => {
    logout();
  };
};

// Register types
interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  identificationNumber: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
  userId: string;
  token: string;
  isAdmin: boolean;
}

export const useRegister = () => {
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: RegisterCredentials) => {
      try {
        const data = await apiPost<RegisterResponse>(
          "/api/v1/user/register",
          credentials
        );
        return data;
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
    onSuccess: (data, variables) => {
      // Automatically log in the user after successful registration
      const user = {
        id: data.userId,
        email: variables.email,
        isAdmin: data.isAdmin,
      };

      login(user, data.token);
    },
  });
};
