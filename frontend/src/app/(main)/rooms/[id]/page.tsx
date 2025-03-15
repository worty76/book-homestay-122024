"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { getRoomById } from "@/data/rooms";
import RoomGallery from "@/components/main/rooms/roomGallery";
import RoomDetails from "@/components/main/rooms/roomDetails";
import RoomAmenities from "@/components/main/rooms/roomAmenities";
import RoomStory from "@/components/main/rooms/roomStory";
import BookingForm from "@/components/main/rooms/bookingForm";
import type { Room } from "@/data/rooms";
import { Skeleton } from "@/components/ui/skeleton";
import AnotherHeader from "@/components/main/another-header";

export default function RoomDetailPage({ params }: { params: { id: string } }) {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedRoom = getRoomById(params.id);

    if (fetchedRoom) {
      setRoom(fetchedRoom);
    }
    setLoading(false);
  }, [params.id]);

  if (!loading && !room) {
    notFound();
  }

  if (loading) {
    return <RoomDetailSkeleton />;
  }

  return (
    <>
      <AnotherHeader
        title="Chủ đề Thiết Kế"
        description=""
        image="/images/img4.jpg"
      />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{room.name}</h1>
          <p className="text-muted-foreground">
            {room.type === "Twin"
              ? "Phòng đôi với 2 giường đơn"
              : room.type === "Double"
              ? "Phòng đôi với 1 giường lớn"
              : "Phòng ngủ tập thể"}
            {" · "}
            {room.category} Room
            {" · "}
            {room.view === "Window" ? "View cửa sổ" : "Ban công"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RoomGallery images={room.images} alt={room.name} />

            <RoomStory
              name={room.name}
              story={room.story}
              concept={room.concept}
              mainColors={room.mainColors}
            />

            <RoomDetails room={room} />

            <RoomAmenities
              amenities={room.amenities}
              bathroomAmenities={room.bathroomAmenities}
            />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <BookingForm room={room} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function RoomDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Skeleton className="h-10 w-3/4 mb-2" />
        <Skeleton className="h-5 w-1/2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Skeleton className="h-[400px] w-full mb-8" />
          <Skeleton className="h-[200px] w-full mb-8" />
          <Skeleton className="h-[300px] w-full mb-8" />
          <Skeleton className="h-[250px] w-full" />
        </div>

        <div className="lg:col-span-1">
          <Skeleton className="h-[500px] w-full sticky top-8" />
        </div>
      </div>
    </div>
  );
}
