// Basic entity types
export interface RoomBasic {
  _id: string;
  name: string;
  price: number;
  description: string;
  address: string;
}

export interface UserBasic {
  _id: string;
  name: string;
  email: string;
}

// API response types
export interface BookingResponse {
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
  paymentStatus?: string;
  paymentMethod?: string;
}

// Enum types
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "pending_payment"
  | "pending_confirmation";

export type PaymentStatus = "UNPAID" | "PAID" | "REFUNDED";
export type PaymentMethod = "CASH" | "VNPAY";

// UI display types
export interface StatusConfig {
  style: string;
  text: string;
}

export const STATUS_CONFIGS: Record<BookingStatus, StatusConfig> = {
  pending: {
    style: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
    text: "Chờ xác nhận",
  },
  pending_payment: {
    style: "bg-blue-100 text-blue-700 hover:bg-blue-100",
    text: "Chờ thanh toán",
  },
  pending_confirmation: {
    style: "bg-orange-100 text-orange-700 hover:bg-orange-100",
    text: "Chờ xác nhận từ chủ nhà",
  },
  confirmed: {
    style: "bg-green-100 text-green-700 hover:bg-green-100",
    text: "Đã xác nhận",
  },
  cancelled: {
    style: "bg-red-100 text-red-700 hover:bg-red-100",
    text: "Đã hủy",
  },
  completed: {
    style: "bg-gray-100 text-gray-700 hover:bg-gray-100",
    text: "Đã hoàn thành",
  },
};

export const PAYMENT_STATUS_CONFIGS: Record<PaymentStatus, StatusConfig> = {
  UNPAID: {
    style: "bg-red-50 text-red-600 hover:bg-red-50",
    text: "Chưa thanh toán",
  },
  PAID: {
    style: "bg-green-50 text-green-600 hover:bg-green-50",
    text: "Đã thanh toán",
  },
  REFUNDED: {
    style: "bg-gray-50 text-gray-600 hover:bg-gray-50",
    text: "Đã hoàn tiền",
  },
};

export const PAYMENT_METHOD_CONFIGS: Record<PaymentMethod, string> = {
  CASH: "Tiền mặt",
  VNPAY: "VNPAY",
};

// Room details types
export interface RoomInfo {
  name: string;
  image?: string[];
}

export interface UserInfo {
  username: string;
  email: string;
}

// Extended detail types
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

// Detailed booking types
export interface BookingRoomDetails {
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
}

export interface BookingUserDetails {
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
  paymentStatus?: PaymentStatus;
  paymentMethod?: PaymentMethod;
  user: BookingUserDetails;
  room: BookingRoomDetails;
}

export interface Booking {
  _id: string;
  startAt: string;
  endAt: string;
  days: number;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  createdAt: string;
  room: RoomInfo;
  user: string | UserInfo;
}

// Utility functions
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatPrice = (price: number | string) => {
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat("vi-VN").format(numericPrice) + " VND";
};

export const mapBookingResponseToBooking = (
  response: BookingResponse
): Booking => {
  return {
    _id: response._id,
    startAt: response.startAt,
    endAt: response.endAt,
    days: response.days,
    guests: response.guests,
    totalPrice: parseFloat(response.totalPrice),
    status: response.status as BookingStatus,
    paymentStatus: (response.paymentStatus as PaymentStatus) || "UNPAID",
    paymentMethod: (response.paymentMethod as PaymentMethod) || "CASH",
    createdAt: response.createdAt,
    room: { name: "" },
    user: response.user,
  };
};

export interface BookingWithDetails {
  _id: string;
  startAt: string;
  endAt: string;
  days: number;
  guests: number;
  totalPrice: string;
  status: string;
  createdAt: string;
  room: RoomBasic;
  user: UserBasic;
}
