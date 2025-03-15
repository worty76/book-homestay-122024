"use client";

import {
  SquareUser,
  Maximize,
  Building2,
  Users,
  Mountain,
  BadgeInfo,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Room } from "@/data/rooms";

interface RoomDetailsProps {
  room: Room;
}

export default function RoomDetails({ room }: RoomDetailsProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Chi tiết phòng</CardTitle>
        <CardDescription>Thông tin về phòng và tiện nghi</CardDescription>
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
          <Mountain className="h-5 w-5" />
          <span>Concept thiết kế</span>
        </h3>

        <p className="mb-4 text-muted-foreground">{room.description}</p>

        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
            <BadgeInfo className="h-4 w-4" />
            <span>Màu sắc chủ đạo</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {room.mainColors.map((color, index) => (
              <Badge key={index} variant="outline">
                {color}
              </Badge>
            ))}
          </div>
        </div>
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
      <div className="p-3 rounded-full bg-primary/10 text-primary mb-2">
        {icon}
      </div>
      <span className="text-sm text-muted-foreground mb-1">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
