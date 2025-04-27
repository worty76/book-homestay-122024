"use client";

import { useState, useCallback } from "react";
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
import { enUS } from "date-fns/locale";
import { BookingFormRoom } from "@/types/room";
import { Separator } from "@/components/ui/separator";
import BookingModal from "./bookingModal";
import { formatCurrency } from "@/utils/roomUtils";
import { useTranslation } from "@/hooks/useTranslation";

interface BookingFormProps {
  room: BookingFormRoom;
}

export default function BookingForm({ room }: BookingFormProps) {
  const { t, language } = useTranslation();
  const [checkInDate, setCheckInDate] = useState<Date>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date>(
    addDays(new Date(), 3)
  );
  const [guests, setGuests] = useState("1");
  const [showBookingModal, setShowBookingModal] = useState(false);

  const numberOfNights =
    checkInDate && checkOutDate
      ? differenceInDays(checkOutDate, checkInDate)
      : 0;

  const basePrice = room.pricing.basePrice || 0;
  const cleaningFee = room.pricing.cleaningFee || 0;
  const totalPrice = basePrice * numberOfNights;
  const grandTotal = totalPrice + cleaningFee;

  const maxCapacity = room.maxCapacity || 2;

  const dateRange = {
    from: checkInDate,
    to: checkOutDate,
  };

  // Convert bookedDates to an array of disabled dates for the calendar
  const getDisabledDates = useCallback(() => {
    if (!room.bookedDates || room.bookedDates.length === 0) return [];

    const disabledDates: Date[] = [];

    room.bookedDates.forEach((booking) => {
      if (booking.status === "confirmed" || booking.status === "pending") {
        const start = new Date(booking.startAt);
        const end = new Date(booking.endAt);

        // Create a range of dates between start and end
        const currentDate = new Date(start);
        while (currentDate <= end) {
          disabledDates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
    });

    return disabledDates;
  }, [room.bookedDates]);

  return (
    <Card className="border-none shadow-md overflow-hidden">
      <CardHeader className="bg-[#0a3b33] text-white">
        <CardTitle className="flex items-center justify-between">
          <span className="text-xl">{formatCurrency(basePrice, language)}</span>
          <span className="text-xl font-bold text-white/80">
            {t("rooms.bookingForm.perNight")}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="grid gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border-[#5a8d69]/30 hover:border-[#5a8d69] hover:bg-[#5a8d69]/5"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-[#5a8d69]" />
                <div className="flex flex-col items-start">
                  <span className="text-xs text-muted-foreground">
                    {t("rooms.bookingForm.checkIn")}
                  </span>
                  <span>
                    {format(checkInDate, "MM/dd/yyyy", { locale: enUS })}
                  </span>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="single"
                selected={checkInDate}
                onSelect={(date) => {
                  if (date) {
                    setCheckInDate(date);
                    if (differenceInDays(checkOutDate, date) < 1) {
                      setCheckOutDate(addDays(date, 1));
                    }
                  }
                }}
                locale={enUS}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border-[#5a8d69]/30 hover:border-[#5a8d69] hover:bg-[#5a8d69]/5"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-[#5a8d69]" />
                <div className="flex flex-col items-start">
                  <span className="text-xs text-muted-foreground">
                    {t("rooms.bookingForm.checkOut")}
                  </span>
                  <span>
                    {format(checkOutDate, "MM/dd/yyyy", { locale: enUS })}
                  </span>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="single"
                selected={checkOutDate}
                onSelect={(date) => {
                  if (date && differenceInDays(date, checkInDate) >= 1) {
                    setCheckOutDate(date);
                  }
                }}
                defaultMonth={checkOutDate}
                locale={enUS}
                disabled={(date) => date <= checkInDate || date < new Date()}
              />
            </PopoverContent>
          </Popover>

          {numberOfNights > 0 && (
            <div className="text-sm text-center text-muted-foreground">
              {t("rooms.bookingForm.nights", { count: numberOfNights })}
            </div>
          )}
        </div>

        <div className="grid gap-3">
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger className="w-full border-[#5a8d69]/30 hover:border-[#5a8d69] hover:bg-[#5a8d69]/5">
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-[#5a8d69]" />
                <SelectValue placeholder={t("rooms.bookingForm.guestCount")} />
              </div>
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: maxCapacity }, (_, i) => i + 1).map(
                (num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}{" "}
                    {num === 1
                      ? t("rooms.bookingForm.guest")
                      : t("rooms.bookingForm.guests")}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        <Separator className="my-4 bg-[#5a8d69]/20" />

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-[#0a3b33]/80">
              {formatCurrency(basePrice, language)} x {numberOfNights}{" "}
              {numberOfNights === 1
                ? t("rooms.bookingForm.night")
                : t("common.dates.night")}
            </span>
            <span className="font-medium">
              {formatCurrency(totalPrice, language)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#0a3b33]/80">
              {t("rooms.bookingForm.cleaningFee")}
            </span>
            <span className="font-medium">
              {formatCurrency(cleaningFee, language)}
            </span>
          </div>

          <Separator className="my-3 bg-[#5a8d69]/20" />

          <div className="flex justify-between font-semibold text-lg">
            <span>{t("rooms.bookingForm.total")}</span>
            <span className="text-[#9C6B4A]">
              {formatCurrency(grandTotal, language)}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-[#f8f3e9]/50 p-6 pt-0">
        <BookingModal
          room={{
            ...room,
            pricing: room.pricing || {
              basePrice,
              cleaningFee,
            },
            maxCapacity: maxCapacity,
          }}
          dateRange={dateRange}
          numberOfNights={numberOfNights}
          totalPrice={grandTotal}
          guests={parseInt(guests)}
          trigger={
            <Button
              className="w-full bg-[#9C6B4A] hover:bg-[#9C6B4A]/90 text-white"
              size="lg"
            >
              {t("rooms.bookingForm.bookRoom")}
            </Button>
          }
        />
      </CardFooter>
    </Card>
  );
}
