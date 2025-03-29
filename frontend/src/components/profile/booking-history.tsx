import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "@/hooks/use-toast";
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

type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

interface StatusConfig {
  style: string;
  text: string;
}

const STATUS_CONFIGS: Record<BookingStatus, StatusConfig> = {
  pending: {
    style: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
    text: "Chờ xác nhận",
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

interface RoomInfo {
  name: string;
  image?: string[];
}

interface UserInfo {
  username: string;
  email: string;
}

interface Booking {
  _id: string;
  startAt: string;
  endAt: string;
  days: number;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  room: RoomInfo;
  user: UserInfo;
}

export function BookingHistory() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const fetchBookings = async () => {
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
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchBookings();
    }
  }, [token]);

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

  const upcomingBookings = bookings.filter(
    (booking) => booking.status === "pending" || booking.status === "confirmed"
  );
  
  const pastBookings = bookings.filter(
    (booking) => booking.status === "completed" || booking.status === "cancelled"
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' VND';
  };

  const cancelBooking = async (bookingId: string) => {
    setCancellingId(bookingId);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/booking/cancel`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookingId }),
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

      toast({
        title: "Đặt phòng đã hủy",
        description: "Đặt phòng của bạn đã được hủy thành công.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast({
        title: "Lỗi",
        description: error instanceof Error ? error.message : "Không thể hủy đặt phòng. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setCancellingId(null);
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
                <Card key={booking._id} className="border shadow-none">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                      <div className="w-full md:w-1/4">
                        <img
                          src={booking.room.image?.[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945"}
                          alt={booking.room.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-semibold">
                            {booking.room.name}
                          </h4>
                          {getStatusBadge(booking.status)}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Mã đặt phòng
                            </p>
                            <p className="font-medium">#{booking._id.substring(0, 8)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Check-in
                            </p>
                            <p className="font-medium">{formatDate(booking.startAt)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Check-out
                            </p>
                            <p className="font-medium">{formatDate(booking.endAt)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Tổng tiền
                            </p>
                            <p className="font-medium">{formatPrice(booking.totalPrice)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{booking.guests} người · {booking.days} đêm</span>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button variant="outline">Chi tiết</Button>
                          {booking.status === "pending" && (
                            <Button 
                              variant="destructive"
                              onClick={() => setBookingToCancel(booking)}
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
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="flex items-center justify-center p-8 border rounded-lg">
                <div className="text-center text-muted-foreground">
                  Không có đặt phòng sắp tới
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Past Bookings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Đã hoàn thành</h3>
          <div className="grid gap-4">
            {pastBookings.length > 0 ? (
              pastBookings.map((booking) => (
                <Card key={booking._id} className="border shadow-none">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                      <div className="w-full md:w-1/4">
                        <img
                          src={booking.room.image?.[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945"}
                          alt={booking.room.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-semibold">{booking.room.name}</h4>
                          {getStatusBadge(booking.status)}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Mã đặt phòng
                            </p>
                            <p className="font-medium">#{booking._id.substring(0, 8)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Check-in
                            </p>
                            <p className="font-medium">{formatDate(booking.startAt)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Check-out
                            </p>
                            <p className="font-medium">{formatDate(booking.endAt)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Tổng tiền
                            </p>
                            <p className="font-medium">{formatPrice(booking.totalPrice)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{booking.guests} người · {booking.days} đêm</span>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button variant="outline">Chi tiết</Button>
                          {booking.status === "completed" && (
                            <Button variant="secondary">Đặt lại</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="flex items-center justify-center p-8 border rounded-lg">
                <div className="text-center text-muted-foreground">
                  Không có lịch sử đặt phòng
                </div>
              </div>
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
              Bạn có chắc chắn muốn hủy đặt phòng này không? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => bookingToCancel && cancelBooking(bookingToCancel._id)}
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
