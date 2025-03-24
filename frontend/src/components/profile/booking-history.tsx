import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

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

export function BookingHistory() {
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

  return (
    <>
      <CardHeader>
        <CardTitle>Lịch sử đặt phòng</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upcoming Bookings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Sắp tới</h3>
          <div className="grid gap-4">
            <Card className="border shadow-none">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                  <div className="w-full md:w-1/4">
                    <img
                      src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
                      alt="Villa Sea View"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold">
                        Villa Sea View Đà Nẵng
                      </h4>
                      {getStatusBadge("confirmed")}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Mã đặt phòng
                        </p>
                        <p className="font-medium">#BOK123456</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Check-in
                        </p>
                        <p className="font-medium">15/03/2024</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Check-out
                        </p>
                        <p className="font-medium">18/03/2024</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Tổng tiền
                        </p>
                        <p className="font-medium">2,500,000 VND</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>2 người lớn · 1 trẻ em · 1 phòng</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline">Chi tiết</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-none">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                  <div className="w-full md:w-1/4">
                    <img
                      src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
                      alt="Homestay Phố Cổ"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold">
                        Homestay Phố Cổ Hội An
                      </h4>
                      {getStatusBadge("pending")}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Mã đặt phòng
                        </p>
                        <p className="font-medium">#BOK123455</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Check-in
                        </p>
                        <p className="font-medium">20/03/2024</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Check-out
                        </p>
                        <p className="font-medium">22/03/2024</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Tổng tiền
                        </p>
                        <p className="font-medium">1,800,000 VND</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>2 người lớn · 2 phòng</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline">Chi tiết</Button>
                      <Button variant="destructive">Hủy đặt phòng</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Past Bookings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Đã hoàn thành</h3>
          <div className="grid gap-4">
            <Card className="border shadow-none">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                  <div className="w-full md:w-1/4">
                    <img
                      src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
                      alt="Resort Phú Quốc"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold">Resort Phú Quốc</h4>
                      {getStatusBadge("completed")}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Mã đặt phòng
                        </p>
                        <p className="font-medium">#BOK123454</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Check-in
                        </p>
                        <p className="font-medium">15/01/2024</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Check-out
                        </p>
                        <p className="font-medium">20/01/2024</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Tổng tiền
                        </p>
                        <p className="font-medium">5,500,000 VND</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>4 người lớn · 2 phòng</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline">Chi tiết</Button>
                      <Button variant="secondary">Đặt lại</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </>
  );
}
