"use client";

import { useState, useEffect } from "react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/useAuthStore";
import { useGetUserProfile, useUpdateProfile } from "@/api/user";
import { LoaderCircle, Camera, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton"; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function PersonalInfo() {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const { data: profileData, isLoading: isLoadingProfile, refetch } = useGetUserProfile();
  const { mutate: updateProfile, isPending, isError, error } = useUpdateProfile();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
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

  // Reset error when form values change
  useEffect(() => {
    if (errorMessage) {
      setErrorMessage(null);
    }
  }, [formData, errorMessage]);

  // Populate form with user data when available
  useEffect(() => {
    if (profileData) {
      console.log('Profile data loaded in component:', profileData);
      setFormData({
        username: profileData.username || user?.name || "",
        email: profileData.email || user?.email || "",
        phoneNumber: profileData.phoneNumber || "",
        dateOfBirth: profileData.dateOfBirth || "",
        identificationNumber: profileData.identificationNumber || "",
        emergencyContact: {
          name: profileData.emergencyContact?.name || "",
          relationship: profileData.emergencyContact?.relationship || "",
          phoneNumber: profileData.emergencyContact?.phoneNumber || "",
        },
        profileImage: profileData.profileImage || "",
      });
    } else if (user) {
      console.log('User data from auth store:', user);
      setFormData(prevState => ({
        ...prevState,
        username: user.name || "",
        email: user.email || "",
      }));
    }
  }, [profileData, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    
    if (id.startsWith('emergencyContact.')) {
      const field = id.split('.')[1];
      setFormData(prevState => ({
        ...prevState,
        emergencyContact: {
          ...prevState.emergencyContact,
          [field]: value
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [id]: value
      }));
    }
  };

  const validateForm = (): boolean => {
    // Basic validation
    if (!formData.username.trim()) {
      setErrorMessage('Tên người dùng là bắt buộc');
      return false;
    }
    
    if (!formData.email.trim()) {
      setErrorMessage('Email là bắt buộc');
      return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Email không hợp lệ');
      return false;
    }
    
    // Phone number validation (if provided)
    if (formData.phoneNumber && !/^\+?[0-9]{10,}$/.test(formData.phoneNumber)) {
      setErrorMessage('Số điện thoại không hợp lệ');
      return false;
    }
    
    // ID number validation (if provided)
    if (formData.identificationNumber && !/^[0-9]{9,12}$/.test(formData.identificationNumber)) {
      setErrorMessage('Số CMND/CCCD không hợp lệ (phải có 9-12 chữ số)');
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
    
    // Create update payload with all fields
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
      }
    };
    
    updateProfile(updateData, {
      onSuccess: () => {
        toast({
          title: "Cập nhật thành công",
          description: "Thông tin cá nhân của bạn đã được cập nhật.",
          variant: "default"
        });
        // Refetch profile data to show updated information
        refetch();
      },
      onError: (error) => {
        const errorMsg = error.message || "Đã xảy ra lỗi khi cập nhật thông tin.";
        setErrorMessage(errorMsg);
        toast({
          title: "Cập nhật thất bại",
          description: errorMsg,
          variant: "destructive"
        });
      }
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Here you would typically upload the image to your server or cloud storage
      // For now, we'll just use a dummy URL for demonstration
      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prevState => ({
          ...prevState,
          profileImage: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoadingProfile) {
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
        {/* Error Message */}
        {errorMessage && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Lỗi</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {/* Profile Image */}
        <div className="flex justify-center">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={formData.profileImage} alt={formData.username} />
              <AvatarFallback>{formData.username?.substring(0, 2).toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 rounded-full">
              <Label htmlFor="profile-image" className="cursor-pointer">
                <div className="bg-primary rounded-full p-2 text-white">
                  <Camera className="h-4 w-4" />
                </div>
                <input 
                  id="profile-image" 
                  type="file" 
                  accept="image/*"
                  className="sr-only"
                  onChange={handleImageUpload}
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
                <Label htmlFor="username">Tên người dùng <span className="text-destructive">*</span></Label>
                <Input 
                  id="username" 
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Địa chỉ email <span className="text-destructive">*</span></Label>
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
                  value={formData.dateOfBirth ? formData.dateOfBirth.split('T')[0] : ''}
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
            <h3 className="text-lg font-medium mb-4">Thông tin liên hệ khẩn cấp</h3>
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
                <Label htmlFor="emergencyContact.relationship">Mối quan hệ</Label>
                <Input 
                  id="emergencyContact.relationship" 
                  placeholder="Ví dụ: Vợ/chồng, Anh/chị, Bạn"
                  value={formData.emergencyContact.relationship}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact.phoneNumber">Số điện thoại liên hệ</Label>
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
            <Button type="submit" disabled={isPending}>
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
