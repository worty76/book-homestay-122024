import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import RoomCard from "@/components/main/rooms/roomCard";
import { DisplayRoom, SearchParams } from "@/types/room";

interface RoomGridProps {
  loading: boolean;
  filteredRooms: any[];
  searchParams: SearchParams;
  resetFilters: () => void;
}

export default function RoomGrid({
  loading,
  filteredRooms,
  searchParams,
  resetFilters,
}: RoomGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden border shadow-sm"
          >
            <div className="aspect-[4/3] w-full">
              <Skeleton className="h-full w-full" />
            </div>
            <div className="p-4 space-y-2">
              <div className="h-6 w-3/4">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="h-4 w-full">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="h-4 w-full">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="flex justify-between pt-2">
                <div className="h-10 w-20">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="h-10 w-24">
                  <Skeleton className="h-full w-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredRooms.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">Không tìm thấy phòng nào</h3>
        <p className="text-muted-foreground mb-6">
          {searchParams.checkIn
            ? "Không có phòng nào phù hợp với tiêu chí tìm kiếm của bạn. Vui lòng thử lại với các ngày hoặc số lượng khách khác."
            : "Không có phòng nào phù hợp với bộ lọc của bạn. Vui lòng thử lại với các tiêu chí khác."}
        </p>
        <Button onClick={resetFilters}>Đặt lại bộ lọc</Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <p className="text-muted-foreground">
          {searchParams.checkIn
            ? `Hiển thị ${filteredRooms.length} phòng phù hợp với tìm kiếm của bạn`
            : `Hiển thị ${filteredRooms.length} phòng`}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <RoomCard
            key={room._id}
            room={{
              id: room._id,
              name: room.name,
              description: room.description || "",
              price: room.dailyRate,
              type: room.facilities?.bedsDescription[0]?.type || "Standard",
              view: "Window",
              category: room.category || "Standard",
              images: room.image || [],
              maxCapacity: room.capacity?.maxGuests || 2,
              amenities: room.amenities || [],
              available: room.status === "available",
              rating: room.averageRating || 0,
              floor: parseInt(room.floor || "1"), // Convert to number
              size: room.facilities?.roomSize || 20,
              // Add missing required properties
              story: room.story || "",
              mainColors: room.mainColors || ["#FFFFFF", "#F5F5F5"],
              bathroomAmenities: room.bathroomAmenities || [],
              // Add the required maxAdults and maxChildren properties
              maxAdults:
                room.capacity?.maxAdults || room.capacity?.maxGuests || 2,
              maxChildren: room.capacity?.maxChildren || 0,
              // Add optional properties for full compatibility
              cleaningFee: room.pricing?.cleaningFee || 0,
              securityDeposit: room.pricing?.securityDeposit || 0,
              basePrice: room.pricing?.basePrice || room.dailyRate,
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
            }}
          />
        ))}
      </div>
    </div>
  );
}
