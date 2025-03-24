export interface Room {
  _id: string;
  name: string;
  description: string;
  category: string;
  image: string[];
  location: {
    coordinates?: {
      latitude: number;
      longitude: number;
    };
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  capacity: {
    maxGuests: number;
    maxAdults: number;
    maxChildren: number;
  };
  pricing: {
    basePrice: number;
    cleaningFee: number;
    securityDeposit: number;
  };
  facilities: {
    bathrooms: number;
    bedsDescription: Array<{
      type: string;
      count: number;
      _id: string;
    }>;
    roomSize: number;
  };
  status: string;
  bedrooms: number;
  shared: boolean;
  dailyRate: number;
  amenities: string[];
  createdAt: string;
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
