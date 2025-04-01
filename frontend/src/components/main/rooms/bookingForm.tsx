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
    <Card className="sticky top-24 ">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{formatCurrency(room.price)}</span>
          <span className="text-sm font-normal text-muted-foreground">
            / đêm
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Date Range Picker */}
        <div className="grid gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
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
        <div className="grid gap-2">
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger className="w-full">
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
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

        <Separator className="my-4" />

        {/* Price Details */}
        <div className="space-y-2">
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

          <Separator className="my-2" />

          <div className="flex justify-between font-medium">
            <span>Tổng tiền</span>
            <span>{formatCurrency(grandTotal)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <BookingModal
          room={room}
          trigger={
            <Button className="w-full" size="lg">
              Đặt phòng
            </Button>
          }
        />
      </CardFooter>
    </Card>
  );
}
