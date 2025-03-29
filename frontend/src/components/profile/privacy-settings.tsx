"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useGetUserProfile, useUpdateProfile } from "@/api/user";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export function PrivacySettings() {
  const { toast } = useToast();
  const { data: profileData, isLoading, refetch } = useGetUserProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [preferences, setPreferences] = useState({
    language: "vn",
    currency: "VND",
    notifications: {
      email: false,
      sms: false
    }
  });

  useEffect(() => {
    if (profileData?.preferences) {
      setPreferences({
        language: profileData.preferences.language || "vn",
        currency: profileData.preferences.currency || "VND",
        notifications: {
          email: profileData.preferences.notifications?.email || false,
          sms: profileData.preferences.notifications?.sms || false
        }
      });
    }
  }, [profileData]);

  const handleNotificationChange = (type: 'email' | 'sms', value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value
      }
    }));

    updateProfile({
      preferences: {
        language: preferences.language,
        currency: preferences.currency,
        notifications: {
          ...preferences.notifications,
          [type]: value
        }
      }
    }, {
      onSuccess: () => {
        toast({
          title: "Cài đặt đã được lưu",
          description: "Tùy chọn thông báo của bạn đã được cập nhật",
          variant: "default"
        });
        refetch();
      },
      onError: (error) => {
        const errorMsg = error.message || "Đã xảy ra lỗi khi cập nhật cài đặt";
        setErrorMessage(errorMsg);
        toast({
          title: "Lỗi",
          description: errorMsg,
          variant: "destructive"
        });
        // Revert the state on error
        setPreferences(prev => ({
          ...prev,
          notifications: {
            ...prev.notifications,
            [type]: !value
          }
        }));
      }
    });
  };

  const handlePreferenceChange = (type: 'language' | 'currency', value: string) => {
    setPreferences(prev => ({
      ...prev,
      [type]: value
    }));

    updateProfile({
      preferences: {
        ...preferences,
        [type]: value
      }
    }, {
      onSuccess: () => {
        toast({
          title: "Cài đặt đã được lưu",
          description: `Tùy chọn ${type === 'language' ? 'ngôn ngữ' : 'tiền tệ'} của bạn đã được cập nhật`,
          variant: "default"
        });
        refetch();
      },
      onError: (error) => {
        const errorMsg = error.message || "Đã xảy ra lỗi khi cập nhật cài đặt";
        setErrorMessage(errorMsg);
        toast({
          title: "Lỗi",
          description: errorMsg,
          variant: "destructive"
        });
        // Revert the state on error
        setPreferences(prev => ({
          ...prev,
          [type]: profileData?.preferences?.[type] || (type === 'language' ? 'vn' : 'VND')
        }));
      }
    });
  };

  if (isLoading) {
    return (
      <>
        <CardHeader>
          <CardTitle>Quản lý quyền riêng tư và dữ liệu</CardTitle>
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
        <CardTitle>Quản lý quyền riêng tư và dữ liệu</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {errorMessage && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Lỗi</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Tùy chọn cá nhân</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="language-select" className="font-medium">Ngôn ngữ</Label>
                <div className="text-sm text-muted-foreground">
                  Lựa chọn ngôn ngữ hiển thị
                </div>
              </div>
              <Select 
                value={preferences.language}
                onValueChange={(value) => handlePreferenceChange('language', value)}
                disabled={isPending}
              >
                <SelectTrigger className="w-[180px]" id="language-select">
                  <SelectValue placeholder="Chọn ngôn ngữ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vn">Tiếng Việt</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="jp">日本語</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="currency-select" className="font-medium">Tiền tệ</Label>
                <div className="text-sm text-muted-foreground">
                  Lựa chọn đơn vị tiền tệ
                </div>
              </div>
              <Select 
                value={preferences.currency}
                onValueChange={(value) => handlePreferenceChange('currency', value)}
                disabled={isPending}
              >
                <SelectTrigger className="w-[180px]" id="currency-select">
                  <SelectValue placeholder="Chọn tiền tệ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VND">VND (₫)</SelectItem>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="JPY">JPY (¥)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Thông báo</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications" className="font-medium">Email thông báo</Label>
                <div className="text-sm text-muted-foreground">
                  Nhận thông báo về đặt phòng và ưu đãi qua email
                </div>
              </div>
              <Switch 
                id="email-notifications"
                checked={preferences.notifications.email}
                onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                disabled={isPending}
              />
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="sms-notifications" className="font-medium">Thông báo SMS</Label>
                <div className="text-sm text-muted-foreground">
                  Nhận thông báo về đặt phòng và ưu đãi qua SMS
                </div>
              </div>
              <Switch 
                id="sms-notifications"
                checked={preferences.notifications.sms}
                onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                disabled={isPending}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Dữ liệu cá nhân</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <div className="font-medium">Tải xuống dữ liệu</div>
                <div className="text-sm text-muted-foreground">
                  Tải xuống bản sao dữ liệu của bạn
                </div>
              </div>
              <Button variant="outline">Tải xuống</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <div className="font-medium text-destructive">
                  Xóa tài khoản
                </div>
                <div className="text-sm text-muted-foreground">
                  Xóa vĩnh viễn tài khoản và dữ liệu của bạn
                </div>
              </div>
              <Button variant="destructive">Xóa tài khoản</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
}
