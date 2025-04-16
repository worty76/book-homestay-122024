export interface Room {
  _id: string;
  name: string;
  description: string;
  category: string;
  image: string[];
  floor: string;
  amenities: string[];
  status: "available" | "booked";
  averageRating: number;
  dailyRate: number;
  size: number;
  basePrice?: number;
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
  bedrooms?: number;
  shared?: boolean;
  bathroomAmenities?: string[];
  createdAt?: string;
  bookedDates?: string[];
  bookings?: any[];
  ratings?: any[];
}

export interface RoomCardProps {
  room: {
    _id: string;
    name: string;
    description: string;
    category: string;
    images: string[];
    floor: string;
    size: number;
    amenities: string[];
    status: "available" | "booked";
    averageRating: number;
    dailyRate: number;
    basePrice?: number;
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
    bedrooms?: number;
    shared?: boolean;
    bathroomAmenities?: string[];
    createdAt?: string;
    bookedDates?: string[];
    bookings?: any[];
    ratings?: any[];
  };
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
  image: string[];
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
  view: string;
  amenities: string[];
  bathroomAmenities: string[];
  image: string[];
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
  available: boolean;
  description: string;
  story?: string;
  mainColors?: string[];
  amenities: string[];
  bathroomAmenities: string[];
  image: string[];
  rating: number;
  pricing: {
    basePrice: number;
    cleaningFee: number;
    securityDeposit: number;
  };
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
  minPrice?: number;
  maxPrice?: number;
}
