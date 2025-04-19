"use client";

import { useState, useEffect } from "react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChangePassword } from "@/api/user";
import { LoaderCircle, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";

export function SecuritySettings() {
  const { t } = useTranslation();
  const { mutate: changePassword, isPending } = useChangePassword();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    if (errorMessage) setErrorMessage(null);
    if (successMessage) setSuccessMessage(null);
  };

  const validatePasswordForm = (): boolean => {
    if (!formData.currentPassword) {
      setErrorMessage("Please enter your current password");
      return false;
    }

    if (!formData.newPassword) {
      setErrorMessage("Please enter a new password");
      return false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.newPassword)) {
      setErrorMessage(
        "New password must be at least 8 characters and include uppercase, lowercase, and numbers"
      );
      return false;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      setErrorMessage("Confirm password does not match");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!validatePasswordForm()) {
      return;
    }

    changePassword(formData, {
      onSuccess: (data) => {
        setSuccessMessage("Your password has been updated successfully");
        toast.success("Your password has been updated");

        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      },
      onError: (error) => {
        const errorMsg =
          error.message || "An error occurred while updating the password";
        setErrorMessage(errorMsg);

        if (errorMsg.includes("401") || errorMsg.includes("incorrect")) {
          setErrorMessage("Current password is incorrect");
        } else if (errorMsg.includes("400") || errorMsg.includes("match")) {
          setErrorMessage("New password and confirm password do not match");
        } else if (errorMsg.includes("404")) {
          setErrorMessage("User information not found");
        }

        toast.error("Error updating password!");
      },
    });
  };

  return (
    <>
      <CardHeader>
        <CardTitle>{t("profile.security")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {errorMessage && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {successMessage && (
          <Alert variant="default" className="bg-green-50 border-green-200">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Change Password</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full aspect-square"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showCurrentPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full aspect-square"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showNewPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Password must be at least 8 characters with uppercase,
                  lowercase, and numbers
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmNewPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmNewPassword}
                    onChange={handleChange}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full aspect-square"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showConfirmPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
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
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </>
  );
}
