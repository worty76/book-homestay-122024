"use client";

import { useState, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Users, Maximize, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BookingModal from "./bookingModal";
import { RoomCardProps } from "@/types/room";
import { formatCurrency } from "@/utils/roomUtils";

const RoomCard = memo(({ room }: RoomCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const fallbackImage = "";

  const handleHoverStart = useCallback(() => setIsHovered(true), []);
  const handleHoverEnd = useCallback(() => setIsHovered(false), []);

  const handleImageError = useCallback(
    (e: any) => {
      e.currentTarget.src = fallbackImage;
    },
    [fallbackImage]
  );

  const defaultBookingProps = {
    room: {
      id: room._id,
      name: room.name,
      floor: Number(room.floor || 1),
      type: room.category,
      category: room.category,
      view: "",
      size: room.facilities?.roomSize || 0,
      maxCapacity: room.capacity?.maxGuests,
      maxAdults: room.capacity?.maxAdults || room.capacity?.maxGuests,
      maxChildren: room.capacity?.maxChildren || 0,
      available: room.status === "available",
      description: room.description || "",
      amenities: room.amenities || [],
      bathroomAmenities: room.bathroomAmenities || [],
      image: room.images || [],
      rating: room.averageRating || 0,
      pricing: {
        basePrice: room.basePrice || room.pricing?.basePrice,
        cleaningFee: room.pricing?.cleaningFee || 0,
        securityDeposit: room.pricing?.securityDeposit || 0,
      },
      bedrooms: room.bedrooms || 1,
      bathrooms: room.facilities?.bathrooms || 1,
      checkInTime: room.houseRules?.checkInTime,
      checkOutTime: room.houseRules?.checkOutTime,
      houseRules: room.houseRules || {
        smokingAllowed: false,
        petsAllowed: false,
        partiesAllowed: false,
        checkInTime: "14:00",
        checkOutTime: "12:00",
      },
      bedsDescription: room.facilities?.bedsDescription || [],
    },
    dateRange: {
      from: new Date(),
      to: new Date(new Date().setDate(new Date().getDate() + 1)),
    },
    numberOfNights: 1,
    totalPrice: room.basePrice || room.pricing?.basePrice,
    guests: 1,
  };
  console.log(room);

  return (
    <motion.div
      className="group rounded-lg overflow-hidden border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md w-full h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      layout
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="relative w-full h-full">
          {room.images?.[0] ? (
            <Image
              src={room.images[0]}
              alt={room.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={handleImageError}
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P/BfwAJhgNdcSYBjAAAAABJRU5ErkJggg=="
            />
          ) : (
            <Image
              src={fallbackImage}
              alt={room.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
              loading="lazy"
            />
          )}
        </div>

        <div className="absolute bottom-3 left-3 bg-background/90 text-foreground px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
          {formatCurrency(room.basePrice || room.pricing?.basePrice)} / đêm
        </div>

        <div
          className={`
            absolute bottom-3 right-3 transition-opacity duration-300 
            ${
              isHovered ? "opacity-100" : "opacity-0 sm:opacity-0 md:opacity-0"
            } 
            sm:hover:opacity-100
          `}
        >
          <BookingModal
            {...defaultBookingProps}
            trigger={
              <Button
                size="sm"
                variant="secondary"
                className="bg-[#5a8d69] text-white hover:bg-[#35814c] shadow-sm text-xs sm:text-sm"
              >
                Đặt ngay
              </Button>
            }
          />
        </div>
      </div>

      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 truncate">
          {room.name}
        </h3>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>{room.capacity?.maxGuests || 2} người</span>
          </div>

          <div className="flex items-center gap-1">
            <Maximize className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>{room.facilities?.roomSize || 0} m²</span>
          </div>

          <div className="flex items-center gap-1">
            <Building2 className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Tầng {room.floor || 1}</span>
          </div>
        </div>

        <div className="min-h-[40px] sm:min-h-[60px] overflow-hidden mb-3 sm:mb-4 flex-grow">
          <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 sm:line-clamp-3">
            {room.description || ""}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mt-auto">
          <Badge variant="outline" className="mb-2 sm:mb-0 text-xs">
            {room.category || "Standard"}
          </Badge>

          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2 sm:gap-4">
            <BookingModal
              {...defaultBookingProps}
              trigger={
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs sm:text-sm bg-[#5a8d69] text-white hover:text-white hover:bg-[#35814c] shadow-sm px-2 py-1 h-auto"
                >
                  Đặt phòng
                </Button>
              }
            />

            <Link href={`/rooms/${room._id}`} legacyBehavior>
              <motion.a
                className="flex items-center text-[#5a8d69] text-xs sm:text-sm group cursor-pointer"
                whileHover={{ x: 4 }}
              >
                Xem chi tiết
                <ArrowRight className="w-2 h-2 sm:w-3 sm:h-3 transition-transform group-hover:translate-x-1 ml-1" />
              </motion.a>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

RoomCard.displayName = "RoomCard";

export default RoomCard;
