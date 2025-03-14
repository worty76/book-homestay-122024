import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { apiPost, handleApiError } from "@/lib/api-client";

// Login types
interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  token: string;
  userId?: string;
  email?: string;
}

// Login function
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
      // Create user object from response
      const user = {
        id: data.userId || "user-id", // Use actual userId if available
        email: data.email || variables.email,
      };

      login(user, data.token);
    },
  });
};

// Logout function
export const useLogout = () => {
  const { logout } = useAuthStore();

  return () => {
    logout();
    // You could also call a logout endpoint if needed
  };
};
