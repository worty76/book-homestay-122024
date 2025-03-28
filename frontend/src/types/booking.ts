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

// ...existing interfaces...

export interface BookingWithDetails extends Booking {
  room: Room;
  user: User;
}
