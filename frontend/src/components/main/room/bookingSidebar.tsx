"use client";

import { useState, useEffect } from "react";
import { format, differenceInDays, addDays } from "date-fns";
import { enUS } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";

interface BookingSidebarProps {
  pricePerNight?: number;
  cleaningFee?: number;
  // serviceFee?: number;
  currency?: string;
}

export default function BookingSidebar({
  pricePerNight = 3000000,
  cleaningFee = 500000,
  // serviceFee = 750000,
  currency = "VNĐ",
}: BookingSidebarProps) {
  const [checkIn, setCheckIn] = useState<Date | undefined>(new Date());
  const [checkOut, setCheckOut] = useState<Date | undefined>(
    addDays(new Date(), 7)
  );

  const [adultCount, setAdultCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [petCount, setPetCount] = useState(0);

  const [openGuestPopover, setOpenGuestPopover] = useState(false);

  const [nights, setNights] = useState<number>(7);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (checkIn && checkOut) {
      const nightsCount = differenceInDays(checkOut, checkIn);
      setNights(nightsCount > 0 ? nightsCount : 0);

      const accommodationCost =
        pricePerNight * (nightsCount > 0 ? nightsCount : 0);
      setTotalPrice(accommodationCost + cleaningFee);
    }
  }, [checkIn, checkOut, pricePerNight, cleaningFee]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US").format(amount);
  };

  const totalGuests = adultCount + childrenCount;

  return (
    <div className="sticky top-24 rounded-xl border bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <span className="text-2xl font-bold">
            {formatCurrency(pricePerNight)} {currency}
          </span>
          <span className="text-gray-600"> / đêm</span>
        </div>
      </div>

      <div className="mb-4 overflow-hidden rounded-lg border">
        <div className="grid grid-cols-2 divide-x">
          <div className="p-3">
            <p className="text-xs font-bold">CHECK-IN</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start p-0 font-normal text-left",
                    !checkIn && "text-muted-foreground"
                  )}
                >
                  {checkIn ? (
                    format(checkIn, "dd/MM/yyyy")
                  ) : (
                    <span>Chọn ngày</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={(date) => {
                    setCheckIn(date);
                    // Nếu ngày check-out trước check-in thì cập nhật
                    if (checkOut && date && date > checkOut) {
                      setCheckOut(addDays(date, 1));
                    }
                  }}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  locale={enUS}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="p-3">
            <p className="text-xs font-bold">CHECKOUT</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start p-0 font-normal text-left",
                    !checkOut && "text-muted-foreground"
                  )}
                >
                  {checkOut ? (
                    format(checkOut, "dd/MM/yyyy")
                  ) : (
                    <span>Chọn ngày</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  disabled={(date) =>
                    date < new Date() || (checkIn ? date <= checkIn : false)
                  }
                  initialFocus
                  locale={enUS}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="border-t p-3">
          <p className="text-xs font-bold">GUESTS</p>
          <Popover open={openGuestPopover} onOpenChange={setOpenGuestPopover}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="flex w-full items-center justify-between p-0 text-left"
              >
                <span>
                  {totalGuests} guests
                  {infantCount > 0 ? `, ${infantCount} infants` : ""}
                  {petCount > 0 ? `, ${petCount} pets` : ""}
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-72 p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Người lớn</p>
                    <p className="text-sm text-muted-foreground">
                      Từ 13 tuổi trở lên
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                    >
                      -
                    </Button>
                    <span>{adultCount}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setAdultCount(adultCount + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Trẻ em</p>
                    <p className="text-sm text-muted-foreground">
                      Độ tuổi 2 – 12
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setChildrenCount(Math.max(0, childrenCount - 1))
                      }
                    >
                      -
                    </Button>
                    <span>{childrenCount}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setChildrenCount(childrenCount + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Em bé</p>
                    <p className="text-sm text-muted-foreground">Dưới 2 tuổi</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setInfantCount(Math.max(0, infantCount - 1))
                      }
                    >
                      -
                    </Button>
                    <span>{infantCount}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setInfantCount(infantCount + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Thú cưng</p>
                    <p className="text-sm text-muted-foreground">
                      Bạn sẽ mang theo động vật phục vụ?
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setPetCount(Math.max(0, petCount - 1))}
                    >
                      -
                    </Button>
                    <span>{petCount}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setPetCount(petCount + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  Chỗ ở này cho phép tối đa 2 khách, không tính em bé. Không
                  được phép mang theo thú cưng.
                </p>

                <div className="flex justify-end">
                  <Button
                    variant="secondary"
                    onClick={() => setOpenGuestPopover(false)}
                  >
                    Đóng
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Button className="mb-4 w-full bg-[#FF385C] text-white hover:bg-[#FF385C]/90">
        Đặt phòng
      </Button>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="underline">
            {formatCurrency(pricePerNight)} x {nights} đêm
          </span>
          <span>{formatCurrency(pricePerNight * nights)}</span>
        </div>
        <div className="flex justify-between">
          <span className="underline">Phí dọn dẹp</span>
          <span>{formatCurrency(cleaningFee)}</span>
        </div>
        {/* <div className="flex justify-between">
          <span className="underline">Phí dịch vụ</span>
          <span>{formatCurrency(serviceFee)}</span>
        </div> */}
        <div className="flex justify-between border-t pt-4 font-bold">
          <span>Tổng số tiền</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
      </div>
    </div>
  );
}
