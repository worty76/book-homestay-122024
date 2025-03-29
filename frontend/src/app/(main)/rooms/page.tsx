"use client";

import { useState, useEffect } from "react";
import {
  Room,
  RoomType,
  ViewType,
  RoomCategory,
  rooms as allRooms
} from "@/data/rooms";
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

interface SearchParams {
  checkIn?: Date;
  checkOut?: Date;
  guests?: number;
  rooms?: number;
}

function filterRoomsBySearchParams(allRooms: Room[], searchParams: SearchParams): Room[] {
  if (!searchParams.checkIn || !searchParams.checkOut || !searchParams.guests || !searchParams.rooms) {
    return allRooms;
  }

  return allRooms.filter(room => {
    // Filter by capacity - each room should accommodate the guests divided by number of rooms
    const guestsPerRoom = Math.ceil((searchParams.guests || 1) / (searchParams.rooms || 1));
    if (room.maxCapacity < guestsPerRoom) return false;

    // Here you would also check if the room is available for the selected dates
    // This would typically involve checking a booking database
    // For now, we'll just use the 'available' property as a placeholder
    return room.available;
  });
}

export default function RoomsPage({ searchParams: urlSearchParams }: { searchParams: { [key: string]: string } }) {
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

  const [typeFilter, setTypeFilter] = useState<RoomType | "all">("all");
  const [viewFilter, setViewFilter] = useState<ViewType | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<RoomCategory | "all">(
    "all"
  );
  const [priceRange, setPriceRange] = useState([300000, 1000000]);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "capacity">(
    "price-asc"
  );
  const [showFilters, setShowFilters] = useState(false);

  // Fetch all rooms on component mount
  useEffect(() => {
    setRooms(allRooms);
    
    // Apply search filtering first
    const searchFilteredRooms = filterRoomsBySearchParams(allRooms, searchParams);
    setFilteredRooms(searchFilteredRooms);
    setLoading(false);
  }, []);

  // Apply additional filters when any filter changes
  useEffect(() => {
    // Start with rooms filtered by search params
    let searchFiltered = filterRoomsBySearchParams(rooms, searchParams);
    
    // Then apply additional filters
    let result = [...searchFiltered];

    // Apply type filter
    if (typeFilter !== "all") {
      result = result.filter((room) => room.type === typeFilter);
    }

    // Apply view filter
    if (viewFilter !== "all") {
      result = result.filter((room) => room.view === viewFilter);
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter((room) => room.category === categoryFilter);
    }

    // Apply price range filter
    result = result.filter(
      (room) => room.price >= priceRange[0] && room.price <= priceRange[1]
    );

    // Apply sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "capacity") {
      result.sort((a, b) => b.maxCapacity - a.maxCapacity);
    }

    setFilteredRooms(result);
  }, [
    rooms,
    typeFilter,
    viewFilter,
    categoryFilter,
    priceRange,
    sortBy,
  ]);

  // Reset all filters
  const resetFilters = () => {
    setTypeFilter("all");
    setViewFilter("all");
    setCategoryFilter("all");
    setPriceRange([300000, 1000000]);
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
    if (!searchParams.checkIn || !searchParams.checkOut || !searchParams.guests || !searchParams.rooms) {
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

              {/* Room Type Filter */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">
                  Loại phòng
                </label>
                <Select
                  value={typeFilter}
                  onValueChange={(value) =>
                    setTypeFilter(value as RoomType | "all")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tất cả" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="Twin">Twin Room</SelectItem>
                    <SelectItem value="Double">Double Room</SelectItem>
                    <SelectItem value="Dormitory">Dormitory</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* View Type Filter */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">
                  Loại view
                </label>
                <Select
                  value={viewFilter}
                  onValueChange={(value) =>
                    setViewFilter(value as ViewType | "all")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tất cả" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="Window">Cửa sổ</SelectItem>
                    <SelectItem value="Balcony">Ban công</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Room Category Filter */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">
                  Hạng phòng
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
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Deluxe">Deluxe</SelectItem>
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
                  defaultValue={[300000, 1000000]}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={1000000}
                  min={300000}
                  step={50000}
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
            ) : filteredRooms.length === 0 ? (
              // No results
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">
                  Không tìm thấy phòng nào
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchParams.checkIn ? 
                    "Không có phòng nào phù hợp với tiêu chí tìm kiếm của bạn. Vui lòng thử lại với các ngày hoặc số lượng khách khác." 
                    : 
                    "Không có phòng nào phù hợp với bộ lọc của bạn. Vui lòng thử lại với các tiêu chí khác."
                  }
                </p>
                <Button onClick={resetFilters}>Đặt lại bộ lọc</Button>
              </div>
            ) : (
              // Room grid
              <div>
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-muted-foreground">
                    {searchParams.checkIn ? 
                      `Hiển thị ${filteredRooms.length} phòng phù hợp với tìm kiếm của bạn` 
                      : 
                      `Hiển thị ${filteredRooms.length} phòng`
                    }
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRooms.map((room) => (
                    <RoomCard key={room.id} room={room} />
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
