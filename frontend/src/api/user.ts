import { useMutation, useQuery } from "@tanstack/react-query";
import { apiGet, apiPut, handleApiError } from "./api-client";
import { useAuthStore } from "@/store/useAuthStore";

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
  user: {
    id: string;
    username: string;
    email: string;
    phone?: string;
    dob?: string;
    identificationNumber?: string;
    phoneNumber?: string;
    profileImage?: string;
    dateOfBirth?: string;
    emergencyContact?: {
      name?: string;
      relationship?: string;
      phoneNumber? : string;
    };
    preferences?: {
      language?: string;
      currency?: string;
      notifications?: {
        email?: boolean;
        sms?: boolean;
      };
    };
    paymentMethods?: Array<{
      type?: string;
      cardLastFour?: string;
      expiryDate?: string;
      isDefault?: boolean;
    }>;
    verifiedAccount?: boolean;
    isAdmin?: boolean;
  };
}

interface UserProfile {
  id?: string;
  username?: string;
  email: string;
  phone?: string;
  dob?: string;
  identificationNumber?: string;
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
  paymentMethods?: Array<{
    type?: string;
    cardLastFour?: string;
    expiryDate?: string;
    isDefault?: boolean;
  }>;
  verifiedAccount?: boolean;
  isAdmin?: boolean;
}

export const useUpdateProfile = () => {
  const { user, login } = useAuthStore();
  
  return useMutation({
    mutationFn: async (profileData: UpdateProfileRequest) => {
      try {
        const data = await apiPut<UpdateProfileResponse>(
          "/api/v1/user/profile",
          profileData
        );
        return data;
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
    onSuccess: (data) => {
      // Update the user data in the auth store if needed
      if (user) {
        login(
          {
            ...user,
            email: data.user.email,
            name: data.user.username
          }, 
          useAuthStore.getState().token || ""
        );
      }
    }
  });
};

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      try {
        const response = await apiGet<{ success: boolean; user: UserProfile }>("/api/v1/user/profile/info");
        console.log('Profile API Response:', response);
        return response.user;
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
    enabled: !!useAuthStore.getState().token, // Only run if user is authenticated
  });
}; 