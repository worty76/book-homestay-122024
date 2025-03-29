"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import RoomCard from "@/components/main/rooms/roomCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Filter, X } from "lucide-react";
import AnotherHeader from "@/components/main/another-header";

// Updated Room interface based on API response
interface Room {
  _id: string;
  name: string;
  description: string;
  category: string;
  image: string[];
  location: {
    address: string;
    city: string;
  };
  amenities: string[];
  status: "available" | "booked";
  averageRating: number;
  dailyRate: number;
  capacity: {
    maxGuests: number;
    maxAdults?: number;
    maxChildren?: number;
  };
  pricing: {
    basePrice: number;
    cleaningFee: number;
    securityDeposit: number;
  };
  houseRules: {
    smokingAllowed: boolean;
    petsAllowed: boolean;
    partiesAllowed: boolean;
    checkInTime: string;
    checkOutTime: string;
  };
  facilities: {
    bathrooms: number;
    roomSize: number;
    bedsDescription: {
      type: string;
      count: number;
      _id: string;
    }[];
  };
  floor?: string;
  bedrooms?: number;
  shared?: boolean;
}

type RoomCategory = "room" | "suite" | "apartment";
type ViewType = "city" | "garden" | "mountain" | "pool" | "all";
type BedType = "Single" | "Queen" | "King" | "all";

interface SearchParams {
  checkIn?: Date;
  checkOut?: Date;
  guests?: number;
  rooms?: number;
}

function filterRoomsBySearchParams(
  allRooms: Room[],
  searchParams: SearchParams
): Room[] {
  if (
    !searchParams.checkIn ||
    !searchParams.checkOut ||
    !searchParams.guests ||
    !searchParams.rooms
  ) {
    return allRooms;
  }

  return allRooms.filter((room) => {
    // Filter by capacity - each room should accommodate the guests divided by number of rooms
    const guestsPerRoom = Math.ceil(
      (searchParams.guests || 1) / (searchParams.rooms || 1)
    );
    if (room.capacity.maxGuests < guestsPerRoom) return false;

    // Filter by availability (assuming 'available' status means it's available)
    return room.status === "available";
  });
}

