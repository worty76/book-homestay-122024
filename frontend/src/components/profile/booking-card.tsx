import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Booking,
  formatDate,
  formatPrice,
  BookingStatus,
  PaymentStatus,
  PaymentMethod,
  STATUS_CONFIGS,
  PAYMENT_STATUS_CONFIGS,
  PAYMENT_METHOD_CONFIGS,
} from "@/types/booking";

interface BookingCardProps {
  booking: Booking;
  onCancel: (id: string) => void;
  cancellingId: string | null;
  showCancelButton?: boolean;
  showBookAgainButton?: boolean;
  showPayNowButton?: boolean;
}

export function BookingCard({
  booking,
  onCancel,
  cancellingId,
  showCancelButton = false,
  showBookAgainButton = false,
  showPayNowButton = false,
}: BookingCardProps) {
  const getStatusBadge = (status: BookingStatus) => {
    const config = STATUS_CONFIGS[status];
    return (
      <Badge
        variant="secondary"
        className={cn("rounded-full font-medium", config.style)}
      >
        {config.text}
      </Badge>
    );
  };

  const getPaymentStatusBadge = (paymentStatus: PaymentStatus) => {
    const config = PAYMENT_STATUS_CONFIGS[paymentStatus];
    return (
      <Badge
        variant="secondary"
        className={cn("rounded-full font-medium", config.style)}
      >
        {config.text}
      </Badge>
    );
  };

  const getPaymentMethodLabel = (method: PaymentMethod) => {
    return PAYMENT_METHOD_CONFIGS[method] || method;
  };

  // const roomName =
  //   typeof booking.room === "string"
  //     ? "Loading..."
  //     :  || "Unnamed Room";

  const roomImage =
    typeof booking.room === "string" ? undefined : booking.room?.image?.[0];

  const status = booking.status as BookingStatus;

  return (
    <Card className="border shadow-none">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="w-full md:w-1/4">
            <img
              src={
                roomImage ||
                "https://images.unsplash.com/photo-1566073771259-6a8506099945"
              }
              alt={booking.room?.name}
              className="w-full h-32 object-cover rounded-lg"
            />
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">{booking.room?.name}</h4>
              {getStatusBadge(status)}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Mã đặt phòng</p>
                <p className="font-medium">#{booking._id.substring(0, 8)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Check-in</p>
                <p className="font-medium">{formatDate(booking.startAt)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Check-out</p>
                <p className="font-medium">{formatDate(booking.endAt)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tổng tiền</p>
                <p className="font-medium">{formatPrice(booking.totalPrice)}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>
                  {booking.guests} người · {booking.days} đêm
                </span>
              </div>
              {booking.paymentStatus && (
                <div className="flex items-center gap-1">
                  {getPaymentStatusBadge(booking.paymentStatus)}
                </div>
              )}
              {booking.paymentMethod && (
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-muted-foreground">
                    {getPaymentMethodLabel(booking.paymentMethod)}
                  </span>
                </div>
              )}
            </div>
            <div className="flex gap-2 pt-2">
              {showCancelButton && (
                <Button
                  variant="destructive"
                  onClick={() => onCancel(booking._id)}
                  disabled={cancellingId === booking._id}
                >
                  {cancellingId === booking._id ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
                      Đang hủy...
                    </>
                  ) : (
                    "Hủy đặt phòng"
                  )}
                </Button>
              )}
              {showPayNowButton && (
                <Button className="bg-[#5d8b40] hover:bg-[#5d8b40]/90">
                  Thanh toán ngay
                </Button>
              )}
              {showBookAgainButton && (
                <Button variant="secondary">Đặt lại</Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
