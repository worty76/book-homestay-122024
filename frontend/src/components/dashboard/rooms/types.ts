export interface Room {
  _id: string;
  name: string;
  description?: string;
  category: string;
  image: string[];
  location: {
    address: string;
    city: string;
  };
  amenities: string[];
  capacity: {
    maxGuests: number;
    maxAdults: number;
    maxChildren: number;
  };
  pricing: {
    basePrice: number;
    cleaningFee: number;
    securityDeposit: number;
    weekendRate?: number;
    weeklyDiscount?: number;
    monthlyDiscount?: number;
  };
  houseRules: {
    smokingAllowed: boolean;
    petsAllowed: boolean;
    partiesAllowed: boolean;
    checkInTime: string;
    checkOutTime: string;
    quietHours?: {
      from: string;
      to: string;
    };
  };
  status: "available" | "booked" | "maintenance" | "inactive";
  bedrooms?: number;
  shared?: boolean;
  dailyRate: number;
  facilities: {
    bathrooms: number;
    bedsDescription: {
      type: "Single" | "Double" | "Queen" | "King";
      count: number;
    }[];
    roomSize: number;
  };
}

export interface FormDataRoom {
  name: string;
  category: string;
  city: string;
  address: string;
  basePrice: string;
  cleaningFee: string;
  bathrooms: string;
  roomSize: string;
  status: string;
  dailyRate: string;
  maxGuests: string;
}
