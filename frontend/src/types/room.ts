export interface Room {
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
  bathroomAmenities?: string[];
}

export type RoomCategory = "room" | "suite" | "apartment";
export type ViewType = "city" | "garden" | "mountain" | "pool" | "all";
export type BedType = "Single" | "Queen" | "King" | "all";

export interface DisplayRoom {
  id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  view: string;
  category: string;
  images: string[];
  maxCapacity: number;
  amenities: string[];
  available: boolean;
  rating: number;
  floor: string;
  size: number;
}

export interface RoomDetailDisplay {
  id: string;
  name: string;
  description: string;
  maxCapacity: number;
  size: number;
  floor: number;
  type: string;
  bedsDescription: {
    type: string;
    count: number;
    _id: string;
  }[];
  price: number;
  view: string;
  amenities: string[];
  bathroomAmenities: string[];
  images: string[];
  category: string;
  available: boolean;
  rating: number;
  checkInTime: string;
  checkOutTime: string;
  bathrooms: number;
  bedrooms: number;
  shared: boolean;
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
}

export interface BookingFormRoom {
  id: string;
  name: string;
  floor: number;
  type: string;
  category: string;
  view: string;
  size: number;
  maxCapacity: number;
  maxAdults: number;
  maxChildren: number;
  price: number;
  available: boolean;
  description: string;
  story?: string;
  mainColors?: string[];
  amenities: string[];
  bathroomAmenities: string[];
  images: string[];
  rating: number;
  cleaningFee?: number;
  securityDeposit?: number;
  basePrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  checkInTime?: string;
  checkOutTime?: string;
  houseRules?: {
    smokingAllowed: boolean;
    petsAllowed: boolean;
    partiesAllowed: boolean;
    checkInTime: string;
    checkOutTime: string;
  };
  bedsDescription?: {
    type: string;
    count: number;
    _id: string;
  }[];
}

export interface SearchParams {
  checkIn?: Date;
  checkOut?: Date;
  guests?: number;
  adults?: number;
  children?: number;
}
