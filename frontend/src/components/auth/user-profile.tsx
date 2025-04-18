"use client";

import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User, Settings, Bell } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useLogout } from "@/api/auth";
import { toast } from "sonner";
import { useProfileStore } from "@/store/useProfileStore";
import { useTranslation } from "@/hooks/useTranslation";

export function UserProfile() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useAuthStore();
  const profile = useProfileStore((state) => state.profile);
  const logout = useLogout();

  const handleLogout = () => {
    toast.success(t("common.notifications.logoutSuccess"), {
      description: t("common.notifications.logoutSuccessMessage"),
    });
    logout();
    router.push("/login");
  };

  const getInitials = () => {
    if (!user?.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

  const displayName = profile?.username || user?.name || "User";
  const profileImage = profile?.profileImage || "/images/avatar.png";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarImage src={profileImage} alt={user?.email || "User"} />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          <User className="mr-2 h-4 w-4" />
          <span>{t("navigation.profile")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/notifications")}>
          <Bell className="mr-2 h-4 w-4" />
          <span>{t("navigation.notifications")}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t("navigation.logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
