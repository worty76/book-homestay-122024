"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { getRoomById } from "@/data/rooms";
import RoomGallery from "@/components/main/rooms/roomGallery";
import RoomDetails from "@/components/main/rooms/roomDetails";
import RoomAmenities from "@/components/main/rooms/roomAmenities";
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
        title="Chi tiết phòng"
        description=""
        image="/images/img4.jpg"
      />
      <div className="bg-[#f8f3e9]">
        <div className="container mx-auto px-4 py-8 ">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-[#0a3b33]">{room!.name}</h1>
            <p className="text-[#5a8d69]">
              {room!.type === "Twin"
                ? "Phòng đôi với 2 giường đơn"
                : room!.type === "Double"
                ? "Phòng đôi với 1 giường lớn"
                : "Phòng ngủ tập thể"}
              {" · "}
              {room!.category} Room
              {" · "}
              {room!.view === "Window" ? "View cửa sổ" : "Ban công"}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <RoomGallery images={room!.images} alt={room!.name} />

              <RoomDetails room={room!} />

              <RoomAmenities
                amenities={room!.amenities}
                bathroomAmenities={room!.bathroomAmenities}
              />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <BookingForm room={room!} />
              </div>
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
        <div className="h-10 w-3/4 mb-2">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="h-5 w-1/2">
          <Skeleton className="h-full w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="h-[400px] w-full mb-8">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="h-[200px] w-full mb-8">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="h-[300px] w-full mb-8">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="h-[250px] w-full">
            <Skeleton className="h-full w-full" />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="h-[500px] w-full sticky top-8">
            <Skeleton className="h-full w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
