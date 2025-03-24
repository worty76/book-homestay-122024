"use client";

import { useState } from "react";
import { PersonalInfo } from "@/components/profile/personal-info";
import { SecuritySettings } from "@/components/profile/security-settings";
import { BookingHistory } from "@/components/profile/booking-history";
import { Companions } from "@/components/profile/companions";
import { PaymentMethods } from "@/components/profile/payment-methods";
import { PrivacySettings } from "@/components/profile/privacy-settings";
import AnotherHeader from "@/components/main/another-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  UserIcon,
  LockIcon,
  CalendarIcon,
  MapPinIcon,
  HeartIcon,
  BookMarked,
} from "lucide-react";

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("personal");

  const menuItems = [
    { id: "personal", icon: UserIcon, label: "Thông tin cá nhân" },
    { id: "security", icon: LockIcon, label: "Cài đặt bảo mật" },
    { id: "bookings", icon: BookMarked, label: "Lịch sử đặt phòng" },
    { id: "companions", icon: CalendarIcon, label: "Người đi cùng" },
    { id: "payment", icon: MapPinIcon, label: "Phương thức thanh toán" },
    {
      id: "privacy",
      icon: HeartIcon,
      label: "Quản lý quyền riêng tư và dữ liệu",
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "personal":
        return <PersonalInfo />;
      case "security":
        return <SecuritySettings />;
      case "bookings":
        return <BookingHistory />;
      case "companions":
        return <Companions />;
      case "payment":
        return <PaymentMethods />;
      case "privacy":
        return <PrivacySettings />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <>
      <AnotherHeader
        title="Hồ sơ của tôi"
        description="Quản lý thông tin cá nhân"
      />

      <div className="container mx-auto py-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-1/4">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <Button
                      key={item.id}
                      variant="ghost"
                      className={`w-full justify-start transition-colors ${
                        activeSection === item.id
                          ? "bg-primary/10 text-primary hover:bg-primary/20"
                          : ""
                      }`}
                      onClick={() => setActiveSection(item.id)}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <Card className="transition-all duration-300">
              {renderContent()}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
