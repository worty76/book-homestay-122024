"use client";

import {
  SquareUser,
  Maximize,
  Building2,
  Users,
  Mountain,
  Bed,
  Clock,
  Ban,
  Home,
  Bath,
  MapPin,
  Waves,
  Star,
  Wifi,
  CircleDollarSign,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RoomDetailDisplay } from "@/types/room";
import { Badge } from "@/components/ui/badge";

interface RoomDetailsProps {
  room: RoomDetailDisplay;
}

export default function RoomDetails({ room }: RoomDetailsProps) {
  return (
    <Card className="mb-8 border-0">
      <CardHeader className="pb-2">
        <div className="flex items-center mb-1">
          <div className="h-0.5 w-5 bg-[#9C6B4A] mr-2"></div>
          <CardTitle className="text-2xl text-[#0a3b33] font-bold">
            Chi tiết phòng
          </CardTitle>
        </div>
        <CardDescription className="text-[#0a3b33]/70">
          Thông tin về phòng và tiện nghi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <DetailItem
            icon={<SquareUser className="text-[#5a8d69]" />}
            label="Loại phòng"
            value={
              room.category === "room"
                ? "Phòng tiêu chuẩn"
                : room.category === "double"
                ? "Phòng đôi"
                : room.category
            }
          />

          <DetailItem
            icon={<Maximize className="text-[#5a8d69]" />}
            label="Diện tích"
            value={`${room.size} m²`}
          />

          <DetailItem
            icon={<Building2 className="text-[#5a8d69]" />}
            label="Tầng"
            value={`Tầng ${room.floor}`}
          />

          <DetailItem
            icon={<Users className="text-[#5a8d69]" />}
            label="Sức chứa"
            value={`${room.maxCapacity} người`}
          />
        </div>

        <div className="bg-[#f8f3e9] p-5 rounded-lg mb-6 border border-[#5a8d69]/10 shadow-sm">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Bed className="h-5 w-5 text-[#9C6B4A]" />
            <span className="text-[#0a3b33]">Thông tin giường ngủ</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {room.bedsDescription?.map((bed, index) => (
              <div
                key={bed._id || index}
                className="bg-white p-3 rounded-lg text-center border border-[#5a8d69]/10 shadow-sm"
              >
                <span className="block text-lg font-medium text-[#0a3b33]">
                  {bed.count}x
                </span>
                <span className="text-[#0a3b33]/70">{bed.type} Bed</span>
              </div>
            ))}
            <div className="bg-white p-3 rounded-lg text-center border border-[#5a8d69]/10 shadow-sm">
              <span className="block text-lg font-medium text-[#0a3b33]">
                {room.bathrooms}
              </span>
              <span className="text-[#0a3b33]/70">Phòng tắm</span>
            </div>
            {room.bedrooms && (
              <div className="bg-white p-3 rounded-lg text-center border border-[#5a8d69]/10 shadow-sm">
                <span className="block text-lg font-medium text-[#0a3b33]">
                  {room.bedrooms}
                </span>
                <span className="text-[#0a3b33]/70">Phòng ngủ</span>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#9C6B4A]" />
            <span className="text-[#0a3b33]">Thời gian nhận & trả phòng</span>
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#f8f3e9] p-4 rounded-lg border border-[#5a8d69]/10 shadow-sm">
              <p className="text-[#0a3b33]/70">Nhận phòng:</p>
              <p className="text-[#0a3b33] font-medium">
                Từ {room.checkInTime}
              </p>
            </div>
            <div className="bg-[#f8f3e9] p-4 rounded-lg border border-[#5a8d69]/10 shadow-sm">
              <p className="text-[#0a3b33]/70">Trả phòng:</p>
              <p className="text-[#0a3b33] font-medium">
                Trước {room.checkOutTime}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Wifi className="h-5 w-5 text-[#9C6B4A]" />
            <span className="text-[#0a3b33]">Tiện nghi nổi bật</span>
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {room.amenities.slice(0, 6).map((amenity, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs px-3 py-1 bg-white text-[#0a3b33] border border-[#5a8d69]/30 font-medium"
              >
                {amenity}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Ban className="h-5 w-5 text-[#9C6B4A]" />
            <span className="text-[#0a3b33]">Quy định</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            <Badge
              className={`text-xs px-3 py-1 font-medium ${
                room.houseRules?.smokingAllowed
                  ? "bg-[#5a8d69]/10 text-[#5a8d69] hover:bg-[#5a8d69]/20"
                  : "bg-[#9C6B4A]/10 text-[#9C6B4A] hover:bg-[#9C6B4A]/20"
              }`}
            >
              {room.houseRules?.smokingAllowed
                ? "Được phép hút thuốc"
                : "Không hút thuốc"}
            </Badge>
            <Badge
              className={`text-xs px-3 py-1 font-medium ${
                room.houseRules?.petsAllowed
                  ? "bg-[#5a8d69]/10 text-[#5a8d69] hover:bg-[#5a8d69]/20"
                  : "bg-[#9C6B4A]/10 text-[#9C6B4A] hover:bg-[#9C6B4A]/20"
              }`}
            >
              {room.houseRules?.petsAllowed
                ? "Cho phép thú cưng"
                : "Không thú cưng"}
            </Badge>
            <Badge
              className={`text-xs px-3 py-1 font-medium ${
                room.houseRules?.partiesAllowed
                  ? "bg-[#5a8d69]/10 text-[#5a8d69] hover:bg-[#5a8d69]/20"
                  : "bg-[#9C6B4A]/10 text-[#9C6B4A] hover:bg-[#9C6B4A]/20"
              }`}
            >
              {room.houseRules?.partiesAllowed
                ? "Cho phép tổ chức tiệc"
                : "Không tổ chức tiệc"}
            </Badge>
          </div>
        </div>

        <Separator className="my-6 bg-[#5a8d69]/30" />

        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <Mountain className="h-5 w-5 text-[#9C6B4A]" />
          <span className="text-[#0a3b33]">Concept thiết kế</span>
        </h3>

        <p className="mb-4 text-[#0a3b33]/80 leading-relaxed">
          {room.description}
        </p>

        {room.pricing && (
          <div className="bg-[#f8f3e9] p-5 rounded-lg mt-6 border border-[#5a8d69]/10 shadow-sm">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <CircleDollarSign className="h-5 w-5 text-[#9C6B4A]" />
              <span className="text-[#0a3b33]">Chi tiết giá</span>
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white p-3 rounded-lg text-center border border-[#5a8d69]/10 shadow-sm">
                <span className="block text-sm text-[#0a3b33]/70">
                  Giá cơ bản
                </span>
                <span className="text-[#0a3b33] font-medium">
                  ${room.pricing.basePrice}
                </span>
              </div>
              <div className="bg-white p-3 rounded-lg text-center border border-[#5a8d69]/10 shadow-sm">
                <span className="block text-sm text-[#0a3b33]/70">
                  Phí dọn dẹp
                </span>
                <span className="text-[#0a3b33] font-medium">
                  ${room.pricing.cleaningFee}
                </span>
              </div>
              <div className="bg-white p-3 rounded-lg text-center border border-[#5a8d69]/10 shadow-sm">
                <span className="block text-sm text-[#0a3b33]/70">Đặt cọc</span>
                <span className="text-[#0a3b33] font-medium">
                  ${room.pricing.securityDeposit}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function DetailItem({ icon, label, value }: DetailItemProps) {
  return (
    <div className="flex flex-col items-center text-center gap-1">
      <div className="p-2 rounded-full bg-[#f8f3e9] mb-1 border border-[#5a8d69]/20">
        {icon}
      </div>
      <span className="text-[#0a3b33]/70 text-sm">{label}</span>
      <span className="font-medium text-[#0a3b33]">{value}</span>
    </div>
  );
}
