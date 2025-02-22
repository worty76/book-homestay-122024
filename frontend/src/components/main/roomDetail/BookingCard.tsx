"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { format } from "date-fns";
import { CalendarIcon, Star } from "lucide-react";
import Link from "next/link";

export default function BookingCard() {
  const [date, setDate] = useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(2022, 1, 19),
    to: new Date(2022, 1, 26),
  });

  return (
    <Card className="border rounded-xl p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-semibold">$75</span>
          <span className="text-neutral-500">/ night</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Star className="w-4 h-4 fill-rose-500 text-rose-500" />
          <span className="font-semibold">5.0</span>
          <span>·</span>
          <Link href="#reviews" className="underline">
            7 reviews
          </Link>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="grid grid-cols-2 rounded-xl border overflow-hidden">
          <div className="p-3 border-r">
            <div className="text-xs font-semibold">CHECK-IN</div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="p-0 h-auto font-normal">
                  {date.from ? format(date.from, "M/d/yyyy") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date.from}
                  selected={date}
                  onSelect={(value: any) => setDate(value)}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="p-3">
            <div className="text-xs font-semibold">CHECKOUT</div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="p-0 h-auto font-normal">
                  {date.to ? format(date.to, "M/d/yyyy") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date.from}
                  selected={date}
                  onSelect={(value: any) => setDate(value)}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="rounded-xl border">
          <div className="p-3">
            <div className="text-xs font-semibold">GUESTS</div>
            <Select defaultValue="2">
              <SelectTrigger className="border-0 p-0 h-auto font-normal">
                <SelectValue placeholder="Add guests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 guest</SelectItem>
                <SelectItem value="2">2 guests</SelectItem>
                <SelectItem value="3">3 guests</SelectItem>
                <SelectItem value="4">4 guests</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white py-6">
          Reserve
        </Button>

        <p className="text-center text-sm text-neutral-500">
          You won't be charged yet
        </p>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="underline">$79 x 7 nights</span>
            <span>$555</span>
          </div>
          <div className="flex justify-between">
            <span className="underline">Weekly discount</span>
            <span className="text-green-500">-$28</span>
          </div>
          <div className="flex justify-between">
            <span className="underline">Cleaning fee</span>
            <span>$62</span>
          </div>
          <div className="flex justify-between">
            <span className="underline">Service fee</span>
            <span>$83</span>
          </div>
          <div className="flex justify-between">
            <span className="underline">Occupancy taxes and fees</span>
            <span>$29</span>
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t font-semibold">
          <span>Total</span>
          <span>$701</span>
        </div>
      </div>
    </Card>
  );
}
