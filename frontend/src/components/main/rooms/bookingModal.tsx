"use client";

import { useState } from "react";
import { format, addDays, differenceInDays } from "date-fns";
import { vi } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Users, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Room } from "@/data/rooms";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface BookingModalProps {
  room: Room;
  trigger?: React.ReactNode;
}

export default function BookingModal({ room, trigger }: BookingModalProps) {
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to?: Date;
  }>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });
  const [guests, setGuests] = useState("1");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  // Calculate number of nights
  const numberOfNights = dateRange.to
    ? differenceInDays(dateRange.to, dateRange.from)
    : 0;

  // Calculate total price
  const totalPrice = room.price * numberOfNights;
  const cleaningFee = 150000; // Example fee
  const serviceFee = Math.round(totalPrice * 0.05); // 5% service fee
  const grandTotal = totalPrice + cleaningFee + serviceFee;

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle booking submission
  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();

    // Here you would typically send the booking data to your backend API
    console.log({
      room: room.id,
      checkIn: dateRange.from,
      checkOut: dateRange.to,
      guests: parseInt(guests),
      totalPrice: grandTotal,
      ...formData,
    });

    // Show success toast and close modal
    toast.success("Đặt phòng thành công!", {
      description: `Chúng tôi sẽ liên hệ với bạn qua email ${formData.email} để xác nhận đơn đặt phòng.`,
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      specialRequests: "",
    });

    // Close modal
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="gap-1">
            Đặt phòng
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-[95vw] p-4 sm:p-6 overflow-y-auto max-h-[90vh]">
        <DialogHeader className="mb-2 sm:mb-4">
          <DialogTitle className="text-lg sm:text-xl">
            Đặt phòng: {room.name}
          </DialogTitle>
          <DialogDescription className="text-sm">
            Hoàn tất thông tin đặt phòng của bạn
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-4">
              Chi tiết đặt phòng
            </h3>
            <form onSubmit={handleBooking} className="space-y-3 sm:space-y-4">
              {/* Check-in/Check-out dates */}
              <div>
                <Label className="text-sm sm:text-base">
                  Ngày check-in / check-out
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-1 text-sm sm:text-base",
                        !dateRange && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "dd/MM/yyyy", {
                              locale: vi,
                            })}{" "}
                            -{" "}
                            {format(dateRange.to, "dd/MM/yyyy", { locale: vi })}
                          </>
                        ) : (
                          format(dateRange.from, "dd/MM/yyyy", { locale: vi })
                        )
                      ) : (
                        <span>Chọn ngày</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange.from}
                      selected={dateRange}
                      onSelect={(range) =>
                        range &&
                        setDateRange({
                          from: range.from || new Date(),
                          to: range.to,
                        })
                      }
                      numberOfMonths={window.innerWidth < 768 ? 1 : 2}
                      locale={vi}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Guests */}
              <div>
                <Label className="text-sm sm:text-base">Số lượng khách</Label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger className="w-full mt-1 text-sm sm:text-base">
                    <div className="flex items-center">
                      <Users className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      <SelectValue placeholder="Số lượng khách" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from(
                      { length: room.maxCapacity },
                      (_, i) => i + 1
                    ).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "khách" : "khách"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Guest Information */}
              <div>
                <Label htmlFor="name" className="text-sm sm:text-base">
                  Họ tên
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Nguyễn Văn A"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 text-sm sm:text-base"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm sm:text-base">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 text-sm sm:text-base"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm sm:text-base">
                  Số điện thoại
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="0912 345 678"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1 text-sm sm:text-base"
                />
              </div>

              <div>
                <Label
                  htmlFor="specialRequests"
                  className="text-sm sm:text-base"
                >
                  Yêu cầu đặc biệt (tùy chọn)
                </Label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  placeholder="Vui lòng cho chúng tôi biết nếu bạn có yêu cầu đặc biệt"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full min-h-[60px] sm:min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                />
              </div>
            </form>
          </div>

          <div className="bg-muted/30 p-4 sm:p-6 rounded-lg mt-4 lg:mt-0">
            <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-4">
              Chi tiết thanh toán
            </h3>

            {/* Room Details */}
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="bg-primary/10 text-primary p-1.5 sm:p-2 rounded-md">
                <Users className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div>
                <h4 className="font-medium text-sm sm:text-base">
                  {room.name}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {room.type === "Twin"
                    ? "Phòng đôi với 2 giường đơn"
                    : room.type === "Double"
                    ? "Phòng đôi với 1 giường lớn"
                    : "Phòng ngủ tập thể"}
                  {" · "}
                  {room.maxCapacity} người
                </p>
              </div>
            </div>

            <Separator className="my-3 sm:my-4" />

            {/* Price Details */}
            <div className="space-y-1.5 sm:space-y-2 text-sm sm:text-base">
              <div className="flex justify-between">
                <span>
                  {formatCurrency(room.price)} x {numberOfNights} đêm
                </span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>

              <div className="flex justify-between">
                <span>Phí vệ sinh</span>
                <span>{formatCurrency(cleaningFee)}</span>
              </div>

              <div className="flex justify-between">
                <span>Phí dịch vụ</span>
                <span>{formatCurrency(serviceFee)}</span>
              </div>

              <Separator className="my-3 sm:my-4" />

              <div className="flex justify-between font-medium text-base sm:text-lg">
                <span>Tổng tiền</span>
                <span>{formatCurrency(grandTotal)}</span>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-muted-foreground">
              <p>Thanh toán được thực hiện khi nhận phòng.</p>
              <p className="mt-1">
                Đặt cọc 30% có thể được yêu cầu để đảm bảo đặt phòng của bạn.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-0 gap-2 sm:gap-4 mt-4 sm:mt-6">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => setOpen(false)}
          >
            Hủy
          </Button>
          <Button
            type="submit"
            className="w-full sm:w-auto"
            onClick={handleBooking}
          >
            Xác nhận đặt phòng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
