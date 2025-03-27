"use client";

import {
  SquareUser,
  Maximize,
  Building2,
  Users,
  Mountain,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Room } from "@/data/rooms";

interface RoomDetailsProps {
  room: Room;
}

export default function RoomDetails({ room }: RoomDetailsProps) {
  return (
    <Card className="mb-8 bg-[#324b3e]">
      <CardHeader>
        <CardTitle className="text-[#F3ECDC]">Chi tiết phòng</CardTitle>
        <CardDescription className="text-[#F3ECDC]">Thông tin về phòng và tiện nghi</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <DetailItem
            icon={<SquareUser />}
            label="Loại phòng"
            value={
              room.type === "Twin"
                ? "Twin Room"
                : room.type === "Double"
                ? "Double Room"
                : "Dormitory"
            }
          />

          <DetailItem
            icon={<Maximize />}
            label="Diện tích"
            value={`${room.size} m²`}
          />

          <DetailItem
            icon={<Building2 />}
            label="Tầng"
            value={`Tầng ${room.floor}`}
          />

          <DetailItem
            icon={<Users />}
            label="Sức chứa"
            value={`${room.maxCapacity} người`}
          />
        </div>

        <Separator className="my-4" />

        <h3 className="font-medium text-lg mb-3 flex items-center gap-2">
          <Mountain className="h-5 w-5 text-[#F3ECDC]" />
          <span className="text-[#F3ECDC]">Concept thiết kế</span>
        </h3>

        <p className="mb-4 text-[#F3ECDC]">{room.description}</p>
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
    <div className="flex flex-col items-center text-center">
      <div className="p-3 rounded-full bg-[#8a9a5b]/60 mb-2">
        {icon}
      </div>
      <span className="text-sm text-[#F3ECDC] mb-1">{label}</span>
      <span className="font-medium text-[#F3ECDC]">{value}</span>
    </div>
  );
}
