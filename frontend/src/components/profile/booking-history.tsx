import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { BookingCard } from "./booking-card";
import { BookingEmptyState } from "./booking-empty-state";
import { useBookings } from "@/hooks/use-bookings";
import type { Booking } from "@/types/booking";

export function BookingHistory() {
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);
  const {
    upcomingBookings,
    pastBookings,
    loading,
    cancellingId,
    cancelBooking,
  } = useBookings();

  console.log(upcomingBookings);
  console.log(pastBookings);

  const handleCancelBooking = (bookingId: string) => {
    const booking = [...upcomingBookings, ...pastBookings].find(
      (b) => b._id === bookingId
    );
    if (booking) {
      setBookingToCancel(booking);
    }
  };

  const confirmCancelBooking = async () => {
    if (bookingToCancel) {
      await cancelBooking(bookingToCancel._id);
      setBookingToCancel(null);
    }
  };

  if (loading) {
    return (
      <>
        <CardHeader>
          <CardTitle>Lịch sử đặt phòng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        </CardContent>
      </>
    );
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Lịch sử đặt phòng</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Sắp tới</h3>
          <div className="grid gap-4">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <BookingCard
                  key={booking._id}
                  booking={{
                    ...booking,
                    room: {
                      name:
                        typeof booking.room === "string"
                          ? booking.room
                          : booking.room.name || "",
                      image:
                        typeof booking.room === "string"
                          ? []
                          : booking.room.image || [],
                    },
                  }}
                  onCancel={handleCancelBooking}
                  cancellingId={cancellingId}
                  showCancelButton={
                    booking.status === "pending" ||
                    booking.status === "pending_payment" ||
                    booking.status === "pending_confirmation"
                  }
                  showPayNowButton={
                    booking.status === "pending_payment" &&
                    booking.paymentStatus === "UNPAID"
                  }
                />
              ))
            ) : (
              <BookingEmptyState message="Không có đặt phòng sắp tới" />
            )}
          </div>
        </div>

        {/* Past Bookings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Đã hoàn thành</h3>
          <div className="grid gap-4">
            {pastBookings.length > 0 ? (
              pastBookings.map((booking) => (
                <BookingCard
                  key={booking._id}
                  booking={{
                    ...booking,
                    room: {
                      name:
                        typeof booking.room === "string"
                          ? booking.room
                          : booking.room.name || "",
                      image:
                        typeof booking.room === "string"
                          ? []
                          : booking.room.image || [],
                    },
                  }}
                  onCancel={handleCancelBooking}
                  cancellingId={cancellingId}
                  showBookAgainButton={booking.status === "completed"}
                />
              ))
            ) : (
              <BookingEmptyState message="Không có lịch sử đặt phòng" />
            )}
          </div>
        </div>
      </CardContent>

      <AlertDialog
        open={bookingToCancel !== null}
        onOpenChange={(open) => !open && setBookingToCancel(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận hủy đặt phòng</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn hủy đặt phòng này không? Hành động này không
              thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCancelBooking}
              disabled={cancellingId !== null}
            >
              {cancellingId ? "Đang xử lý..." : "Xác nhận hủy"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