export default function RoomsPage({
  searchParams: urlSearchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  // Parse search parameters
  const searchParams: SearchParams = {};
  if (urlSearchParams.checkIn) {
    searchParams.checkIn = new Date(urlSearchParams.checkIn);
  }
  if (urlSearchParams.checkOut) {
    searchParams.checkOut = new Date(urlSearchParams.checkOut);
  }
  if (urlSearchParams.guests) {
    searchParams.guests = parseInt(urlSearchParams.guests);
  }
  if (urlSearchParams.rooms) {
    searchParams.rooms = parseInt(urlSearchParams.rooms);
  }

  const [categoryFilter, setCategoryFilter] = useState<RoomCategory | "all">(
    "all"
  );
  const [viewFilter, setViewFilter] = useState<ViewType | "all">("all");
  const [bedTypeFilter, setBedTypeFilter] = useState<BedType | "all">("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "capacity">(
    "price-asc"
  );
  const [showFilters, setShowFilters] = useState(false);

  // Fetch rooms from API on component mount
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/room");
        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
        }
        const data = await response.json();
        setRooms(data);

        // Apply search filtering first
        const searchFilteredRooms = filterRoomsBySearchParams(
          data,
          searchParams
        );
        setFilteredRooms(searchFilteredRooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        // Set empty array on error
        setRooms([]);
        setFilteredRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Apply additional filters when any filter changes
  useEffect(() => {
    // Start with rooms filtered by search params
    let searchFiltered = filterRoomsBySearchParams(rooms, searchParams);

    // Then apply additional filters
    let result = [...searchFiltered];

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter((room) => room.category === categoryFilter);
    }

    // Apply bed type filter
    if (bedTypeFilter !== "all") {
      result = result.filter((room) =>
        room.facilities.bedsDescription.some(
          (bed) => bed.type === bedTypeFilter
        )
      );
    }

    // Apply price range filter (using dailyRate)
    result = result.filter(
      (room) =>
        room.dailyRate >= priceRange[0] && room.dailyRate <= priceRange[1]
    );

    // Apply sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.dailyRate - b.dailyRate);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.dailyRate - a.dailyRate);
    } else if (sortBy === "capacity") {
      result.sort((a, b) => b.capacity.maxGuests - a.capacity.maxGuests);
    }

    setFilteredRooms(result);
  }, [rooms, categoryFilter, bedTypeFilter, priceRange, sortBy]);

  // Reset all filters
  const resetFilters = () => {
    setCategoryFilter("all");
    setBedTypeFilter("all");
    setViewFilter("all");
    setPriceRange([0, 1000]);
    setSortBy("price-asc");
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Add search information to the header or results
  const getSearchSummary = () => {
    if (
      !searchParams.checkIn ||
      !searchParams.checkOut ||
      !searchParams.guests ||
      !searchParams.rooms
    ) {
      return null;
    }

    return (
      <div className="bg-[#f8f3e9] p-3 rounded-md mb-4 text-sm">
        <p className="font-medium">Tìm kiếm của bạn:</p>
        <div className="flex flex-wrap gap-2 mt-1">
          <span className="bg-white px-2 py-1 rounded-md">
            Nhận phòng: {searchParams.checkIn.toLocaleDateString("vi-VN")}
          </span>
          <span className="bg-white px-2 py-1 rounded-md">
            Trả phòng: {searchParams.checkOut.toLocaleDateString("vi-VN")}
          </span>
          <span className="bg-white px-2 py-1 rounded-md">
            {searchParams.guests} người - {searchParams.rooms} phòng
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      <AnotherHeader title="Phòng của chúng tôi" description="" image="" />
      <div className="container mx-auto px-4 py-8">
        {getSearchSummary()}

        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-4">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="w-full justify-between"
          >
            <div className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              <span>Bộ lọc</span>
            </div>
            {showFilters ? (
              <X className="h-4 w-4" />
            ) : (
              <ArrowUpDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters - Desktop (always visible) and mobile (toggleable) */}
          <div
            className={`
          lg:block 
          ${showFilters ? "block" : "hidden"} 
          col-span-1 space-y-6
        `}
          >
            <div>
              <h2 className="text-lg font-medium mb-4">Lọc phòng</h2>

              {/* Bed Type Filter */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">
                  Loại giường
                </label>
                <Select
                  value={bedTypeFilter}
                  onValueChange={(value) =>
                    setBedTypeFilter(value as BedType | "all")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tất cả" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Queen">Queen</SelectItem>
                    <SelectItem value="King">King</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Room Category Filter */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">
                  Loại phòng
                </label>
                <Select
                  value={categoryFilter}
                  onValueChange={(value) =>
                    setCategoryFilter(value as RoomCategory | "all")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tất cả" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="room">Phòng</SelectItem>
                    <SelectItem value="suite">Suite</SelectItem>
                    <SelectItem value="apartment">Căn hộ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">
                  Giá phòng
                </label>
                <div className="mb-2 flex justify-between text-sm text-muted-foreground">
                  <span>{formatCurrency(priceRange[0])}</span>
                  <span>{formatCurrency(priceRange[1])}</span>
                </div>
                <Slider
                  defaultValue={[0, 1000]}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={1000}
                  min={0}
                  step={50}
                />
              </div>

              {/* Sort Order */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">
                  Sắp xếp theo
                </label>
                <Select
                  value={sortBy}
                  onValueChange={(value) =>
                    setSortBy(value as "price-asc" | "price-desc" | "capacity")
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-asc">Giá: Thấp đến cao</SelectItem>
                    <SelectItem value="price-desc">
                      Giá: Cao đến thấp
                    </SelectItem>
                    <SelectItem value="capacity">Sức chứa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Reset Filters */}
              <Button
                variant="outline"
                onClick={resetFilters}
                className="w-full mt-4"
              >
                Đặt lại
              </Button>
            </div>
          </div>

          {/* Room List */}
          <div className="col-span-1 lg:col-span-3">
            {loading ? (
              // Loading skeletons
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-lg overflow-hidden border shadow-sm"
                  >
                    <Skeleton className="aspect-[4/3] w-full" />
                    <div className="p-4 space-y-2">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <div className="flex justify-between pt-2">
                        <Skeleton className="h-10 w-20" />
                        <Skeleton className="h-10 w-24" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredRooms.length === 0 ? (
              // No results
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">
                  Không tìm thấy phòng nào
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchParams.checkIn
                    ? "Không có phòng nào phù hợp với tiêu chí tìm kiếm của bạn. Vui lòng thử lại với các ngày hoặc số lượng khách khác."
                    : "Không có phòng nào phù hợp với bộ lọc của bạn. Vui lòng thử lại với các tiêu chí khác."}
                </p>
                <Button onClick={resetFilters}>Đặt lại bộ lọc</Button>
              </div>
            ) : (
              // Room grid
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
                        type:
                          room.facilities.bedsDescription[0]?.type ||
                          "Standard",
                        view: "Window", // Default value as it's not in API
                        category: room.category as any,
                        images: room.image,
                        maxCapacity: room.capacity.maxGuests,
                        amenities: room.amenities,
                        available: room.status === "available",
                        rating: room.averageRating,
                        floor: room.floor || "1", // Pass floor from API or default to "1"
                        size: room.facilities.roomSize || 20, // Pass room size from API or default to 20
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
