import { Room, SearchParams } from "@/types/room";

export function filterRoomsBySearchParams(
  allRooms: Room[],
  searchParams: SearchParams
): Room[] {
  if (
    !searchParams.checkIn ||
    !searchParams.checkOut ||
    (!searchParams.adults && !searchParams.guests)
  ) {
    return allRooms;
  }

  const totalGuests =
    searchParams.adults !== undefined && searchParams.children !== undefined
      ? searchParams.adults + searchParams.children
      : searchParams.guests || 0;

  return allRooms.filter((room) => {
    if (room.capacity.maxGuests < totalGuests) return false;

    if (
      searchParams.adults !== undefined &&
      searchParams.children !== undefined &&
      room.capacity.maxAdults !== undefined &&
      room.capacity.maxChildren !== undefined
    ) {
      if (
        room.capacity.maxAdults < searchParams.adults ||
        room.capacity.maxChildren < searchParams.children
      ) {
        return false;
      }
    }

    return room.status === "available";
  });
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(amount);
};

export const mapCategory = (category: string): string => {
  return category === "room" || category === "suite" || category === "apartment"
    ? "Standard"
    : "Deluxe";
};

export const mapRoomType = (type: string): string => {
  if (type === "Single" || type === "Double") return "Double";
  if (type === "Queen" || type === "King") return "Twin";
  return "Dormitory";
};

export const mapViewType = (view: string): string => {
  return view === "Ocean View" ? "Balcony" : "Window";
};
