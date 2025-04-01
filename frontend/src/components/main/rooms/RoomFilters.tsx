import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BedType, RoomCategory, ViewType } from "@/types/room";
import { formatCurrency } from "@/utils/roomUtils";

interface RoomFiltersProps {
  categoryFilter: RoomCategory | "all";
  setCategoryFilter: (value: RoomCategory | "all") => void;
  viewFilter: ViewType | "all";
  setViewFilter: (value: ViewType | "all") => void;
  bedTypeFilter: BedType | "all";
  setBedTypeFilter: (value: BedType | "all") => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  sortBy: "price-asc" | "price-desc" | "capacity";
  setSortBy: (value: "price-asc" | "price-desc" | "capacity") => void;
  resetFilters: () => void;
  showFilters?: boolean;
}

export default function RoomFilters({
  categoryFilter,
  setCategoryFilter,
  viewFilter,
  setViewFilter,
  bedTypeFilter,
  setBedTypeFilter,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  resetFilters,
  showFilters = true,
}: RoomFiltersProps) {
  return (
    <div
      className={`${
        showFilters ? "block" : "hidden"
      } lg:block col-span-1 space-y-6 text-[#0a3b33]`}
    >
      <div>
        <h2 className="font-bold mb-4 text-[#0a3b33] text-2xl">Lọc phòng</h2>

        <div className="mb-4">
          <label className="text-md font-medium mb-2 block text-[#0a3b33]">
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

        <div className="mb-4">
          <label className="text-md font-medium mb-2 block text-[#0a3b33]">
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

        <div className="mb-6">
          <label className="text-md font-medium mb-2 block text-[#0a3b33]">
            Giá phòng
          </label>
          <div className="mb-2 flex justify-between text-md">
            <span>{formatCurrency(priceRange[0])}</span>
            <span>{formatCurrency(priceRange[1])}</span>
          </div>
          <Slider
            defaultValue={[0, 10000000]}
            value={priceRange}
            onValueChange={setPriceRange}
            max={10000000}
            min={0}
            step={50}
          />
        </div>

        <div className="mb-4">
          <label className="text-md font-medium mb-2 block">Sắp xếp theo</label>
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

        <Button
          onClick={resetFilters}
          className="w-full mt-4 bg-[#5d8a42] text-white hover:bg-[#5d8a42]/80 hover:text-white"
        >
          Đặt lại
        </Button>
      </div>
    </div>
  );
}
