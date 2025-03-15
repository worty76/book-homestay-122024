"use client";

import { useState, useEffect } from "react";
import {
  getAllRooms,
  getRoomsByType,
  getRoomsByView,
  getRoomsByCategory,
  getRoomsByConcept,
  getRoomsByPriceRange,
  Room,
  RoomType,
  ViewType,
  RoomCategory,
  RoomConcept,
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

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [typeFilter, setTypeFilter] = useState<RoomType | "all">("all");
  const [viewFilter, setViewFilter] = useState<ViewType | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<RoomCategory | "all">(
    "all"
  );
  const [conceptFilter, setConceptFilter] = useState<RoomConcept | "all">(
    "all"
  );
  const [priceRange, setPriceRange] = useState([300000, 1000000]);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "capacity">(
    "price-asc"
  );
  const [showFilters, setShowFilters] = useState(false);

  // Fetch all rooms on component mount
  useEffect(() => {
    const allRooms = getAllRooms();
    setRooms(allRooms);
    setFilteredRooms(allRooms);
    setLoading(false);
  }, []);

  // Apply filters when any filter changes
  useEffect(() => {
    let result = [...rooms];

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

    // Apply concept filter
    if (conceptFilter !== "all") {
      result = result.filter((room) => room.concept === conceptFilter);
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
    conceptFilter,
    priceRange,
    sortBy,
  ]);

  // Reset all filters
  const resetFilters = () => {
    setTypeFilter("all");
    setViewFilter("all");
    setCategoryFilter("all");
    setConceptFilter("all");
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Phòng của chúng tôi</h1>
        <p className="text-muted-foreground">
          Khám phá các phòng nghỉ độc đáo lấy cảm hứng từ văn hóa và thiên nhiên
          Việt Nam
        </p>
      </div>

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

            {/* Room Concept Filter */}
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">Concept</label>
              <Select
                value={conceptFilter}
                onValueChange={(value) =>
                  setConceptFilter(value as RoomConcept | "all")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="NonNuoc">Non Nước</SelectItem>
                  <SelectItem value="PhongNam">Phong Nam</SelectItem>
                  <SelectItem value="HaiCauVien">Hải Cầu Viên</SelectItem>
                  <SelectItem value="LuaHoi">Lụa Hội</SelectItem>
                  <SelectItem value="NguBinh">Ngư Bình</SelectItem>
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
                  <SelectItem value="price-desc">Giá: Cao đến thấp</SelectItem>
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
                Không có phòng nào phù hợp với bộ lọc của bạn. Vui lòng thử lại
                với các tiêu chí khác.
              </p>
              <Button onClick={resetFilters}>Đặt lại bộ lọc</Button>
            </div>
          ) : (
            // Room grid
            <div>
              <div className="mb-4 flex justify-between items-center">
                <p className="text-muted-foreground">
                  Hiển thị {filteredRooms.length} phòng
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
  );
}
