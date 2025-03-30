"use client";

import { useState, useEffect } from "react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetUserProfile, useUpdateProfile } from "@/api/user";
import { LoaderCircle, Camera, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { toast } from "sonner";
import { useProfileStore } from "@/store/useProfileStore";

export function PersonalInfo() {
  const {
    data: profileData,
    isLoading: isLoadingProfile,
    refetch,
  } = useGetUserProfile();

  const storedProfile = useProfileStore((state) => state.profile);

  const {
    mutate: updateProfile,
    isPending,
    isError,
    error,
  } = useUpdateProfile();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    identificationNumber: "",
    emergencyContact: {
      name: "",
      relationship: "",
      phoneNumber: "",
    },
    profileImage: "",
  });

  useEffect(() => {
    if (errorMessage) {
      setErrorMessage(null);
    }
  }, [formData, errorMessage]);

  useEffect(() => {
    const profile = profileData || storedProfile;

    if (profile) {
      console.log("Profile data loaded in component:", profile);
      setFormData({
        username: profile.username || "",
        email: profile.email || "",
        phoneNumber: profile.phoneNumber || "",
        dateOfBirth: profile.dateOfBirth || "",
        identificationNumber: profile.identificationNumber || "",
        emergencyContact: {
          name: profile.emergencyContact?.name || "",
          relationship: profile.emergencyContact?.relationship || "",
          phoneNumber: profile.emergencyContact?.phoneNumber || "",
        },
        profileImage: profile.profileImage || "",
      });
    }
  }, [profileData, storedProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id.startsWith("emergencyContact.")) {
      const field = id.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        emergencyContact: {
          ...prevState.emergencyContact,
          [field]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const validateForm = (): boolean => {
    if (!formData.username.trim()) {
      setErrorMessage("Tên người dùng là bắt buộc");
      return false;
    }

    if (!formData.email.trim()) {
      setErrorMessage("Email là bắt buộc");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Email không hợp lệ");
      return false;
    }

    if (formData.phoneNumber && !/^\+?[0-9]{10,}$/.test(formData.phoneNumber)) {
      setErrorMessage("Số điện thoại không hợp lệ");
      return false;
    }

    if (
      formData.identificationNumber &&
      !/^[0-9]{9,12}$/.test(formData.identificationNumber)
    ) {
      setErrorMessage("Số CMND/CCCD không hợp lệ (phải có 9-12 chữ số)");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validateForm()) {
      return;
    }

    const updateData = {
      username: formData.username,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      dateOfBirth: formData.dateOfBirth,
      identificationNumber: formData.identificationNumber,
      profileImage: formData.profileImage,
      emergencyContact: {
        name: formData.emergencyContact.name,
        relationship: formData.emergencyContact.relationship,
        phoneNumber: formData.emergencyContact.phoneNumber,
      },
    };

    updateProfile(updateData, {
      onSuccess: () => {
        toast.success("Cập nhật thành công", {
          description: "Thông tin cá nhân của bạn đã được cập nhật.",
        });
        refetch();
      },
      onError: (error) => {
        const errorMsg =
          error.message || "Đã xảy ra lỗi khi cập nhật thông tin.";
        setErrorMessage(errorMsg);
        toast.error("Cập nhật thất bại", {
          description: errorMsg,
        });
      },
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingImage(true);

      toast.info("Đang tải lên...", {
        description: "Hình ảnh đang được tải lên, vui lòng đợi.",
      });

      const userId = profileData?.id || storedProfile?.id;

      const result = await uploadToCloudinary(file, "profile-images", userId);

      setFormData((prevState) => ({
        ...prevState,
        profileImage: result.secure_url,
      }));

      toast.success("Tải lên thành công", {
        description: "Hình ảnh đã được tải lên thành công.",
      });
    } catch (error) {
      console.error("Error uploading image:", error);

      toast.error("Lỗi tải lên", {
        description:
          error instanceof Error
            ? error.message
            : "Đã xảy ra lỗi khi tải lên hình ảnh.",
      });
    } finally {
      setIsUploadingImage(false);
    }
  };

  if (isLoadingProfile) {
    if (!isMounted) {
      return (
        <>
          <CardHeader>
            <CardTitle>Thông tin cá nhân</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
            </div>
          </CardContent>
        </>
      );
    }

    return (
      <>
        <CardHeader>
          <CardTitle>Thông tin cá nhân</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center mb-6">
            <div className="h-24 w-24 rounded-full">
              <Skeleton className="h-full w-full rounded-full" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-20">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="h-10 w-full">
                  <Skeleton className="h-full w-full" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </>
    );
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Thông tin cá nhân</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {errorMessage && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Lỗi</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-center">
          <div className="relative">
            <Avatar className="h-24 w-24">
              {isUploadingImage ? (
                <div className="h-full w-full flex items-center justify-center bg-muted">
                  <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <>
                  <AvatarImage
                    src={formData.profileImage}
                    alt={formData.username}
                  />
                  <AvatarFallback>
                    {formData.username?.substring(0, 2).toUpperCase() || "U"}
                  </AvatarFallback>
                </>
              )}
            </Avatar>
            <div className="absolute bottom-0 right-0 rounded-full">
              <Label
                htmlFor="profile-image"
                className={`cursor-pointer ${
                  isUploadingImage ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <div className="bg-primary rounded-full p-2 text-white">
                  <Camera className="h-4 w-4" />
                </div>
                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleImageUpload}
                  disabled={isUploadingImage}
                />
                <span className="sr-only">Upload profile picture</span>
              </Label>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Thông tin cơ bản</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">
                  Tên người dùng <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">
                  Địa chỉ email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Số điện thoại</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Thêm số điện thoại"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  placeholder="Nhập ngày sinh"
                  value={
                    formData.dateOfBirth
                      ? formData.dateOfBirth.split("T")[0]
                      : ""
                  }
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="identificationNumber">CMND/CCCD</Label>
                <Input
                  id="identificationNumber"
                  placeholder="CMND/CCCD"
                  value={formData.identificationNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-4">
              Thông tin liên hệ khẩn cấp
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContact.name">Tên người liên hệ</Label>
                <Input
                  id="emergencyContact.name"
                  placeholder="Người liên hệ khẩn cấp"
                  value={formData.emergencyContact.name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact.relationship">
                  Mối quan hệ
                </Label>
                <Input
                  id="emergencyContact.relationship"
                  placeholder="Ví dụ: Vợ/chồng, Anh/chị, Bạn"
                  value={formData.emergencyContact.relationship}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact.phoneNumber">
                  Số điện thoại liên hệ
                </Label>
                <Input
                  id="emergencyContact.phoneNumber"
                  type="tel"
                  placeholder="Số điện thoại liên hệ khẩn cấp"
                  value={formData.emergencyContact.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isPending}
              className="bg-[#5d8b40] hover:bg-[#5d8b40]/90"
            >
              {isPending ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                "Lưu thay đổi"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </>
  );
}
