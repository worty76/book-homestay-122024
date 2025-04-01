"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import RoomGallery from "@/components/main/rooms/roomGallery";
import RoomDetails from "@/components/main/rooms/roomDetails";
import RoomAmenities from "@/components/main/rooms/roomAmenities";
import BookingForm from "@/components/main/rooms/bookingForm";
import AnotherHeader from "@/components/main/another-header";
import RoomDetailSkeleton from "@/components/main/rooms/RoomDetailSkeleton";
import RoomHeader from "@/components/main/rooms/RoomHeader";
import { Room, RoomDetailDisplay, BookingFormRoom } from "@/types/room";
import { mapCategory, mapRoomType, mapViewType } from "@/utils/roomUtils";
import { fetchRoomById } from "@/services/roomService";

export default function RoomDetailPage({ params }: { params: { id: string } }) {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRoomData = async () => {
      try {
        setLoading(true);
        const data = await fetchRoomById(params.id);

        const transformedRoom: Room = {
          ...data,
          bathroomAmenities: ["Shower", "Toiletries", "Hair Dryer"],
        };

        setRoom(transformedRoom);
      } catch (err) {
        console.error("Failed to fetch room:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch room details"
        );
      } finally {
        setLoading(false);
      }
    };

    getRoomData();
  }, [params.id]);

  if (loading) {
    return <RoomDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!room) {
    notFound();
  }

  const roomDetailsData: RoomDetailDisplay = {
    id: room._id,
    name: room.name,
    description: room.description,
    maxCapacity: room.capacity.maxGuests,
    size: room.facilities.roomSize,
    floor: parseInt(room.floor || "1"),
    type: mapRoomType(room.facilities.bedsDescription[0]?.type || "Standard"),
    bedsDescription: room.facilities.bedsDescription,
    price: room.dailyRate,
    view: "Window",
    amenities: room.amenities,
    bathroomAmenities: room.bathroomAmenities || [],
    images: room.image,
    category: mapCategory(room.category),
    available: room.status === "available",
    rating: room.averageRating,
    checkInTime: room.houseRules.checkInTime,
    checkOutTime: room.houseRules.checkOutTime,
    bathrooms: room.facilities.bathrooms,
    bedrooms: room.bedrooms || 1,
    shared: room.shared || false,
    pricing: room.pricing,
    houseRules: room.houseRules,
  };

  const bookingFormData: BookingFormRoom = {
    id: room._id,
    name: room.name,
    price: room.dailyRate,
    maxCapacity: room.capacity.maxGuests,
    maxAdults: room.capacity.maxAdults || room.capacity.maxGuests,
    maxChildren: room.capacity.maxChildren || 0,
    cleaningFee: room.pricing.cleaningFee,
    securityDeposit: room.pricing.securityDeposit,
    basePrice: room.pricing.basePrice,
    available: room.status === "available",
    description: room.description,
    type: mapRoomType(room.facilities.bedsDescription[0]?.type || "Standard"),
    view: mapViewType(room.category === "room" ? "Ocean View" : "City View"),
    category: mapCategory(room.category),
    images: room.image,
    amenities: room.amenities,
    bathroomAmenities: room.bathroomAmenities || [],
    rating: room.averageRating,
    floor: parseInt(room.floor || "1"),
    size: room.facilities.roomSize,
    bedrooms: room.bedrooms || 1,
    bathrooms: room.facilities.bathrooms,
    checkInTime: room.houseRules.checkInTime,
    checkOutTime: room.houseRules.checkOutTime,
    houseRules: room.houseRules,
    bedsDescription: room.facilities.bedsDescription,
  };

  return (
    <>
      <AnotherHeader
        title="Chi tiết phòng"
        description=""
        image="/images/img4.jpg"
      />
      <div className="bg-[#f8f3e9]">
        <div className="container mx-auto px-4 py-12">
          <RoomHeader
            name={room.name}
            bedsDescription={room.facilities.bedsDescription}
            category={room.category}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <RoomGallery images={room.image} alt={room.name} />
              <div className="bg-white rounded-lg shadow-md p-6 my-8 border border-[#5a8d69]/10">
                <RoomDetails room={roomDetailsData} />
              </div>
              <div className="bg-white rounded-lg p-6 ">
                <RoomAmenities
                  amenities={room.amenities}
                  bathroomAmenities={room.bathroomAmenities || []}
                />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white rounded-lg shadow-md border border-[#5a8d69]/10">
                  <BookingForm room={bookingFormData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
