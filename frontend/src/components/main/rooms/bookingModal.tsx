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
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import Cookies from "js-cookie";
import { createVnpayPayment } from "@/services/paymentService";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Wallet } from "lucide-react";
import { RoomCardProps } from "./roomCard"; // Import the RoomCardProps interface
import { ReactNode } from "react";
import { BookingFormRoom } from "@/types/room";

// API endpoint for bookings
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// Update the type definition to match RoomCardProps
export interface BookingModalProps {
  room: BookingFormRoom;
  dateRange: {
    from: Date;
    to?: Date;
  };
  numberOfNights: number;
  totalPrice: number;
  guests: number;
  trigger: ReactNode;
}

export default function BookingModal({
  room,
  dateRange: initialDateRange,
  numberOfNights,
  totalPrice,
  guests: initialGuests,
  trigger,
}: BookingModalProps) {
  const authState = useAuthStore();

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    specialRequests: "",
  });
  const [dateRange, setDateRange] = useState(initialDateRange);
  const [guests, setGuests] = useState(initialGuests.toString());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"CASH" | "VNPAY">("CASH");
  const [processingPayment, setProcessingPayment] = useState(false);

  // Calculate total price
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

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!dateRange.to) newErrors.push("Vui lòng chọn ngày check-out");
    if (!authState.isAuthenticated)
      newErrors.push("Vui lòng đăng nhập để đặt phòng");

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!dateRange.to) {
      toast.error("Vui lòng chọn ngày check-out");
      return;
    }

    if (!authState.isAuthenticated) {
      toast.error("Vui lòng đăng nhập", {
        description: "Bạn cần đăng nhập để đặt phòng",
      });
      return;
    }

    const cookieToken = getCookieToken();
    const tokenToUse = authState.token || cookieToken;

    if (!tokenToUse) {
      toast.error("Phiên đăng nhập không hợp lệ", {
        description: "Vui lòng đăng nhập lại để tiếp tục",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingData = {
        startAt: dateRange.from.toISOString(),
        endAt: dateRange.to.toISOString(),
        guests: parseInt(guests),
        rental: {
          _id: room.id,
        },
        specialRequests: formData.specialRequests,
        paymentMethod: paymentMethod,
        paymentStatus:
          paymentMethod === "CASH" ? "PENDING" : "AWAITING_PAYMENT",
      };

      console.log("Creating booking with data:", bookingData);

      // Create the booking first
      const bookingResponse = await axios.post(
        `${API_URL}/api/v1/booking/init`,
        bookingData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenToUse}`,
          },
        }
      );

      console.log("Booking created:", bookingResponse.data);

      // Extract booking ID from response based on the actual response structure
      let bookingId = null;

      // Try to extract from the desc.bookingId field first (as per the API documentation)
      if (bookingResponse.data?.desc?.bookingId) {
        bookingId = bookingResponse.data.desc.bookingId;
      }
      // Fallback to other possible locations
      else if (bookingResponse.data?.desc?._id) {
        bookingId = bookingResponse.data.desc._id;
      } else if (bookingResponse.data?.desc?.id) {
        bookingId = bookingResponse.data.desc.id;
      } else if (bookingResponse.data?._id) {
        bookingId = bookingResponse.data._id;
      } else if (typeof bookingResponse.data?.desc === "string") {
        bookingId = bookingResponse.data.desc;
      }

      // If still not found, log the entire response for debugging
      if (!bookingId) {
        console.error(
          "Could not find booking ID in response:",
          bookingResponse.data
        );
        throw new Error("Could not retrieve booking ID from response");
      }

      console.log("Successfully extracted booking ID:", bookingId);

      // For CASH payment, we're done
      if (paymentMethod === "CASH") {
        toast.success("Đặt phòng thành công!", {
          description: "Bạn sẽ thanh toán khi nhận phòng.",
        });

        setFormData({ specialRequests: "" });
        setOpen(false);
        return;
      }

      // For VNPAY payment, create payment and redirect
      if (paymentMethod === "VNPAY") {
        setProcessingPayment(true);

        try {
          // Store booking ID in session storage to retrieve after payment
          sessionStorage.setItem("vnpay_booking_id", bookingId);

          // Create VNPAY payment - updated to use service with the correct endpoint
          const paymentResponse = await createVnpayPayment(
            bookingId,
            grandTotal,
            tokenToUse
          );

          console.log("VNPAY payment created:", paymentResponse);

          // Get payment URL from response
          let paymentUrl = null;
          if (paymentResponse.data && paymentResponse.data.paymentUrl) {
            paymentUrl = paymentResponse.data.paymentUrl;
          }

          if (!paymentUrl) {
            throw new Error("No payment URL received from server");
          }

          // Redirect to VNPAY
          console.log("Redirecting to payment URL:", paymentUrl);
          window.location.href = paymentUrl;
          return;
        } catch (paymentError: any) {
          console.error("Payment creation error:", paymentError);

          // Cancel the booking since payment failed to create
          try {
            await axios.post(
              `${API_URL}/api/v1/booking/${bookingId}/cancel`,
              {},
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${tokenToUse}`,
                },
              }
            );
          } catch (cancelError) {
            console.error("Failed to cancel booking:", cancelError);
          }

          toast.error("Không thể tạo giao dịch thanh toán", {
            description: paymentError.message || "Vui lòng thử lại sau.",
          });
        } finally {
          setProcessingPayment(false);
        }
      }
    } catch (error: any) {
      console.error("Booking error:", error);
      console.error("Error response:", error.response?.data);

      if (error.response?.data?.errors) {
        const apiErrors = error.response.data.errors;
        apiErrors.forEach((err: any) => {
          toast.error(err.title, {
            description: err.desc,
          });
        });
      } else {
        toast.error("Đặt phòng thất bại", {
          description: "Có lỗi xảy ra, vui lòng thử lại sau.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
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
                  Ngày check-in / check-out{" "}
                  <span className="text-red-500">*</span>
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
                <Label className="text-sm sm:text-base">
                  Số lượng khách <span className="text-red-500">*</span>
                </Label>
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

              {/* Payment Method Selection */}
              <div>
                <Label className="text-sm sm:text-base mb-2 block">
                  Phương thức thanh toán <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value) =>
                    setPaymentMethod(value as "CASH" | "VNPAY")
                  }
                  className="flex flex-col gap-3"
                >
                  <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="CASH" id="cash" />
                    <Label
                      htmlFor="cash"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Wallet className="h-4 w-4" />
                      <div>
                        <p className="font-medium">Thanh toán khi nhận phòng</p>
                        <p className="text-sm text-muted-foreground">
                          Trả tiền mặt hoặc quẹt thẻ khi check-in
                        </p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="VNPAY" id="vnpay" />
                    <Label
                      htmlFor="vnpay"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <CreditCard className="h-4 w-4" />
                      <div>
                        <p className="font-medium">Thanh toán qua VNPAY</p>
                        <p className="text-sm text-muted-foreground">
                          Thanh toán an toàn qua cổng VNPAY
                        </p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
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

            {/* Payment method info */}
            <div className="mt-3 border-t pt-3">
              <div className="flex justify-between text-sm">
                <span>Phương thức thanh toán</span>
                <span className="font-medium">
                  {paymentMethod === "CASH"
                    ? "Thanh toán khi nhận phòng"
                    : "VNPAY"}
                </span>
              </div>
            </div>

            {/* Login reminder for unauthenticated users */}
            {!authState.isAuthenticated && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-blue-600 font-medium text-sm">
                  Vui lòng đăng nhập để đặt phòng
                </p>
              </div>
            )}

            {/* Error display */}
            {errors.length > 0 && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 font-medium text-sm">
                  Vui lòng kiểm tra lại thông tin:
                </p>
                <ul className="list-disc ml-5 mt-1">
                  {errors.map((error, index) => (
                    <li key={index} className="text-red-600 text-xs">
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-0 gap-2 sm:gap-4 mt-4 sm:mt-6">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => setOpen(false)}
            disabled={isSubmitting || processingPayment}
          >
            Hủy
          </Button>
          <Button
            type="submit"
            className="w-full sm:w-auto"
            onClick={handleBooking}
            disabled={
              isSubmitting || !authState.isAuthenticated || processingPayment
            }
          >
            {isSubmitting || processingPayment
              ? "Đang xử lý..."
              : paymentMethod === "VNPAY"
              ? "Thanh toán qua VNPAY"
              : "Xác nhận đặt phòng"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Function to retrieve token from cookie as fallback
function getCookieToken() {
  try {
    const cookieData = Cookies.get("auth-storage");
    if (cookieData) {
      const parsedData = JSON.parse(decodeURIComponent(cookieData));
      return parsedData?.state?.token || null;
    }
    return null;
  } catch (error) {
    console.error("Error parsing auth cookie:", error);
    return null;
  }
}
