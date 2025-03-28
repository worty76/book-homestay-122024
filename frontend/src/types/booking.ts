export interface Room {
  _id: string;
  title: string;
  price: number;
  description: string;
  address: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Booking {
  _id: string;
  startAt: string;
  endAt: string;
  totalPrice: string;
  days: number;
  guests: number;
  user: string;
  room: string;
  status: string;
  createdAt: string;
}

export interface Location {
  address: string;
  city: string;
}

export interface Capacity {
  maxGuests: number;
  maxAdults: number;
  maxChildren: number;
}

export interface Pricing {
  basePrice: number;
  cleaningFee: number;
  securityDeposit: number;
}

export interface HouseRules {
  smokingAllowed: boolean;
  petsAllowed: boolean;
  partiesAllowed: boolean;
  checkInTime: string;
  checkOutTime: string;
}

export interface BedDescription {
  type: string;
  count: number;
  _id: string;
}

export interface Facilities {
  bathrooms: number;
  bedsDescription: BedDescription[];
  roomSize: number;
}

export interface BookingDetails {
  _id: string;
  startAt: string;
  endAt: string;
  totalPrice: string;
  days: number;
  guests: number;
  status: string;
  createdAt: string;
  user: {
    _id: string;
    username: string;
    email: string;
    phoneNumber: string;
    preferences: {
      notifications: {
        email: boolean;
        sms: boolean;
      };
    };
  };
  room: {
    _id: string;
    name: string;
    description: string;
    category: string;
    image: string[];
    amenities: string[];
    status: string;
    averageRating: number;
    bedrooms: number;
    shared: boolean;
    dailyRate: number;
    location: Location;
    capacity: Capacity;
    pricing: Pricing;
    houseRules: HouseRules;
    facilities: Facilities;
  };
}

export interface BookingWithDetails extends Booking {
  room: Room;
  user: User;
}
