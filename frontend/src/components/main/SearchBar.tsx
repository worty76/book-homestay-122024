"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { CalendarIcon, UsersIcon } from "lucide-react";

export default function SearchBar() {
  const [checkIn, setCheckIn] = useState<Date | undefined>(new Date());
  const [checkOut, setCheckOut] = useState<Date | undefined>(new Date());
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);

  return (
    <div className="mt-6 flex items-center bg-white p-3 rounded-lg shadow-lg space-x-2">
      {/* Địa điểm */}
      <Input placeholder="Hồ Chí minh" className="text-black flex-1 px-4 py-3 bg-transparent border border-gray-500 rounded-lg" />

      {/* Ngày nhận phòng */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center space-x-2 px-4 py-3"
          >
            <CalendarIcon className="w-4 h-4" />
            <span>{checkIn?.toLocaleDateString("vi-VN")}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} />
        </PopoverContent>
      </Popover>

      {/* Ngày trả phòng */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center space-x-2 px-4 py-3"
          >
            <CalendarIcon className="w-4 h-4" />
            <span>{checkOut?.toLocaleDateString("vi-VN")}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} />
        </PopoverContent>
      </Popover>

      {/* Khách & Phòng */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center space-x-2 px-4 py-3"
          >
            <UsersIcon className="w-4 h-4" />
            <span>
              {guests} người lớn - {rooms} phòng
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2">
            <label>Số người lớn:</label>
            <Input
              type="number"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            />
            <label>Số phòng:</label>
            <Input
              type="number"
              value={rooms}
              onChange={(e) => setRooms(Number(e.target.value))}
            />
          </div>
        </PopoverContent>
      </Popover>

      {/* Button Tìm */}
      <Button className="px-8 py-3 font-bold bg-[#5d8b3e] text-white rounded-lg hover:bg-[#5d8b3e]">
        TÌM
      </Button>
    </div>
  );
}
