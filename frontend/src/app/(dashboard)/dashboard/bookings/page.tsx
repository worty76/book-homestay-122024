"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { BookingsTable } from "@/components/dashboard/bookings/bookings-table";
import { BookingDetailsDialog } from "@/components/dashboard/bookings/booking-details-dialog";
import { BookingWithDetails, BookingDetails } from "@/types/booking";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] =
    useState<BookingWithDetails | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(
    null
  );
  const [loadingDetails, setLoadingDetails] = useState(false);
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

  const fetchBookingDetails = async (bookingId: string) => {
    setLoadingDetails(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/booking/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setBookingDetails(data);
    } catch (error) {
      console.error("Error fetching booking details:", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Manage Bookings</h1>
      </div>

      <BookingsTable
        bookings={bookings}
        onViewDetails={(booking) => {
          setSelectedBooking(booking);
          fetchBookingDetails(booking._id);
        }}
      />

      <BookingDetailsDialog
        selectedBooking={selectedBooking}
        bookingDetails={bookingDetails}
        loadingDetails={loadingDetails}
        loading={loading}
        onClose={() => {
          setSelectedBooking(null);
          setBookingDetails(null);
        }}
        onConfirm={confirmBooking}
        onCancel={cancelBooking}
      />
    </div>
  );
}
