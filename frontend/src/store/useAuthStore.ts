import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => {
        set({ user, token, isAuthenticated: true });
        Cookies.set(
          "auth-storage",
          encodeURIComponent(
            JSON.stringify({ state: { isAuthenticated: true, token } })
          ),
          { expires: 7 }
        );
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        Cookies.remove("auth-storage");
      },
      reset: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useUser = () => useAuthStore((state) => state.user);
