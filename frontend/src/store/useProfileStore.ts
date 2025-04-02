import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PaymentMethod {
  type: string;
  cardLastFour: string;
  expiryDate: string;
  isDefault: boolean;
}

export interface UserProfile {
  id?: string;
  username?: string;
  email: string;
  phoneNumber?: string;
  profileImage?: string;
  dateOfBirth?: string;
  identificationNumber?: string;
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
  verifiedAccount?: boolean;
  paymentMethods?: PaymentMethod[];
}

interface ProfileState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  setProfile: (profile: UserProfile) => void;
  updateProfile: (profileData: Partial<UserProfile>) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      isLoading: false,
      error: null,
      setProfile: (profile) => set({ profile, isLoading: false, error: null }),
      updateProfile: (profileData) =>
        set((state) => ({
          profile: state.profile
            ? { ...state.profile, ...profileData }
            : (profileData as UserProfile),
        })),
      clearProfile: () => set({ profile: null }),
    }),
    {
      name: "user-profile-storage",
      partialize: (state) => ({
        profile: state.profile,
      }),
    }
  )
);
