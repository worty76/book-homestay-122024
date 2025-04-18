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
import { useTranslation } from "@/hooks/useTranslation";

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
  const { t, language } = useTranslation();

  return (
    <div
      className={`${
        showFilters ? "block" : "hidden"
      } lg:block col-span-1 space-y-6 text-[#0a3b33]`}
    >
      <div>
        <h2 className="font-bold mb-4 text-[#0a3b33] text-2xl">
          {t("rooms.filters.title")}
        </h2>

        <div className="mb-4">
          <label className="text-md font-medium mb-2 block text-[#0a3b33]">
            {t("rooms.filters.bedType")}
          </label>
          <Select
            value={bedTypeFilter}
            onValueChange={(value) =>
              setBedTypeFilter(value as BedType | "all")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={t("rooms.filters.all")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("rooms.filters.all")}</SelectItem>
              <SelectItem value="Single">Single</SelectItem>
              <SelectItem value="Queen">Queen</SelectItem>
              <SelectItem value="King">King</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4">
          <label className="text-md font-medium mb-2 block text-[#0a3b33]">
            {t("rooms.filters.roomType")}
          </label>
          <Select
            value={categoryFilter}
            onValueChange={(value) =>
              setCategoryFilter(value as RoomCategory | "all")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={t("rooms.filters.all")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("rooms.filters.all")}</SelectItem>
              <SelectItem value="room">{t("rooms.types.room")}</SelectItem>
              <SelectItem value="suite">{t("rooms.types.suite")}</SelectItem>
              <SelectItem value="apartment">
                {t("rooms.types.apartment")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-6">
          <label className="text-md font-medium mb-2 block text-[#0a3b33]">
            {t("rooms.filters.pricePerNight")}
          </label>
          <div className="mb-2 flex justify-between text-md">
            <span>{formatCurrency(priceRange[0], language)}</span>
            <span>{formatCurrency(priceRange[1], language)}</span>
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
          <label className="text-md font-medium mb-2 block">
            {t("rooms.sorting.title")}
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
              <SelectItem value="price-asc">
                {t("rooms.sorting.priceLowToHigh")}
              </SelectItem>
              <SelectItem value="price-desc">
                {t("rooms.sorting.priceHighToLow")}
              </SelectItem>
              <SelectItem value="capacity">
                {t("rooms.sorting.capacity")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={resetFilters}
          className="w-full mt-4 bg-[#5d8a42] text-white hover:bg-[#5d8a42]/80 hover:text-white"
        >
          {t("rooms.filters.reset")}
        </Button>
      </div>
    </div>
  );
}
