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
    <Card className="mb-8 bg-[#324b3e] shadow-lg border-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-[#F3ECDC] text-2xl">
          Chi tiết phòng
        </CardTitle>
        <CardDescription className="text-[#F3ECDC]/80">
          Thông tin về phòng và tiện nghi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <DetailItem
            icon={<SquareUser className="text-[#F3ECDC]" />}
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
            icon={<Maximize className="text-[#F3ECDC]" />}
            label="Diện tích"
            value={`${room.size} m²`}
          />

          <DetailItem
            icon={<Building2 className="text-[#F3ECDC]" />}
            label="Tầng"
            value={`Tầng ${room.floor}`}
          />

          <DetailItem
            icon={<Users className="text-[#F3ECDC]" />}
            label="Sức chứa"
            value={`${room.maxCapacity} người`}
          />
        </div>

        <div className="bg-[#3a574a] p-4 rounded-lg mb-6">
          <h3 className="font-medium text-lg mb-4 flex items-center gap-2">
            <Bed className="h-5 w-5 text-[#F3ECDC]" />
            <span className="text-[#F3ECDC]">Thông tin giường ngủ</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {room.bedsDescription?.map((bed, index) => (
              <div
                key={bed._id || index}
                className="bg-[#4a6658] p-3 rounded-lg text-center"
              >
                <span className="block text-lg font-medium text-[#F3ECDC]">
                  {bed.count}x
                </span>
                <span className="text-[#F3ECDC]/80">{bed.type} Bed</span>
              </div>
            ))}
            <div className="bg-[#4a6658] p-3 rounded-lg text-center">
              <span className="block text-lg font-medium text-[#F3ECDC]">
                {room.bathrooms}
              </span>
              <span className="text-[#F3ECDC]/80">Phòng tắm</span>
            </div>
            {room.bedrooms && (
              <div className="bg-[#4a6658] p-3 rounded-lg text-center">
                <span className="block text-lg font-medium text-[#F3ECDC]">
                  {room.bedrooms}
                </span>
                <span className="text-[#F3ECDC]/80">Phòng ngủ</span>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium text-lg mb-3 flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#F3ECDC]" />
            <span className="text-[#F3ECDC]">Thời gian nhận & trả phòng</span>
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#3a574a] p-3 rounded-lg">
              <p className="text-[#F3ECDC]/80">Nhận phòng:</p>
              <p className="text-[#F3ECDC] font-medium">
                Từ {room.checkInTime}
              </p>
            </div>
            <div className="bg-[#3a574a] p-3 rounded-lg">
              <p className="text-[#F3ECDC]/80">Trả phòng:</p>
              <p className="text-[#F3ECDC] font-medium">
                Trước {room.checkOutTime}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium text-lg mb-3 flex items-center gap-2">
            <Wifi className="h-5 w-5 text-[#F3ECDC]" />
            <span className="text-[#F3ECDC]">Tiện nghi nổi bật</span>
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {room.amenities.slice(0, 6).map((amenity, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs px-2 py-1 bg-[#4a6658] text-[#F3ECDC] border-none"
              >
                {amenity}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium text-lg mb-3 flex items-center gap-2">
            <Ban className="h-5 w-5 text-[#F3ECDC]" />
            <span className="text-[#F3ECDC]">Quy định</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={
                room.houseRules?.smokingAllowed ? "default" : "destructive"
              }
              className="text-xs px-2 py-1"
            >
              {room.houseRules?.smokingAllowed
                ? "Được phép hút thuốc"
                : "Không hút thuốc"}
            </Badge>
            <Badge
              variant={room.houseRules?.petsAllowed ? "default" : "destructive"}
              className="text-xs px-2 py-1"
            >
              {room.houseRules?.petsAllowed
                ? "Cho phép thú cưng"
                : "Không thú cưng"}
            </Badge>
            <Badge
              variant={
                room.houseRules?.partiesAllowed ? "default" : "destructive"
              }
              className="text-xs px-2 py-1"
            >
              {room.houseRules?.partiesAllowed
                ? "Cho phép tổ chức tiệc"
                : "Không tổ chức tiệc"}
            </Badge>
          </div>
        </div>

        <Separator className="my-6 bg-[#F3ECDC]/20" />

        <h3 className="font-medium text-lg mb-3 flex items-center gap-2">
          <Mountain className="h-5 w-5 text-[#F3ECDC]" />
          <span className="text-[#F3ECDC]">Concept thiết kế</span>
        </h3>

        <p className="mb-4 text-[#F3ECDC]/90 leading-relaxed">
          {room.description}
        </p>

        {room.pricing && (
          <div className="bg-[#3a574a] p-4 rounded-lg mt-6">
            <h3 className="font-medium text-lg mb-3 flex items-center gap-2">
              <CircleDollarSign className="h-5 w-5 text-[#F3ECDC]" />
              <span className="text-[#F3ECDC]">Chi tiết giá</span>
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#4a6658] p-3 rounded-lg text-center">
                <span className="block text-sm text-[#F3ECDC]/80">
                  Giá cơ bản
                </span>
                <span className="text-[#F3ECDC] font-medium">
                  ${room.pricing.basePrice}
                </span>
              </div>
              <div className="bg-[#4a6658] p-3 rounded-lg text-center">
                <span className="block text-sm text-[#F3ECDC]/80">
                  Phí dọn dẹp
                </span>
                <span className="text-[#F3ECDC] font-medium">
                  ${room.pricing.cleaningFee}
                </span>
              </div>
              <div className="bg-[#4a6658] p-3 rounded-lg text-center">
                <span className="block text-sm text-[#F3ECDC]/80">Đặt cọc</span>
                <span className="text-[#F3ECDC] font-medium">
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
      <div className="p-2 rounded-full bg-[#3a574a] mb-1">{icon}</div>
      <span className="text-[#F3ECDC]/80 text-sm">{label}</span>
      <span className="font-medium text-[#F3ECDC]">{value}</span>
    </div>
  );
}
