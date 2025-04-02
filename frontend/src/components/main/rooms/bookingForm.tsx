"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Users } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addDays, differenceInDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { vi } from "date-fns/locale";
import { BookingFormRoom } from "@/types/room";
import { Separator } from "@/components/ui/separator";
import BookingModal from "./bookingModal";
import { formatCurrency } from "@/utils/roomUtils";

interface BookingFormProps {
  room: BookingFormRoom;
}

export default function BookingForm({ room }: BookingFormProps) {
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to?: Date;
  }>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });

  const [guests, setGuests] = useState("1");
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Calculate number of nights
  const numberOfNights = dateRange.to
    ? differenceInDays(dateRange.to, dateRange.from)
    : 0;

  // Calculate total price
  const totalPrice = room.price * numberOfNights;
  const cleaningFee = room.cleaningFee || 150000; // Use room's cleaning fee or default
  const serviceFee = Math.round(totalPrice * 0.05); // 5% service fee
  const grandTotal = totalPrice + cleaningFee + serviceFee;

  return (
    <Card className="border-none shadow-md overflow-hidden">
      <CardHeader className="bg-[#0a3b33] text-white">
        <CardTitle className="flex items-center justify-between">
          <span className="text-xl">{formatCurrency(room.price)}</span>
          <span className="text-sm font-normal text-white/80">/ đêm</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Date Range Picker */}
        <div className="grid gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border-[#5a8d69]/30 hover:border-[#5a8d69] hover:bg-[#5a8d69]/5",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-[#5a8d69]" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "dd/MM/yyyy", { locale: vi })} -{" "}
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
                  setDateRange({ from: range.from || new Date(), to: range.to })
                }
                numberOfMonths={2}
                locale={vi}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="grid gap-3">
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger className="w-full border-[#5a8d69]/30 hover:border-[#5a8d69] hover:bg-[#5a8d69]/5">
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-[#5a8d69]" />
                <SelectValue placeholder="Số lượng khách" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: room.maxCapacity }, (_, i) => i + 1).map(
                (num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "khách" : "khách"}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        <Separator className="my-4 bg-[#5a8d69]/20" />

        {/* Price Details */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-[#0a3b33]/80">
              {formatCurrency(room.price)} x {numberOfNights} đêm
            </span>
            <span className="font-medium">{formatCurrency(totalPrice)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#0a3b33]/80">Phí vệ sinh</span>
            <span className="font-medium">{formatCurrency(cleaningFee)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#0a3b33]/80">Phí dịch vụ</span>
            <span className="font-medium">{formatCurrency(serviceFee)}</span>
          </div>

          <Separator className="my-3 bg-[#5a8d69]/20" />

          <div className="flex justify-between font-semibold text-lg">
            <span>Tổng tiền</span>
            <span className="text-[#9C6B4A]">{formatCurrency(grandTotal)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-[#f8f3e9]/50 p-6 pt-0">
        <BookingModal
          room={room}
          dateRange={dateRange}
          numberOfNights={numberOfNights}
          totalPrice={grandTotal}
          guests={parseInt(guests)}
          trigger={
            <Button
              className="w-full bg-[#9C6B4A] hover:bg-[#9C6B4A]/90 text-white"
              size="lg"
            >
              Đặt phòng
            </Button>
          }
        />
      </CardFooter>
    </Card>
  );
}
