import { useState, useEffect } from "react";
import {
  Booking,
  BookingResponse,
  mapBookingResponseToBooking,
} from "@/types/booking";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    fetchBookings();
  }, [token]);

  const fetchBookings = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/booking/user-bookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();
      const transformedBookings = data.map((item: any) => {
        const roomData =
          typeof item.room === "string"
            ? { name: "", image: [] }
            : {
                _id: item.room._id,
                name: item.room.name || "",
                image: item.room.image || [],
                description: item.room.description || "",
                category: item.room.category || "",
                amenities: item.room.amenities || [],
                floor: item.room.floor || "",
                status: item.room.status || "",
                capacity: item.room.capacity || {},
                pricing: item.room.pricing || {},
                houseRules: item.room.houseRules || {},
                facilities: item.room.facilities || {},
                bedrooms: item.room.bedrooms || 0,
                dailyRate: item.room.dailyRate || 0,
              };

        return {
          _id: item._id,
          startAt: item.startAt,
          endAt: item.endAt,
          days: item.days,
          guests: item.guests,
          totalPrice: parseFloat(item.totalPrice),
          status: item.status,
          paymentStatus: item.paymentStatus || "UNPAID",
          paymentMethod: item.paymentMethod || "CASH",
          createdAt: item.createdAt,
          room: roomData,
          user: item.user,
        };
      });

      setBookings(transformedBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    setCancellingId(bookingId);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/booking/cancel`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookingId: bookingId }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to cancel booking");
      }

      setBookings(
        bookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "cancelled" }
            : booking
        )
      );

      toast.success("Đặt phòng đã hủy", {
        description: "Đặt phòng của bạn đã được hủy thành công.",
      });

      return true;
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Lỗi", {
        description:
          error instanceof Error
            ? error.message
            : "Không thể hủy đặt phòng. Vui lòng thử lại sau.",
      });

      return false;
    } finally {
      setCancellingId(null);
    }
  };

  const upcomingBookings = bookings.filter(
    (booking) =>
      booking.status === "pending" ||
      booking.status === "confirmed" ||
      booking.status === "pending_payment" ||
      booking.status === "pending_confirmation"
  );

  const pastBookings = bookings.filter(
    (booking) =>
      booking.status === "completed" || booking.status === "cancelled"
  );

  return {
    bookings,
    upcomingBookings,
    pastBookings,
    loading,
    cancellingId,
    cancelBooking,
    fetchBookings,
  };
}
