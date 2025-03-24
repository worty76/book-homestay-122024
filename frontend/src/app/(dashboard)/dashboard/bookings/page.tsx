"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface Booking {
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

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/booking", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [token]);

  const confirmBooking = async (bookingId: string) => {
    setLoading(bookingId);
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/booking/confirm`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookingId: bookingId }),
        }
      );

      if (response.ok) {
        setBookings(
          bookings.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: "confirmed" }
              : booking
          )
        );
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
    } finally {
      setLoading(null);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    setLoading(bookingId);
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/booking/${bookingId}/cancel`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setBookings(
          bookings.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: "cancelled" }
              : booking
          )
        );
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Manage Bookings</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Guest ID</TableHead>
            <TableHead>Room ID</TableHead>
            <TableHead>Check-in</TableHead>
            <TableHead>Check-out</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking._id}>
              <TableCell>{booking.user}</TableCell>
              <TableCell>{booking.room}</TableCell>
              <TableCell>
                {new Date(booking.startAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(booking.endAt).toLocaleDateString()}
              </TableCell>
              <TableCell>${booking.totalPrice}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    booking.status === "confirmed"
                      ? "secondary"
                      : booking.status === "cancelled"
                      ? "destructive"
                      : "default"
                  }
                >
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() =>
                        booking.status === "pending" &&
                        confirmBooking(booking._id)
                      }
                      disabled={
                        booking.status !== "pending" || loading === booking._id
                      }
                    >
                      {loading === booking._id
                        ? "Processing..."
                        : "Confirm Booking"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        booking.status === "pending" &&
                        cancelBooking(booking._id)
                      }
                      disabled={
                        booking.status !== "pending" || loading === booking._id
                      }
                      className="text-red-600"
                    >
                      Cancel Booking
                    </DropdownMenuItem>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
