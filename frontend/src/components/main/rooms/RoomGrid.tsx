import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import RoomCard from "@/components/main/rooms/roomCard";
import { SearchParams } from "@/types/room";
import { memo, useMemo } from "react";
import { motion } from "framer-motion";

interface RoomGridProps {
  loading: boolean;
  filteredRooms: any[];
  searchParams: SearchParams;
  resetFilters: () => void;
}

const RoomSkeleton = memo(() => (
  <div className="rounded-lg overflow-hidden border shadow-sm">
    <div className="aspect-[4/3] w-full">
      <Skeleton className="h-full w-full" />
    </div>
    <div className="p-3 sm:p-4 space-y-1 sm:space-y-2">
      <div className="h-5 sm:h-6 w-3/4">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="h-3 sm:h-4 w-full">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="h-3 sm:h-4 w-full">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 pt-2">
        <div className="h-8 sm:h-10 w-20">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="h-8 sm:h-10 w-24">
          <Skeleton className="h-full w-full" />
        </div>
      </div>
    </div>
  </div>
));

const EmptyState = memo(
  ({
    searchParams,
    resetFilters,
  }: {
    searchParams: SearchParams;
    resetFilters: () => void;
  }) => (
    <motion.div
      className="text-center py-8 sm:py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg sm:text-xl font-medium mb-2">
        Không tìm thấy phòng nào
      </h3>
      <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6 max-w-md mx-auto">
        {searchParams.checkIn
          ? "Không có phòng nào phù hợp với tiêu chí tìm kiếm của bạn. Vui lòng thử lại với các ngày hoặc số lượng khách khác."
          : "Không có phòng nào phù hợp với bộ lọc của bạn. Vui lòng thử lại với các tiêu chí khác."}
      </p>
      <Button onClick={resetFilters} className="w-full sm:w-auto">
        Đặt lại bộ lọc
      </Button>
    </motion.div>
  )
);

const RoomCardWrapper = memo(({ room }: { room: any }) => (
  <RoomCard
    key={room._id}
    room={
      {
        _id: room._id,
        name: room.name,
        description: room.description || "",
        basePrice:
          room.pricing?.basePrice || room.basePrice || room.dailyRate || 120000,
        type: room.facilities?.bedsDescription[0]?.type || "Standard",
        view: "Window",
        category: room.category || "Standard",
        images: room.image || [],
        maxCapacity: room.capacity?.maxGuests || 2,
        amenities: room.amenities || [],
        available: room.status === "available",
        rating: room.averageRating || 0,
        floor: room.floor || "1",
        size: room.facilities?.roomSize || 20,
        story: room.story || "",
        mainColors: room.mainColors || ["#FFFFFF", "#F5F5F5"],
        bathroomAmenities: room.bathroomAmenities || [],
        maxAdults: room.capacity?.maxAdults || room.capacity?.maxGuests || 2,
        maxChildren: room.capacity?.maxChildren || 0,
        cleaningFee: room.pricing?.cleaningFee || 0,
        securityDeposit: room.pricing?.securityDeposit || 0,
        pricing: {
          basePrice:
            room.pricing?.basePrice ||
            room.basePrice ||
            room.dailyRate ||
            120000,
          cleaningFee: room.pricing?.cleaningFee || 0,
          securityDeposit: room.pricing?.securityDeposit || 0,
        },
        bedrooms: room.bedrooms || 1,
        bathrooms: room.facilities?.bathrooms || 1,
        checkInTime: room.houseRules?.checkInTime || "14:00",
        checkOutTime: room.houseRules?.checkOutTime || "12:00",
        houseRules: {
          smokingAllowed: room.houseRules?.smokingAllowed || false,
          petsAllowed: room.houseRules?.petsAllowed || false,
          partiesAllowed: room.houseRules?.partiesAllowed || false,
          checkInTime: room.houseRules?.checkInTime || "14:00",
          checkOutTime: room.houseRules?.checkOutTime || "12:00",
        },
        bedsDescription: room.facilities?.bedsDescription
          ? room.facilities.bedsDescription.map(
              (bed: { type?: string; count?: number; _id?: string }) => ({
                type: bed.type || "Standard",
                count: bed.count || 1,
                _id:
                  bed._id ||
                  `${room._id}-bed-${Math.random()
                    .toString(36)
                    .substring(2, 9)}`,
              })
            )
          : [
              {
                type: "Standard",
                count: 1,
                _id: `${room._id}-default-bed`,
              },
            ],
      } as any
    }
  />
));

const RoomGrid = ({
  loading,
  filteredRooms,
  searchParams,
  resetFilters,
}: RoomGridProps) => {
  const skeletonArray = useMemo(() => Array.from({ length: 6 }), []);

  const resultText = useMemo(() => {
    return searchParams.checkIn
      ? `Hiển thị ${filteredRooms.length} phòng phù hợp với tìm kiếm của bạn`
      : `Hiển thị ${filteredRooms.length} phòng`;
  }, [filteredRooms.length, searchParams.checkIn]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {skeletonArray.map((_, index) => (
          <RoomSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (filteredRooms.length === 0) {
    return (
      <EmptyState searchParams={searchParams} resetFilters={resetFilters} />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-3 sm:mb-4 px-2 sm:px-0">
        <p className="text-sm sm:text-base text-muted-foreground">
          {resultText}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredRooms.map((room) => (
          <RoomCardWrapper key={room._id} room={room} />
        ))}
      </div>
    </motion.div>
  );
};

export default memo(RoomGrid);
