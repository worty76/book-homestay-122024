import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPut, apiPost, handleApiError } from "./api-client";
import { useAuthStore } from "@/store/useAuthStore";
import { UserProfile, useProfileStore } from "@/store/useProfileStore";

interface UpdateProfileRequest {
  username?: string;
  email?: string;
  password?: string;
  phone?: string;
  dob?: string;
  identificationNumber?: string;
  currentPassword?: string;
  phoneNumber?: string;
  profileImage?: string;
  dateOfBirth?: string;
  emergencyContact?: {
    name?: string;
    relationship?: string;
    phoneNumber?: string;
  };
  preferences?: {
    language?: string;
    currency?: string;
    notifications?: {
      email?: boolean;
      sms?: boolean;
    };
  };
}

interface UpdateProfileResponse {
  success: boolean;
  message: string;
  user: UserProfile;
}

interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export const useUpdateProfile = () => {
  const { user, login } = useAuthStore();
  const updateProfileStore = useProfileStore((state) => state.updateProfile);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileData: UpdateProfileRequest) => {
      try {
        console.log(
          "Sending profile update with data:",
          JSON.stringify(profileData)
        );

        if (profileData.preferences) {
          if (profileData.preferences.notifications) {
            profileData.preferences.notifications = {
              email: !!profileData.preferences.notifications.email,
              sms: !!profileData.preferences.notifications.sms,
            };
          }
        }

        const data = await apiPut<UpdateProfileResponse>(
          "/api/v1/user/profile",
          profileData
        );
        return data;
      } catch (error) {
        console.error("Profile update error:", error);
        throw new Error(handleApiError(error));
      }
    },
    onSuccess: (data) => {
      if (user) {
        login(
          {
            ...user,
            email: data.user.email,
            name: data.user.username,
          },
          useAuthStore.getState().token || ""
        );
      }

      updateProfileStore(data.user);

      queryClient.setQueryData(["userProfile"], data.user);
    },
  });
};

export const useGetUserProfile = () => {
  const setProfile = useProfileStore((state) => state.setProfile);

  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      try {
        const response = await apiGet<{ success: boolean; user: UserProfile }>(
          "/api/v1/user/profile/info"
        );
        console.log("Profile API Response:", response);

        if (response.user) {
          setProfile(response.user);
        }

        return response.user;
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
    enabled: !!useAuthStore.getState().token,
  });
};

export const prefetchUserProfile = async (queryClient: any) => {
  try {
    const response = await apiGet<{ success: boolean; user: UserProfile }>(
      "/api/v1/user/profile/info"
    );

    useProfileStore.getState().setProfile(response.user);

    queryClient.setQueryData(["userProfile"], response.user);

    return response.user;
  } catch (error) {
    console.error("Error prefetching user profile:", error);
    throw new Error(handleApiError(error));
  }
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (passwordData: ChangePasswordRequest) => {
      try {
        const data = await apiPost<ChangePasswordResponse>(
          "/api/v1/user/change-password",
          passwordData
        );
        return data;
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
  });
};
