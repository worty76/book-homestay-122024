import { Room, SearchParams } from "@/types/room";

export function filterRoomsBySearchParams(
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
    const guestsPerRoom = Math.ceil(
      (searchParams.guests || 1) / (searchParams.rooms || 1)
    );
    if (room.capacity.maxGuests < guestsPerRoom) return false;

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

/**
 * Maps API category to display category
 */
export const mapCategory = (category: string): string => {
  return category === "room" || category === "suite" || category === "apartment"
    ? "Standard"
    : "Deluxe";
};

/**
 * Maps API room type to display room type
 */
export const mapRoomType = (type: string): string => {
  if (type === "Single" || type === "Double") return "Double";
  if (type === "Queen" || type === "King") return "Twin";
  return "Dormitory";
};

/**
 * Maps API view type to display view type
 */
export const mapViewType = (view: string): string => {
  return view === "Ocean View" ? "Balcony" : "Window";
};
