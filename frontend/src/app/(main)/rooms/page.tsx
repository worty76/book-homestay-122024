"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Filter, X, ArrowUpDown } from "lucide-react";
import AnotherHeader from "@/components/main/another-header";
import RoomFilters from "@/components/main/rooms/RoomFilters";
import RoomGrid from "@/components/main/rooms/RoomGrid";
import SearchSummary from "@/components/main/rooms/SearchSummary";
import {
  Room,
  SearchParams,
  BedType,
  RoomCategory,
  ViewType,
} from "@/types/room";
import { filterRoomsBySearchParams } from "@/utils/roomUtils";
import { fetchRooms } from "@/services/roomService";
import { useTranslation } from "@/hooks/useTranslation";

export default function RoomsPage({
  searchParams: urlSearchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { t } = useTranslation();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState<RoomCategory | "all">(
    "all"
  );
  const [viewFilter, setViewFilter] = useState<ViewType | "all">("all");
  const [bedTypeFilter, setBedTypeFilter] = useState<BedType | "all">("all");
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "capacity">(
    "price-asc"
  );

  const searchParams: SearchParams = {};
  if (urlSearchParams.checkIn) {
    searchParams.checkIn = new Date(urlSearchParams.checkIn);
  }
  if (urlSearchParams.checkOut) {
    searchParams.checkOut = new Date(urlSearchParams.checkOut);
  }
  if (urlSearchParams.adults) {
    searchParams.adults = parseInt(urlSearchParams.adults);
  }
  if (urlSearchParams.children) {
    searchParams.children = parseInt(urlSearchParams.children);
  }

  if (urlSearchParams.guests && !urlSearchParams.adults) {
    searchParams.adults = parseInt(urlSearchParams.guests);
    searchParams.children = 0;
  }

  useEffect(() => {
    const getRooms = async () => {
      try {
        setLoading(true);
        const data = await fetchRooms();
        setRooms(data);

        const searchFilteredRooms = filterRoomsBySearchParams(
          data,
          searchParams
        );
        setFilteredRooms(searchFilteredRooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setRooms([]);
        setFilteredRooms([]);
      } finally {
        setLoading(false);
      }
    };

    getRooms();
  }, []);

  useEffect(() => {
    // Update searchParams with price range
    searchParams.minPrice = priceRange[0];
    searchParams.maxPrice = priceRange[1];

    let searchFiltered = filterRoomsBySearchParams(rooms, searchParams);

    let result = [...searchFiltered];

    if (categoryFilter !== "all") {
      result = result.filter((room) => room.category === categoryFilter);
    }

    if (bedTypeFilter !== "all") {
      result = result.filter((room) =>
        room.facilities.bedsDescription.some(
          (bed) => bed.type === bedTypeFilter
        )
      );
    }

    // Additional filter by price range for UI consistency
    result = result.filter((room) => {
      const roomPrice =
        room.basePrice || room.pricing?.basePrice || room.dailyRate || 0;
      return roomPrice >= priceRange[0] && roomPrice <= priceRange[1];
    });

    if (sortBy === "price-asc") {
      result.sort((a, b) => {
        const priceA = a.basePrice || a.pricing?.basePrice || a.dailyRate || 0;
        const priceB = b.basePrice || b.pricing?.basePrice || b.dailyRate || 0;
        return priceA - priceB;
      });
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => {
        const priceA = a.basePrice || a.pricing?.basePrice || a.dailyRate || 0;
        const priceB = b.basePrice || b.pricing?.basePrice || b.dailyRate || 0;
        return priceB - priceA;
      });
    } else if (sortBy === "capacity") {
      result.sort((a, b) => b.capacity.maxGuests - a.capacity.maxGuests);
    }

    setFilteredRooms(result);
  }, [rooms, categoryFilter, bedTypeFilter, priceRange, sortBy]);

  const resetFilters = () => {
    setCategoryFilter("all");
    setBedTypeFilter("all");
    setViewFilter("all");
    setPriceRange([0, 1000]);
    setSortBy("price-asc");
  };

  return (
    <div className="bg-[#f8f3e9]/50">
      <AnotherHeader
        subtitle={t("rooms.pageComponents.subtitle")}
        description={t("rooms.pageComponents.description")}
        image="/images/3DKENHOME/floor1/09.png"
        finalPage={t("rooms.pageComponents.finalPage")}
      />
      <div className="container mx-auto px-4 py-8">
        <SearchSummary searchParams={searchParams} />

        <div className="lg:hidden mb-4">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="w-full justify-between"
          >
            <div className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              <span>{t("rooms.pageComponents.filtersButton")}</span>
            </div>
            {showFilters ? (
              <X className="h-4 w-4" />
            ) : (
              <ArrowUpDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <RoomFilters
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            viewFilter={viewFilter}
            setViewFilter={setViewFilter}
            bedTypeFilter={bedTypeFilter}
            setBedTypeFilter={setBedTypeFilter}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sortBy={sortBy}
            setSortBy={setSortBy}
            resetFilters={resetFilters}
            showFilters={showFilters}
          />

          <div className="col-span-1 lg:col-span-3">
            <RoomGrid
              loading={loading}
              filteredRooms={filteredRooms}
              searchParams={searchParams}
              resetFilters={resetFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
