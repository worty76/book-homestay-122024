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

    if (
      searchParams.minPrice !== undefined ||
      searchParams.maxPrice !== undefined
    ) {
      const roomPrice =
        room.basePrice || room.pricing?.basePrice || room.dailyRate || 0;

      if (
        searchParams.minPrice !== undefined &&
        roomPrice < searchParams.minPrice
      ) {
        return false;
      }

      if (
        searchParams.maxPrice !== undefined &&
        roomPrice > searchParams.maxPrice
      ) {
        return false;
      }
    }

    return room.status === "available";
  });
}

export function formatCurrency(amount: number, language?: string): string {
  // Default exchange rate: 1 USD = 24,500 VND
  const exchangeRate = 24500;

  // If language is not provided, try to get it from localStorage
  if (!language) {
    if (typeof window !== "undefined") {
      language = localStorage.getItem("preferred-language") || "en";
    } else {
      language = "en";
    }
  }

  // Use Vietnamese formatting and currency for Vietnamese language
  if (language === "vi") {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  // Otherwise use USD for English and other languages
  // Convert VND to USD
  const amountInUsd = amount / exchangeRate;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amountInUsd);
}

// Helper function to convert between currencies
export function convertCurrency(
  amount: number,
  fromCurrency: "VND" | "USD",
  toCurrency: "VND" | "USD"
): number {
  // Default exchange rate: 1 USD = 24,500 VND
  const exchangeRate = 24500;

  if (fromCurrency === toCurrency) {
    return amount;
  }

  if (fromCurrency === "VND" && toCurrency === "USD") {
    return amount / exchangeRate;
  }

  if (fromCurrency === "USD" && toCurrency === "VND") {
    return amount * exchangeRate;
  }

  return amount;
}

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
