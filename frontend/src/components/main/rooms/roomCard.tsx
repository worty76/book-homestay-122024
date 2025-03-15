"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Users, Maximize, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Room } from "@/data/rooms";
import BookingModal from "./bookingModal";

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      className="group rounded-lg overflow-hidden border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={room.images[0]}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          priority={false}
        />

        <div className="absolute bottom-3 left-3 bg-background/90 text-foreground px-3 py-1 rounded-full text-sm font-medium">
          {formatCurrency(room.price)} / đêm
        </div>

        <div
          className={`
          absolute bottom-3 right-3 transition-opacity duration-300
          ${isHovered ? "opacity-100" : "opacity-0"} 
        `}
        >
          <BookingModal
            room={room}
            trigger={
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 text-foreground hover:bg-white shadow-sm"
              >
                Đặt ngay
              </Button>
            }
          />
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 truncate">{room.name}</h3>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{room.maxCapacity} người</span>
          </div>

          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span>{room.size} m²</span>
          </div>

          <div className="flex items-center gap-1">
            <Building2 className="h-4 w-4" />
            <span>Tầng {room.floor}</span>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {room.description}
        </p>

        <div className="flex items-center justify-between">
          <Badge variant="outline">
            {room.type === "Twin"
              ? "Twin"
              : room.type === "Double"
              ? "Double"
              : "Dormitory"}
          </Badge>

          <div className="flex items-center gap-2">
            <BookingModal
              room={room}
              trigger={
                <Button variant="outline" size="sm">
                  Đặt phòng
                </Button>
              }
            />

            <Button asChild variant="ghost" size="sm" className="gap-1">
              <Link href={`/rooms/${room.id}`}>
                <span>Chi tiết</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
