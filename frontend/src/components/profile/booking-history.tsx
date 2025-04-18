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
import { useTranslation } from "@/hooks/useTranslation";

export function BookingHistory() {
  const { t } = useTranslation();
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
          <CardTitle>{t("profile.bookings")}</CardTitle>
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
        <CardTitle>{t("profile.bookings")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {t("profile.booking.upcoming")}
          </h3>
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
              <BookingEmptyState message={t("profile.booking.noUpcoming")} />
            )}
          </div>
        </div>

        {/* Past Bookings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {t("profile.booking.completed")}
          </h3>
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
              <BookingEmptyState message={t("profile.booking.noHistory")} />
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
            <AlertDialogTitle>
              {t("profile.booking.cancelConfirmTitle")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("profile.booking.cancelConfirmDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.buttons.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCancelBooking}
              disabled={cancellingId !== null}
            >
              {cancellingId
                ? t("profile.booking.processing")
                : t("profile.booking.confirmCancel")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
