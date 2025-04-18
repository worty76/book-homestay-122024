"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import RoomGallery from "@/components/main/rooms/roomGallery";
import RoomDetails from "@/components/main/rooms/roomDetails";
import RoomAmenities from "@/components/main/rooms/roomAmenities";
import RoomDetailSkeleton from "@/components/main/rooms/RoomDetailSkeleton";
import RoomHeader from "@/components/main/rooms/RoomHeader";
import { Room, RoomDetailDisplay, BookingFormRoom } from "@/types/room";
import { mapCategory, mapRoomType, mapViewType } from "@/utils/roomUtils";
import { fetchRoomById } from "@/services/roomService";
import { useTranslation } from "@/hooks/useTranslation";

const AnotherHeader = dynamic(
  () => import("@/components/main/another-header"),
  {
    ssr: false,
    loading: () => <div className="h-[40vh] bg-gray-200 animate-pulse"></div>,
  }
);

const BookingForm = dynamic(
  () => import("@/components/main/rooms/bookingForm"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-white rounded-lg shadow-md h-[400px] animate-pulse"></div>
    ),
  }
);

export default function RoomDetailPage({ params }: { params: { id: string } }) {
  const { t } = useTranslation();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoom = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchRoomById(params.id);

      console.log(data);

      const transformedRoom: Room = {
        ...data,
      };

      setRoom(transformedRoom);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch room details";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchRoom();
  }, [fetchRoom]);

  const roomDetailsData: RoomDetailDisplay | null = useMemo(() => {
    if (!room) return null;

    return {
      id: room._id,
      name: room.name,
      description: room.description,
      maxCapacity: room.capacity.maxGuests,
      size: room.size || room.facilities.roomSize,
      floor: parseInt(room.floor || "1"),
      type: mapRoomType(
        room.facilities?.bedsDescription?.[0]?.type || "Standard"
      ),
      bedsDescription: room.facilities?.bedsDescription || [],
      price: room.dailyRate,
      view: "Window",
      amenities: room.amenities || [],
      bathroomAmenities: room.bathroomAmenities || [],
      image: room.image || [],
      category: mapCategory(room.category),
      available: room.status === "available",
      rating: room.averageRating,
      checkInTime: room.houseRules?.checkInTime || "14:00",
      checkOutTime: room.houseRules?.checkOutTime || "12:00",
      bathrooms: room.facilities?.bathrooms || 1,
      bedrooms: room.bedrooms || 1,
      shared: room.shared || false,
      pricing: room.pricing || {
        basePrice: 0,
        cleaningFee: 0,
        securityDeposit: 0,
      },
      houseRules: room.houseRules || {
        smokingAllowed: false,
        petsAllowed: false,
        partiesAllowed: false,
        checkInTime: "14:00",
        checkOutTime: "12:00",
      },
    };
  }, [room]);

  const bookingFormData: BookingFormRoom | null = useMemo(() => {
    if (!room) return null;

    return {
      id: room._id,
      name: room.name,
      price: room.dailyRate,
      maxCapacity: room.capacity.maxGuests,
      maxAdults: room.capacity?.maxAdults || room.capacity.maxGuests,
      maxChildren: room.capacity?.maxChildren || 0,
      pricing: {
        basePrice: room.pricing?.basePrice || 0,
        cleaningFee: room.pricing?.cleaningFee || 0,
        securityDeposit: room.pricing?.securityDeposit || 0,
      },
      available: room.status === "available",
      description: room.description,
      type: mapRoomType(
        room.facilities?.bedsDescription?.[0]?.type || "Standard"
      ),
      view: mapViewType(room.category === "room" ? "Ocean View" : "City View"),
      category: mapCategory(room.category),
      image: room.image || [],
      amenities: room.amenities || [],
      bathroomAmenities: room.bathroomAmenities || [],
      rating: room.averageRating,
      floor: parseInt(room.floor || "1"),
      size: room.size || room.facilities?.roomSize || 0,
      bedrooms: room.bedrooms || 1,
      bathrooms: room.facilities?.bathrooms || 1,
      checkInTime: room.houseRules?.checkInTime || "14:00",
      checkOutTime: room.houseRules?.checkOutTime || "12:00",
      houseRules: room.houseRules || {
        smokingAllowed: false,
        petsAllowed: false,
        partiesAllowed: false,
        checkInTime: "14:00",
        checkOutTime: "12:00",
      },
      bedsDescription: room.facilities?.bedsDescription || [],
    };
  }, [room]);

  if (loading) {
    return <RoomDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-3">
            {t("rooms.roomDetail.errorOccurred")}
          </h2>
          <p className="text-sm sm:text-base text-gray-700">{error}</p>
          <button
            onClick={() => fetchRoom()}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
          >
            {t("rooms.roomDetail.tryAgain")}
          </button>
        </motion.div>
      </div>
    );
  }

  if (!room || !roomDetailsData || !bookingFormData) {
    notFound();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnotherHeader
        subtitle={t("rooms.roomDetail.roomDetailsFor", { roomName: room.name })}
        description={t("rooms.roomDetail.exploreOurRooms")}
        image="/images/img3.jpg"
        finalPage={t("rooms.roomDetail.rooms")}
        detailPage={room.name}
      />

      <div className="bg-[#f8f3e9]">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
          <RoomHeader
            name={room.name}
            bedsDescription={room.facilities?.bedsDescription || []}
            category={room.category}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
            <div className="lg:col-span-8 space-y-4 sm:space-y-6 md:space-y-8">
              <RoomGallery images={room.image} alt={room.name} />

              <motion.div
                className="rounded-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <RoomDetails room={roomDetailsData} />
              </motion.div>

              <motion.div
                className="rounded-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <RoomAmenities
                  amenities={room.amenities}
                  bathroomAmenities={room.bathroomAmenities || []}
                />
              </motion.div>
            </div>

            {/* Right content - Booking form */}
            <div className="lg:col-span-4 mt-6 lg:mt-0">
              <div className="lg:sticky lg:top-24">
                <motion.div
                  className="bg-white rounded-lg shadow-md border border-[#5a8d69]/10"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <BookingForm room={bookingFormData} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
