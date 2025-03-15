"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import RoomCard from "@/components/main/rooms/roomCard";
import { getAllRooms, Room } from "@/data/rooms";

interface RoomListPreviewProps {
  title?: string;
  subtitle?: string;
  count?: number;
}

export default function RoomListPreview({
  title = "Phòng nổi bật",
  subtitle = "Khám phá không gian nghỉ ngơi độc đáo của chúng tôi",
  count = 3,
}: RoomListPreviewProps) {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    // Get featured rooms (first 3 by default)
    const allRooms = getAllRooms();
    setRooms(allRooms.slice(0, count));
  }, [count]);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl font-bold mb-2"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <RoomCard room={room} />
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/rooms" className="inline-flex items-center gap-1">
              <span>Xem tất cả phòng</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
