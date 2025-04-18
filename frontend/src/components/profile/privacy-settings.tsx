"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useGetUserProfile, useUpdateProfile } from "@/api/user";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/hooks/useTranslation";

export function PrivacySettings() {
  const { t } = useTranslation();
  const { data: profileData, isLoading, refetch } = useGetUserProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [preferences, setPreferences] = useState({
    language: "en",
    currency: "VND",
    notifications: {
      email: false,
      sms: false,
    },
  });

  useEffect(() => {
    if (profileData?.preferences) {
      setPreferences({
        language: profileData.preferences.language || "en",
        currency: profileData.preferences.currency || "VND",
        notifications: {
          email: profileData.preferences.notifications?.email || false,
          sms: profileData.preferences.notifications?.sms || false,
        },
      });
    }
  }, [profileData]);

  const handleNotificationChange = (type: "email" | "sms", value: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value,
      },
    }));

    const updatedPreferences = {
      language: preferences.language,
      currency: preferences.currency,
      notifications: {
        email: type === "email" ? value : preferences.notifications.email,
        sms: type === "sms" ? value : preferences.notifications.sms,
      },
    };

    updateProfile(
      {
        username: profileData?.username,
        email: profileData?.email,
        phoneNumber: profileData?.phoneNumber,
        preferences: updatedPreferences,
      },
      {
        onSuccess: () => {
          toast.success(t("common.notifications.success"), {
            description:
              t("profile.preferences") + " " + t("profile.settings.updated"),
          });
          refetch();
        },
        onError: (error) => {
          const errorMsg = error.message || t("common.notifications.error");
          setErrorMessage(errorMsg);
          toast.error(errorMsg);
          setPreferences((prev) => ({
            ...prev,
            notifications: {
              ...prev.notifications,
              [type]: !value,
            },
          }));
        },
      }
    );
  };

  const handlePreferenceChange = (
    type: "language" | "currency",
    value: string
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [type]: value,
    }));

    const updatedPreferences = {
      language: type === "language" ? value : preferences.language,
      currency: type === "currency" ? value : preferences.currency,
      notifications: {
        email: preferences.notifications.email,
        sms: preferences.notifications.sms,
      },
    };

    updateProfile(
      {
        username: profileData?.username,
        email: profileData?.email,
        phoneNumber: profileData?.phoneNumber,
        preferences: updatedPreferences,
      },
      {
        onSuccess: () => {
          toast.success(t("common.notifications.success"), {
            description:
              t("profile.preferences") + " " + t("profile.settings.updated"),
          });
          refetch();
        },
        onError: (error) => {
          const errorMsg = error.message || t("common.notifications.error");
          setErrorMessage(errorMsg);
          toast.error(errorMsg);
          setPreferences((prev) => ({
            ...prev,
            [type]:
              profileData?.preferences?.[type] ||
              (type === "language" ? "en" : "VND"),
          }));
        },
      }
    );
  };

  if (isLoading) {
    return (
      <>
        <CardHeader>
          <CardTitle>{t("profile.privacy")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="h-6 w-40">
              <Skeleton className="h-full w-full" />
            </div>
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="h-5 w-36">
                        <Skeleton className="h-full w-full" />
                      </div>
                      <div className="h-4 w-60">
                        <Skeleton className="h-full w-full" />
                      </div>
                    </div>
                    <div className="h-6 w-12">
                      <Skeleton className="h-full w-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </>
    );
  }

  return (
    <>
      <CardHeader>
        <CardTitle>{t("profile.privacy")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {errorMessage && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t("common.notifications.error")}</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t("profile.preferences")}</h3>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">
                    {t("profile.fields.language")}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {t("profile.settings.languageDescription")}
                  </p>
                </div>
                <Select
                  defaultValue={preferences.language}
                  onValueChange={(value) =>
                    handlePreferenceChange("language", value)
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue
                      placeholder={t("profile.settings.selectLanguage")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="vi">Tiếng Việt</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">
                    {t("profile.fields.currency")}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {t("profile.settings.currencyDescription")}
                  </p>
                </div>
                <Select
                  defaultValue={preferences.currency}
                  onValueChange={(value) =>
                    handlePreferenceChange("currency", value)
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue
                      placeholder={t("profile.settings.selectCurrency")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VND">VND (₫)</SelectItem>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {t("profile.notifications")}
          </h3>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">
                    {t("profile.settings.emailNotifications")}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {t("profile.settings.emailNotificationsDescription")}
                  </p>
                </div>
                <Switch
                  checked={preferences.notifications.email}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("email", checked)
                  }
                />
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">
                    {t("profile.settings.smsNotifications")}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {t("profile.settings.smsNotificationsDescription")}
                  </p>
                </div>
                <Switch
                  checked={preferences.notifications.sms}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("sms", checked)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
}
