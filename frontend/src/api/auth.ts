import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { apiPost, handleApiError } from "@/api/api-client";
import { prefetchUserProfile } from "@/api/user";
import { useProfileStore } from "@/store/useProfileStore";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  token: string;
  userId: string;
  email?: string;
  isAdmin: boolean;
}

export const useLogin = () => {
  const { login } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      try {
        const data = await apiPost<LoginResponse>(
          "/api/v1/user/login",
          credentials
        );
        return data;
      } catch (error) {
        console.error("Login request failed:", error);

        throw error;
      }
    },
    onSuccess: async (data, variables) => {
      const user = {
        id: data.userId,
        email: data.email || variables.email,
        isAdmin: data.isAdmin,
      };

      login(user, data.token);

      try {
        await prefetchUserProfile(queryClient);
      } catch (error) {
        console.error("Failed to fetch user profile after login:", error);
      }
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();
  const clearProfile = useProfileStore((state) => state.clearProfile);

  return () => {
    logout();
    clearProfile();
    queryClient.invalidateQueries({ queryKey: ["userProfile"] });
  };
};

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
        console.log("Registration credentials:", credentials);
        console.log("Registration API Response:", data);
        return data;
      } catch (error) {
        console.error("Registration request failed:", error);

        throw error;
      }
    },
    onSuccess: (data, variables) => {
      const user = {
        id: data.userId,
        email: variables.email,
        isAdmin: data.isAdmin,
      };

      console.log("User successfully registered:", user);
      console.log("Token received:", data.token);

      login(user, data.token);
    },
  });
};
